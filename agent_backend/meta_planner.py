"""
Meta Planner — extracts multiple goals from user input in a single LLM call.
Returns a list of goals: [{"flow": "...", "target": "...", "hint": "..."}]
Falls back to [] for general queries (handled by run_agent).
"""

import os
import json
import re
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path=dotenv_path)

_planner_llm = None

def _get_planner_llm():
    global _planner_llm
    if _planner_llm is None:
        groq_model = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")
        gemini_model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")

        if os.getenv("GROQ_API_KEY"):
            try:
                _planner_llm = ChatGroq(
                    model_name=groq_model,
                    temperature=0,
                    max_tokens=512
                )
            except Exception as e:
                print(f"[Meta Planner] Groq init failed ({e}), falling back to Gemini.")
                _planner_llm = None

        if _planner_llm is None and os.getenv("GOOGLE_API_KEY"):
            try:
                _planner_llm = ChatGoogleGenerativeAI(
                    model=gemini_model,
                    temperature=0,
                    max_tokens=512
                )
            except Exception as e:
                print(f"[Meta Planner] Gemini init failed: {e}")
                _planner_llm = None

    return _planner_llm


PLANNER_SYSTEM = """You are a goal extraction engine for an autonomous campus AI agent.
Given the user's message, extract ALL ACTIONABLE goals and return ONLY valid JSON.

Available flows (these are ACTIONS, not lookups):
- PERFORMANCE_INTEL: Explicitly analyze and IMPROVE a student's performance — assigns tasks. Use ONLY when user explicitly asks to "improve", "assign", "boost", or "help" a student.
- INACTIVITY_RECOVERY: Actively recover inactive students — assigns tasks and escalates. Use ONLY when user asks to "fix", "recover", or "help" inactive members.
- EVENT_AUTOMATION: Schedule a coding contest/event for the team.

Output format (JSON array only, no explanation):
[
  {"flow": "FLOW_NAME", "target": "student_name_or_team", "hint": "any extra detail"}
]

CRITICAL RULES:
- INFORMATION QUERIES always return []. These include:
  - "How is X doing?" → []
  - "Tell me about X" → []
  - "What is X's score?" → []
  - "Who is the top performer?" → []
  - "Who is inactive?" or "Show inactive members" → []
  - "Show leaderboard" or "team stats" → []
  - Any question starting with "How", "What", "Who", "Show me", "Tell me" → []
- ACTION REQUESTS use flows. These include:
  - "Assign a task to X" → PERFORMANCE_INTEL
  - "Improve X's performance" → PERFORMANCE_INTEL
  - "Help inactive members" → INACTIVITY_RECOVERY
  - "Schedule a contest" → EVENT_AUTOMATION
- "target" is "team" for team-wide flows.
- When in doubt, return []

Examples:
User: "How is Agilesh doing?" → []
User: "Tell me about Deebigaa" → []
User: "Who is the best coder?" → []
User: "Show inactive members" → []
User: "Give me the leaderboard" → []
User: "assign a task to agilesh" → [{"flow": "PERFORMANCE_INTEL", "target": "Agilesh", "hint": "assign task"}]
User: "improve the team's performance" → [{"flow": "PERFORMANCE_INTEL", "target": "team", "hint": "improve performance"}]
User: "recover inactive students" → [{"flow": "INACTIVITY_RECOVERY", "target": "team", "hint": ""}]
User: "schedule a contest tomorrow" → [{"flow": "EVENT_AUTOMATION", "target": "team", "hint": "tomorrow"}]
User: "agilesh is weak in DP, assign tasks and also schedule a contest tomorrow" → [
  {"flow": "PERFORMANCE_INTEL", "target": "Agilesh", "hint": "weak in DP"},
  {"flow": "EVENT_AUTOMATION", "target": "team", "hint": "tomorrow"}
]
User: "what is leetcode" → []
"""

def extract_goals(user_input: str) -> list:
    """
    Uses LLM to extract multiple goals from user input.
    Returns a list of goal dicts, or [] if no actionable goals found.
    """
    try:
        llm = _get_planner_llm()
        if not llm:
            return []
        response = llm.invoke([
            SystemMessage(content=PLANNER_SYSTEM),
            HumanMessage(content=user_input)
        ])
        raw = response.content
        if isinstance(raw, list):
            # LangChain sometimes returns a list of dicts for Gemini/multimodal
            text_parts = [part["text"] for part in raw if isinstance(part, dict) and "text" in part]
            raw = "".join(text_parts) if text_parts else str(raw)
        
        raw = raw.strip()
        # Extract JSON array from response
        match = re.search(r'\[.*\]', raw, re.DOTALL)
        if match:
            goals = json.loads(match.group(0))
            if isinstance(goals, list):
                return goals
        return []
    except Exception as e:
        print(f"[Meta Planner] Error extracting goals: {e}")
        return []
