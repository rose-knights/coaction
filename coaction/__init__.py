from flask import Flask, render_template

from . import models
from .extensions import db, migrate, config, login_manager
from .views import coaction


SQLALCHEMY_DATABASE_URI = "postgres://localhost/coaction"
DEBUG = True
SECRET_KEY = 'development-key'


def create_app():
    app = Flask(__name__)
    app.config.from_object(__name__)
    app.register_blueprint(coaction)

    login_manager.init_app(app)
    config.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    login_manager.init_app(app)


    return app
