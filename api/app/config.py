import os
import datetime
from .common.constants import INSTANCE_FOLDER_PATH

class BaseConfig(object):
    """ Base Configuration """

    PROJECT = "app"
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

    ENV = "development"
    DEBUG = False
    TESTING = False

    ADMINS = ["iman.m93@gmail.com"]

    # TODO: create more secure secret key
    SECRET_KEY = "secret_key"
    JWT_SECRET_KEY = "jwt_secret_key"
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=1)

class DefaultConfig(BaseConfig):
    """ Default Configuration """

    # Debug environment
    DEBUG = True

    # Connection to localhost
    DB_URI = "mongodb://localhost:27017/"


class DevConfig(DefaultConfig):
    """ Development Configuration """

    DB_URI = "mongodb://db:27017/"
    JWT_SECRET_KEY = os.environ.get('JWT_SECREKT_KEY')


class TestConfig(DevConfig):
    """ Testing Config """
    TESTING = True

class StagingConfig(DefaultConfig):
    """ Staging Configuration """
    pass


class ProdConfig(DefaultConfig):
    """ Production Configuration """
    pass



def get_config(MODE):
    SWITCH = {
        'DEV': DevConfig,
        'TEST': TestConfig,
        'STAGING': StagingConfig,
        'PROD': ProdConfig
    }
    return SWITCH[MODE]
