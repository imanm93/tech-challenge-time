from flask import (Blueprint, request, jsonify, current_app)
from flask_jwt_extended import (jwt_required)
from ..extensions import db
from ..schemas.session import session_schema
from ..schemas.validate import validate_request

"""
Sessions API Endpoint
"""

sessions = Blueprint('sessions', __name__, url_prefix='/api/v1/sessions')

@sessions.route('/<username>', methods=['GET'])
@jwt_required
def get_sessions(username):
    """ Get All Sessions by User Endpoint """
    username = username
    # Query DB
    sessions = db.sessions.find({ "username": username }, { "_id": 0 })
    data = []
    for session in sessions:
        data.append(session)

    return jsonify({ "data": data }), 200


@sessions.route('/new', methods=['POST'])
@jwt_required
def post_session():
    """ Insert New Session Endpoint """
    data = validate_request(request.get_json(), session_schema)
    if data['ok']:
        data = data['data']
        # Insert into DB
        db.sessions.insert_one(data)
        return jsonify({ 'message': 'Session inserted successfully!' }), 200
    else:
        return jsonify({ 'message': 'Bad request parameters: {}'.format(data['message']) }), 400
