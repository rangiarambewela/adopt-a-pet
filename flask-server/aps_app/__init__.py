import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        'sqlite:///' + os.path.join(basedir, 'database.db')  # configure the URI to the database file
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # disable tracking of modifications to objects

    db.init_app(app)  # connect database to Flask app

    from aps_app.routes.test import test
    app.register_blueprint(test)

    return app
