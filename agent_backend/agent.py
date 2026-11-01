import os
import sys
# Python 3.14 + Groq on Windows: platform.uname() calls WMI which hangs.
# Monkey-patch with a fast cached uname_result tuple to avoid freeze.
import platform as _platform
if sys.platform.startswith('win'):
    try:
        _uname_cached = _platform.uname_result('Windows', 'PC', '10', '10.0', 'AMD64')
    except TypeError:
        _uname_cached = _platform.uname_result('Windows', 'PC', '10', '10.0', 'AMD64', 'AMD64')
    _platform.uname = lambda: _uname_cached

from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage, ToolMessage
from langchain_community.chat_message_histories import ChatMessageHistory
from dotenv import load_dotenv
import json

# Load environment variables from the root .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path=dotenv_path)

# ── Cached LLM instance (initialized ONCE at module load, not per-request) ──
_llm_instance = None
_llm_with_tools_instance = None

def get_llm():
    """Returns the cached LLM instance. Defaults to Groq (qwen/qwen3.8-27b) with automatic fallback to Gemini 3.6 Flash."""
    global _llm_instance
    if _llm_instance is None:
        groq_model = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")
        gemini_model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")

        if os.getenv("GROQ_API_KEY"):
            try:
                _llm_instance = ChatGroq(
                    model_name=groq_model,
                    temperature=0,
                    max_tokens=2048,
                )
                print(f"[Agent] LLM instance initialized (Groq {groq_model}).")
            except Exception as e:
                print(f"[Agent] Groq init failed ({e}), attempting Gemini fallback...")
                _llm_instance = None

        if _llm_instance is None and os.getenv("GOOGLE_API_KEY"):
            try:
                _llm_instance = ChatGoogleGenerativeAI(
                    model=gemini_model,
                    temperature=0,
                    max_tokens=2048,
                )
                print(f"[Agent] LLM instance initialized (Gemini {gemini_model}).")
            except Exception as e:
                print(f"[Agent] Gemini init failed: {e}")
                _llm_instance = None

    return _llm_instance

# Memory storage
memory_store = {}

def get_session_history(session_id: str) -> ChatMessageHistory:
    """Returns chat history for a session."""
    if session_id not in memory_store:
        memory_store[session_id] = ChatMessageHistory()
    return memory_store[session_id]

SYS_MSG = (
    "You are the Autonomous Campus AI Agent for MVIT Coding Team. "
    "Your goal is to provide high-quality, data-driven insights about students and the campus in a friendly, professional, ChatGPT-like manner."
    "\n\nSTYLE RULES:\n"
    "1. Use Markdown for all formatting. Use **bold** for emphasis.\n"
    "2. If listing 3 or more students/items, ALWAYS use a Markdown TABLE for clarity.\n"
    "3. Keep responses concise but comprehensive. Use bullet points for steps.\n"
    "4. If asked about a student, provide their ELO, Dept, and performance highlights.\n"
    "\n\nSTRICT RULES:\n"
    "1. Focus strictly on MVIT Coding Team data. Do not hallucinate external facts.\n"
    "2. ALWAYS use 'get_member_progress' for specific student queries (e.g. 'How is X doing?', 'Tell me about X').\n"
    "3. ALWAYS use 'get_most_inactive_members' for inactivity/struggling student scans.\n"
    "4. ALWAYS use 'get_team_leaderboard' for rankings/leaderboards.\n"
    "5. Maintain absolute privacy: do not share student contact details or internal IDs.\n"
    "6. Maintain context: remember who the user was just talking about.\n"
    "7. CRITICAL: If a tool returns a markdown table or structured list, YOU MUST output the ENTIRE table or list verbatim in your response. DO NOT summarize it or replace it with 'Here it is'.\n"
    "8. CRITICAL: If a tool returns valid student data (name, ELO, points, etc.), ALWAYS present that data. NEVER say the student was 'not found' if the tool returned actual profile data."
)

# --- Import tools ---
from tools import (
    get_member_progress, 
    assign_personalized_task, 
    get_top_performers,
    get_most_inactive_members,
    get_team_leaderboard,
    get_team_overview_analytics,
    escalate_to_mentor,
    send_performance_report_email
)

# Calendar is optional - wrap import
try:
    from tools.calendar_tool import schedule_event
    tool_list = [get_member_progress, get_top_performers, get_most_inactive_members, get_team_leaderboard, get_team_overview_analytics, assign_personalized_task, schedule_event, escalate_to_mentor, send_performance_report_email]
except Exception:
    tool_list = [get_member_progress, get_top_performers, get_most_inactive_members, get_team_leaderboard, get_team_overview_analytics, assign_personalized_task, escalate_to_mentor, send_performance_report_email]

# Map tool names to callable functions
tool_map = {t.name: t for t in tool_list}

