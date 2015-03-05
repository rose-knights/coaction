from flask import Blueprint, flash, jsonify, request

from .models import Task


coaction = Blueprint("coaction", __name__, static_folder="./static")


@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")

## Add your API views here

@coaction.route("/tasks/")
def list_all_tasks():
    tasks = Task.query.all()
    tasks = [task.to_dict() for task in tasks]

    return jsonify(tasks=tasks), 200

@coaction.route("/tasks/", methods=["POST"])
def add_task():
    data =  {"data": {
                      "id": 4,
                      "name": "Some name",
                      "status": "to-do",
                      "date_added": "2015-03-05",
                      "date_completed": None,
                      "date_due": None,
                      "description": None,
                      "owner_id": 1
                     }
            }
    return jsonify(data), 201
