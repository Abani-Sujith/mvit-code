import requests
import time
import json

def test_speed():
    url = "http://localhost:8000/chat"
    payload = {
        "message": "How is Agilesh doing?",
        "session_id": "test_session"
    }
    
    print(f"Testing speed for: {payload['message']}")
    start_time = time.time()
    try:
        response = requests.post(url, json=payload, timeout=60)
        end_time = time.time()
        
        duration = end_time - start_time
        print(f"Total time: {duration:.2f} seconds")
        
        if response.status_code == 200:
            data = response.json()
            print("\nResponse Summary:")
            print(f"Reply: {data.get('reply')[:100]}...")
            print(f"Mode: {data.get('mode')}")
            print(f"Trace length: {len(data.get('trace', []))}")
        else:
            print(f"Error: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    # Wait for server to be fully ready
    time.sleep(2)
    test_speed()
    print("\n--- Testing second call (Cache Hit) ---")
    test_speed()
