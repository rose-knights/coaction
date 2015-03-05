from flask import Blueprint, flash
from flask import jsonify


coaction = Blueprint("coaction", __name__, static_folder="./static")


@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")


## Add your API views here

@coaction.route("/tasks")
@coaction.route("/tasks/")
def list_all_tasks():
    test_data =  [{"data": {
                            "id": 1,
                            "name": "Add tasks to task list",
                            "status": "doing",
                            "date_added": "2015-03-04",
                            "date_completed": None,
                            "date_due": "2015-03-14",
                            "description": "This is the first task added to list!",
                            "owner_id": 1
                           }
                  },
                  {"data": {
                            "id": 2,
                            "name": "Testing adding tasks to task list",
                            "status": "to-do",
                            "date_added": "2015-03-05",
                            "date_completed": None,
                            "date_due": "2015-03-16",
                            "description": "This is the second task added to list.",
                            "owner_id": 2
                           }
                  },
                  {"data": {
                            "id": 3,
                             "name": "Add a bunch of fake data to the list",
                             "status": "done",
                             "date_added": "2015-03-01",
                             "date_completed": "2015-03-05",
                             "date_due": None,
                             "description": "Provide fake data for front-end tests",
                             "owner_id": 1
                            }
                  }]
    return jsonify(tasks=test_data), 200

@coaction.route("/tasks", methods=["POST"])
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
