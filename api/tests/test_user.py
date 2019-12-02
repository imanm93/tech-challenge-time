import pytest
import random
import requests

ROOT_URL = 'http://127.0.0.1:5000/api/v1/user'
uniqueNum = str(random.randint(0, 100000000));

def test_register_successful():
    user = { "username": "test_user_" + uniqueNum, "password": "test_user_password" }
    response = requests.post(ROOT_URL + '/register', json=user)
    assert response.status_code == 200

def test_register_duplicate_username():
    user = { "username": "test_user_" + uniqueNum, "password": "test_user_password" }
    response = requests.post(ROOT_URL + '/register', json=user)
    assert response.status_code == 401

def test_login_incorrect_password():
    user = { "username": "test_user_" + uniqueNum, "password": "test_user_password_incorrect" }
    response = requests.post(ROOT_URL + '/login', json=user)
    assert response.status_code == 401

def test_login_bad_parameters():
    user = { "incorrect_param": "test_user" }
    response = requests.post(ROOT_URL + '/login', json=user)
    assert response.status_code == 400

def test_login_successful():
    user = { "username": "test_user_" + uniqueNum, "password": "test_user_password" }
    response = requests.post(ROOT_URL + '/login', json=user)
    json_response = response.json()
    assert response.status_code == 200 and json_response['user']['token'] and json_response['user']['refresh']