# --- Tool name → human label map for trace ---
TOOL_GOALS = {
    "get_member_progress":       ("Fetch student performance", "Querying student database"),
    "get_top_performers":        ("Get top performers", "Ranking all members by total score"),
    "get_most_inactive_members": ("Identify inactive members", "Scanning last activity dates for all members"),
    "get_team_leaderboard":      ("Retrieve team leaderboard", "Sorting all members by total points"),
    "assign_personalized_task":  ("Assign coding task", "Writing task to student record in database"),
    "query_knowledge_base":      ("Search knowledge base", "Running semantic search over campus documents"),
    "escalate_to_mentor":        ("Escalate to mentor", "Sending alert email to assigned team lead"),
    "send_performance_report_email": ("Send performance email", "Composing and sending SMTP email via Brevo"),
    "schedule_event":            ("Schedule calendar event", "Creating Google Calendar event"),
}

def run_agent(user_input: str, session_id: str = "default") -> dict:
    global _llm_with_tools_instance
    history = get_session_history(session_id)
    messages = [SystemMessage(content=SYS_MSG)] + history.messages + [HumanMessage(content=user_input)]

    # --- Reasoning trace ---
    trace = []

    try:
        # Use cached LLM + tools binding (built once, reused for massive speed gain)
        if _llm_with_tools_instance is None:
            _llm_with_tools_instance = get_llm().bind_tools(tool_list)
            print("[Agent] llm_with_tools initialized and cached.")
        llm_with_tools = _llm_with_tools_instance

        # Step 2: LLM decides what to do (PLAN)
        response = llm_with_tools.invoke(messages)
        
        # Handle list content (Gemini special case)
        if isinstance(response.content, list):
            text_parts = [part["text"] for part in response.content if isinstance(part, dict) and "text" in part]
            response.content = "".join(text_parts) if text_parts else str(response.content)

        messages.append(response)

        if hasattr(response, "tool_calls") and response.tool_calls:
            tool_results = []

            for tool_call in response.tool_calls:
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]
                tool_id   = tool_call["id"]

                # Derive human-readable goal + plan from TOOL_GOALS map
                goal_label, plan_label = TOOL_GOALS.get(tool_name, (tool_name, f"Executing {tool_name}"))
                
                # Format the args for display
                args_display = ", ".join(f'"{v}"' for v in tool_args.values() if v) if tool_args else ""

                trace.append({"step": "GOAL",   "text": goal_label})
                trace.append({"step": "PLAN",   "text": plan_label})
                trace.append({"step": "ACTION", "text": f"{tool_name}({args_display})"})

                # Execute the tool
                if tool_name in tool_map:
                    try:
                        result = tool_map[tool_name].invoke(tool_args)
                    except Exception as e:
                        result = f"Tool error: {e}"
                else:
                    result = f"Unknown tool: {tool_name}"

                result_str = str(result)
                tool_results.append(result_str)
                messages.append(ToolMessage(content=result_str, tool_call_id=tool_id))

                # RESULT + REVIEW
                is_error = "error" in result_str.lower() or "not found" in result_str.lower() or "couldn't find" in result_str.lower()
                trace.append({"step": "RESULT", "text": result_str[:120] + ("..." if len(result_str) > 120 else "")})
                trace.append({"step": "REVIEW", "text": "⚠️ Data missing or error — will respond gracefully." if is_error else "✅ Data retrieved successfully."})

            # Step 3: Get final response from LLM
            final = llm_with_tools.invoke(messages)
            
            final_content = final.content
            if isinstance(final_content, list):
                text_parts = [part["text"] for part in final_content if isinstance(part, dict) and "text" in part]
                final_content = "".join(text_parts) if text_parts else str(final_content)
            
            final_content = final_content if final_content else ""

            # Groq Llama-3 often says "Here is the data" but omits pasting the actual data.
            # We enforce visibility by appending tool output if it isn't deeply embedded.
            if tool_results:
                for res in tool_results:
                    if len(res) > 30 and ("🏆" in res or "🔴" in res or "📊" in res or "—" in res):
                        if "🏆" not in final_content and "🔴" not in final_content and "📊" not in final_content:
                            final_content += f"\n\n{res}"

            if not final_content.strip():
                final_content = tool_results[0] if tool_results else "I retrieved the data but couldn't format a response."

            history.add_user_message(user_input)
            history.add_ai_message(final_content)
            # Keep last 8 messages to avoid context explosion
            if len(history.messages) > 8:
                history.messages = history.messages[-8:]
            suggestions = ["Get team analysis", "Send report", "Next steps?"]
            return {"reply": final_content, "trace": trace, "suggestions": suggestions}

        # No tools called — simple conversational response
        content = response.content or "I don't have enough context. Ask me about a specific student or campus topic."
        history.add_user_message(user_input)
        history.add_ai_message(content)
        if len(history.messages) > 8:
            history.messages = history.messages[-8:]
        suggestions = ["Who is the top performer?", "Show me inactive members", "Team leaderboard"]
        return {"reply": content, "trace": [], "suggestions": suggestions}

    except Exception as e:
        return {"reply": f"Agent error: {e}", "trace": [{"step": "ERROR", "text": str(e)}], "suggestions": []}
