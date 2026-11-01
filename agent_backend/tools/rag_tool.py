from langchain.tools import tool
import os

DB_PATH = os.path.join(os.path.dirname(__file__), '../knowledge_base/faiss_index')

_cached_embeddings = None
_cached_db = None

def get_vector_store():
    global _cached_embeddings, _cached_db
    # Deferred heavy imports to keep startup fast
    from langchain_community.vectorstores import FAISS
    from langchain_huggingface import HuggingFaceEmbeddings

    if _cached_db is not None:
        return _cached_db

    # Use HuggingFace embeddings (free, runs locally)
    if _cached_embeddings is None:
        _cached_embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
    if os.path.exists(DB_PATH):
        try:
            _cached_db = FAISS.load_local(DB_PATH, _cached_embeddings, allow_dangerous_deserialization=True)
            return _cached_db
        except Exception:
            return None
    return None

@tool
def query_knowledge_base(query: str) -> str:
    """
    Search the campus and coding community knowledge base for answers.
    Use this to answer questions about campus rules, schedules, notices, or general FAQs.
    """
    db = get_vector_store()
    if not db:
        return "Knowledge base not initialized. No documents have been ingested yet."
        
    docs = db.similarity_search(query, k=3)
    if not docs:
        return "No relevant information found in the knowledge base."
        
    return "\n\n".join([doc.page_content for doc in docs])

def ingest_pdf(file_path: str):
    """Utility function to ingest a PDF into the Vector DB"""
    # Deferred heavy imports
    from langchain_community.document_loaders import PyMuPDFLoader
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_community.vectorstores import FAISS
    from langchain_huggingface import HuggingFaceEmbeddings

    loader = PyMuPDFLoader(file_path)
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    db = get_vector_store()
    
    if db:
        db.add_documents(splits)
        db.save_local(DB_PATH)
    else:
        new_db = FAISS.from_documents(splits, embeddings)
        os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
        new_db.save_local(DB_PATH)
        
    return f"Successfully ingested {file_path}. The agent can now answer questions about it."
