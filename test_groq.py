import os
import sys
import platform as _platform
if sys.platform.startswith('win'):
    try:
        _uname_cached = _platform.uname_result('Windows', 'PC', '10', '10.0', 'AMD64')
    except TypeError:
        _uname_cached = _platform.uname_result('Windows', 'PC', '10', '10.0', 'AMD64', 'AMD64')
    _platform.uname = lambda: _uname_cached

from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

model = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")
try:
    llm = ChatGroq(model_name=model, temperature=0)
    res = llm.invoke("Hello, are you working?")
    print(f"Groq Response ({model}): {res.content}")
except Exception as e:
    print(f"Groq Error: {e}")

