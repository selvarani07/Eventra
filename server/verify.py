import requests
import json
import time
from datetime import datetime

BASE_URL = 'http://localhost:5000/api'

def run_test():
    print("Starting Flask Verification...")
    
    # 1. Register
    print("1. Registering user...")
    try:
        res = requests.post(f"{BASE_URL}/auth/register", json={
            "username": f"testuser_{int(time.time())}",
            "password": "password123"
        })
        print(f"   Register Status: {res.status_code}")
        token = res.json().get('token')
    except Exception as e:
        print(f"   Error: {e}")
        return

    # 2. Create Resource
    print("2. Creating Resource...")
    res = requests.post(f"{BASE_URL}/resources", json={
        "name": "Meeting Room 1",
        "type": "Room"
    })
    resource_id = res.json().get('id')
    print(f"   Resource ID: {resource_id}")

    # 3. Create Events
    print("3. Creating Events...")
    # Event 1: 10:00 - 12:00
    res1 = requests.post(f"{BASE_URL}/events", json={
        "title": "Strategy Meeting",
        "start_time": "2023-10-25T10:00:00",
        "end_time": "2023-10-25T12:00:00",
        "description": "Important"
    })
    evt1_id = res1.json().get('id')

    # Event 2: 11:30 - 13:30 (Overlap)
    res2 = requests.post(f"{BASE_URL}/events", json={
        "title": "Lunch & Learn",
        "start_time": "2023-10-25T11:30:00",
        "end_time": "2023-10-25T13:30:00",
        "description": "Fun"
    })
    evt2_id = res2.json().get('id')
    print(f"   Events Created: {evt1_id}, {evt2_id}")

    # 4. Allocate 1 -> Success
    print("4. Allocating Event 1...")
    res = requests.post(f"{BASE_URL}/allocations", json={
        "event_id": evt1_id,
        "resource_id": resource_id
    })
    if res.status_code == 200:
        print("   [OK] Allocation 1 Successful")
    else:
        print(f"   [FAIL] Allocation 1 Failed: {res.text}")

    # 5. Allocate 2 -> Fail
    print("5. Allocating Event 2 (Conflict)...")
    res = requests.post(f"{BASE_URL}/allocations", json={
        "event_id": evt2_id,
        "resource_id": resource_id
    })
    if res.status_code == 409:
        print("   [OK] Conflict Detected Correctly (409)")
    else:
        print(f"   [FAIL] Failed to detect conflict. Status: {res.status_code}")

if __name__ == "__main__":
    time.sleep(2) # Give server a moment
    run_test()
