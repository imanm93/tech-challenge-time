import pytest
import random
import requests

ROOT_URL = 'http://127.0.0.1:5000/api/v1'
SESSIONS_URL = ROOT_URL + '/sessions'
USERS_URL = ROOT_URL + '/user'
uniqueNum = str(random.randint(0, 100000000));

def setUser():
    user = { "username": "test_user_" + uniqueNum, "password": "test_user_password" }
    register_response = requests.post(USERS_URL + '/register', json=user)
    login_response = requests.post(USERS_URL + '/login', json=user)
    access_token = login_response.json()['user']['token']
    headers = { 'Authorization': 'Bearer ' + access_token  }
    return headers

def test_post_new_session_successful():
    headers = setUser()
    session = { "name": "test_new_session", "time": 0, "createdAt": "Mon Dec 02 2019 09:09:45 GMT+0530 (India Standard Time)", "username": "test_user_" + uniqueNum }
    response = requests.post(SESSIONS_URL + '/new', json=session, headers=headers)
    assert response.status_code == 200

def test_post_new_session_bad_parameters():
    headers = setUser()
    session = { "name": "test_new_session", "username": "test_user_" + uniqueNum }
    response = requests.post(SESSIONS_URL + '/new', json=session, headers=headers)
    assert response.status_code == 400

def test_get_sessions_for_user():
    headers = setUser()
    response = requests.get(SESSIONS_URL + '/test_user_' + uniqueNum, headers=headers)
    json_response = response.json()
    assert response.status_code == 200 and len(json_response['data']) == 1
