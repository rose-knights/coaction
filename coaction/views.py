from flask import Blueprint, flash, jsonify, request
from datetime import datetime

from .models import Task
from .extensions import db, hasher

coaction = Blueprint("coaction", __name__, static_folder="./static")


@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")


@coaction.route("/tasks/")
def list_all_tasks():
    tasks = Task.query.all()
    tasks = [task.to_dict() for task in tasks]

    return jsonify(tasks=tasks), 200


@coaction.route("/tasks/", methods=["POST"])
def add_task():
    """Method: POST
       Adds new task to the database"""
    data = request.get_json()
    new_task = Task(owner_id=1,
                    name=data["name"],
                    status="to_do",
                    description=None,
                    date_added=datetime.today().date()
                    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201


@coaction.route("/tasks/<task_id>")
def view_task(task_id):
    """Method: GET
       Returns all data for a single task from the database."""
    data = request.get_json()
    task = Task.query.filter_by(id=hasher.decode(task_id)[0]).first()
    return jsonify(task.to_dict()), 200


@coaction.route("/tasks/<task_id>", methods=["PUT"])
def edit_task(task_id):
    """Method: PUT
       Updates the fields of a single task and stores changes in the
       database"""
    data = request.get_json()
    task = Task.query.filter_by(id=hasher.decode(task_id)[0]).first()
    task.name = data["name"]
    task.status = data["status"]
    task.description = data["description"]
    task.date_due = task.date_due if not data["date_due"] \
        else datetime.strptime(data["date_due"], "%m/%d/%Y")
    task.date_completed = task.date_completed if not data["date_completed"] \
        else datetime.strptime(data["date_completed"], "%m/%d/%Y")
    db.session.commit()
    return jsonify(task.to_dict()), 201
