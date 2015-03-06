from flask import Blueprint, flash, jsonify, request
from datetime import datetime
from flask.ext.login import login_user, logout_user
from flask.ext.login import login_required, current_user

from .forms import LoginForm, RegistrationForm, AddTask, AddComment
from .models import Task, Comment
from .extensions import db, hasher

coaction = Blueprint("coaction", __name__, static_folder="./static")


@coaction.route("/")
def index():
    return coaction.send_static_file("index.html")


@coaction.route("/login/<user_id>", methods=['POST'])
def login_user(user_id):
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.get_or_404(user_id)
        if user and user.check_password(form.password.data):
            login_user(user)
            return True
        else:
            return "Incorrect username or password", 401
    print('raw: ', form.errors)
    print('jsonified: ', jsonify(form.errors))
    return jsonify(form.errors)


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
                    date_added=datetime.today().date()
                    )
    new_task.description = None if "description" not in data.keys() \
        else data["description"]
    new_task.date_due = None if "date_due" not in data.keys() \
        else datetime.strptime(data["date_due"], "%m/%d/%Y")
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201


@coaction.route("/tasks/<task_id>")
def view_task(task_id):
    """Method: GET
       Returns all data for a single task from the database."""
    data = request.get_json()
    task = Task.query.filter_by(id=hasher.decode(task_id)[0]).first()
    return_task = task.to_dict()
    return_task["comments"] = task.comments
    return jsonify(return_task), 200


@coaction.route("/tasks/<task_id>/comments", methods=["POST"])
def add_comment(task_id):
    """Method: POST
       Add comments to a particular task"""
    data = request.get_json()
    form = AddComment(data=data, formdata=None, csrf_enabled=False)
    if form.validate():
        comment = Comment(owner_id=1,
                          task_id=hasher.decode(task_id)[0],
                          date=datetime.now(),
                          text=data["text"])
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201
    else:
        return jsonify(form.errors), 400


@coaction.route("/tasks/<task_id>/comments/<comment_id>", methods=["PUT"])
def edit_comment(task_id, comment_id):
    """Method: PUT
       Edits selected comment"""
    data = request.get_json()
    form = AddComment(data=data, formdata=None, csrf_enabled=False)
    if form.validate():
        comment = Comment.query.filter_by(id=comment_id).first()
        comment.text = data["text"]
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    else:
        return jsonify(form.errors), 400
        

@coaction.route("/tasks/<task_id>/comments/<comment_id>", methods=["DELETE"])
def delete_comment(task_id, comment_id):
    """Method: DELETE
       Delete specified comment from Database."""
    comment = Comment.query.filter_by(id=comment_id).first()
    db.session.delete(comment)
    db.session.commit()
    return "Comment Successfully Deleted", 200


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


@coaction.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    """Method: DELETE
       Deletes the specified task from the database."""
    task = Task.query.filter_by(id=hasher.decode(task_id)[0]).first()
    db.session.delete(task)
    db.session.commit()
    return "{} Successfully Deleted".format(task_id), 200
