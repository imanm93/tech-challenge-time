import os
import logging

from flask import Flask
from flask_cors import CORS

from . import config as Config
from .common import constants as COMMON_CONSTANTS

# Extension to Bcrypt
from flask_bcrypt import Bcrypt
app_bcrypt = Bcrypt()

from .api import user, sessions

# For import
__all__ = ['create_app']

DEFAULT_BLUEPRINTS = [
    user,
    sessions
]

def create_app(config=None, app_name=None, blueprints=None):
    """ Create Flask App """

    if app_name is None:
        app_name = Config.DefaultConfig.PROJECT

    if blueprints is None:
        blueprints = DEFAULT_BLUEPRINTS

    app = Flask(app_name, instance_path=COMMON_CONSTANTS.INSTANCE_FOLDER_PATH, instance_relative_config=True)
    configure_app(app, config)
    configure_blueprints(app, blueprints)
    configure_logging(app)
    configure_extensions(app)
    configure_error_handlers(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    return app

def configure_app(app, config=None):
    """ Configure app for dev/prod/staging environments """

    app.config.from_object(Config.DefaultConfig)

    if config:
        app.config.from_object(config)
        return

    application_mode = os.environ.get('APPLICATION_MODE', 'DEV')
    app.config.from_object(Config.get_config(application_mode))

def configure_blueprints(app, blueprints):
    """ Register blueprints """

    for blueprint in blueprints:
        app.register_blueprint(blueprint)

def configure_logging(app):
    """ Configure global logging for the application """

    app.logger = logging.getLogger('logger')
    app.logger.setLevel(logging.DEBUG)

    # Setup formatter and handler
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)

    app.logger.addHandler(handler)
    app.logger.info('Logging setup complete')

def configure_extensions(app):
    """ Configure Extensions """

    # Init Bcrypt
    app_bcrypt.init_app(app)

    # Extension to JWT
    from flask_jwt_extended import JWTManager
    jwt = JWTManager(app)


def configure_error_handlers(app):
    """ Configure error handlers """

    @app.errorhandler(404)
    def not_found_page(error):
        return "404 - Page not found"

    @app.errorhandler(500)
    def server_error_page(error):
        return "500 - Internal server error"
