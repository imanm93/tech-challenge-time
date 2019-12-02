import json

from flask import (Blueprint, request, jsonify, current_app)
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_refresh_token_required, get_jwt_identity)
from ..app import app_bcrypt
from ..extensions import db
from ..schemas.user import user_schema
from ..schemas.validate import validate_request

"""
User API Endpoint
"""

user = Blueprint('user', __name__, url_prefix='/api/v1/user')

# TODO: Add Loggin to each API call
#current_app.logger.info('GET /api/v1/user/register/ HTTP/1.1 200')

@user.route('/register', methods=['POST'])
def register():
    """ Register Endpoint """
    data = validate_request(request.get_json(), user_schema)
    if data['ok']:
        data = data['data']
        # Check if username exists
        userObj = db.users.find_one({ 'username': data['username'] }, { "_id": 0 })
        if not userObj:
            # Insert into Mongo DB
            data['password'] = app_bcrypt.generate_password_hash(data['password'])
            db.users.insert_one(data)
            return jsonify({ 'message': 'User created successfully' }), 200
        else:
            return jsonify({ 'message': 'Username already exists, please choose a new one!' }), 401
    else:
        return jsonify({ 'message': 'Bad request parameters: {}'.format(data['message']) }), 400


@user.route('/login', methods=['POST'])
def login():
    """ Login Endpoint """
    data = validate_request(request.get_json(), user_schema)
    if data['ok']:
        data = data['data']
        # Get User from DB
        userObj = db.users.find_one({ 'username': data['username'] }, { "_id": 0 })
        userPassValid = app_bcrypt.check_password_hash(userObj['password'], data['password'])
        if userObj and userPassValid:
            del userObj['password']
            access_token = create_access_token(identity=data)
            refresh_token = create_refresh_token(identity=data)
            userObj['token'] = access_token
            userObj['refresh'] = refresh_token
            return jsonify({ 'user' : userObj }), 200
        else:
            return jsonify({ 'message' : 'Invalid username or password' }), 401
    else:
        return jsonify({ 'message': 'Bad request parameters: {}'.format(data['message']) }), 400


@user.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    """ Refresh Token Endpoint """
    current_user = get_jwt_identity()
    data = { 'token': create_access_token(identity=current_user) }
    return jsonify({ 'data': data }), 200
