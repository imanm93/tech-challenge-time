import pytest

from app import create_app

@pytest.fixture
def client():
    """Create and configure a new app instance for each test."""

    app = create_app()
    client = app.test_client()

    yield client

def test_register_successful(client):
    pass

def test_register_duplicate_username(client):
    pass

def test_login_incorrect_username(client):
    user = { "username": "test", "password": "password" }
    pass

def test_login_incorrect_password(client):
    pass

def test_login_successful(client):
    pass
