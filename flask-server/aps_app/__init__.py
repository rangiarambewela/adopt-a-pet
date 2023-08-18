import os
from datetime import timedelta

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from dotenv import load_dotenv
import json
import redis

basedir = os.path.abspath(os.path.dirname(__file__))
db = SQLAlchemy()
bcrypt = Bcrypt()
server_session = Session()
load_dotenv()


def dict_json_response(data, status):
    # # Include IP address for attribution and analytics purposes
    # if type(data) is dict:  # data needs to be type dict so that it can be converted to JSON
    #     if request.headers.getlist("X-Forwarded-For"):  # get the IP of the client making the request
    #         ip_string = request.headers.getlist("X-Forwarded-For")[0]  # X-Forwarded-For is typically present when requests are passed through proxy servers or load balancers
    #         # IP string could be "99.230.98.42, 3.141.107.199" or "99.230.98.42", keeping just one
    #         data["ip"] = ip_string.split(',')[0]
    #     else:
    #         data["ip"] = request.remote_addr  # getting the client's IP address directly
    resp = json.dumps(data)  # convert data to JSON
    return resp, status, {"Content-Type": "application/json; charset=utf-8"}


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        'sqlite:///' + os.path.join(basedir, 'database.db')  # configure the URI to the database file
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # disable tracking of modifications to objects
    app.config['SQLALCHEMY_ECHO'] = True  # log the sql statements occurring

    app.config["SESSION_TYPE"] = "redis"
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_USE_SIGNER"] = True
    app.config["SESSION_REDIS"] = redis.from_url(os.environ["REDIS_URL"])
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=60*24)
    app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]

    db.init_app(app)  # connect database to Flask app
    bcrypt.init_app(app)
    server_session.init_app(app)
    CORS(app)

    from aps_app.routes.test import test
    from aps_app.users.routes import users
    from aps_app.dogs.routes import dogs

    app.register_blueprint(test)
    app.register_blueprint(users)
    app.register_blueprint(dogs)

    return app
