import os
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv

# Load env variables safely
dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path=dotenv_path)

_mentor_llm = None

def _get_mentor_llm():
    global _mentor_llm
    if _mentor_llm is None:
        groq_model = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")
        gemini_model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")

        if os.getenv("GROQ_API_KEY"):
            try:
                _mentor_llm = ChatGroq(
                    model_name=groq_model,
                    temperature=0.3,
                    max_tokens=1024
                )
            except Exception as e:
                print(f"[Mentor Engine] Groq init failed ({e}), falling back to Gemini.")
                _mentor_llm = None

        if _mentor_llm is None and os.getenv("GOOGLE_API_KEY"):
            try:
                _mentor_llm = ChatGoogleGenerativeAI(
                    model=gemini_model,
                    temperature=0.3,
                    max_tokens=1024
                )
            except Exception as e:
                print(f"[Mentor Engine] Gemini init failed: {e}")
                _mentor_llm = None

    return _mentor_llm


MENTOR_SYSTEM_PROMPT = """
You are the AI Mentor for the MVIT Coding Team.
You will receive a student's performance metrics and behavior flags from the Behavior Analyzer.

You MUST structure your feedback EXACTLY in this format with these three prefixes:
Observation: (1 sentence noting what they are doing based on metrics)
Issue: (1 sentence pointing out the core problem based on the flags, or "None" if doing well)
Recommendation: (1 actionable advice sentence)

Example 1:
Observation: You are solving problems regularly, solving 40 problems so far.
Issue: Your high submission ratio indicates a trial-and-error approach.
Recommendation: Try planning your logic before coding and focus on pattern recognition.

Example 2:
Observation: You have been inactive for the last 5 days.
Issue: This drop pattern hurts your learning momentum.
Recommendation: Solve just 1 easy problem today to rebuild your coding habit.
"""

def generate_mentor_feedback(name: str, behavior_data: dict) -> str:
    """Generates strictly structured mentor feedback based on behavior flags."""
    llm = _get_mentor_llm()
    if not llm:
        return "Observation: LLM unavailable.\nIssue: Configuration missing.\nRecommendation: Check API keys."
        
    stats_str = f"Student: {name}\nMetrics: {behavior_data.get('metrics', {})}\nFlags: {behavior_data.get('flags', [])}"
    
    try:
        response = llm.invoke([
            SystemMessage(content=MENTOR_SYSTEM_PROMPT),
            HumanMessage(content=stats_str)
        ])
        return response.content.strip()
    except Exception as e:
        return f"Observation: Could not generate feedback.\nIssue: Internal LLM Error.\nRecommendation: Keep practicing."
