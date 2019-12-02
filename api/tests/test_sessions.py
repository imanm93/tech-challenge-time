import pytest

from app import create_app

@pytest.fixture
def client():
    """Create and configure a new app instance for each test."""

    app = create_app()
    client = app.test_client()

    yield client

def test_get_sessions_for_user(client):
    pass

def test_post_new_session_successful(client):
    pass

def test_post_new_session_bad_parameters(client):
    pass
