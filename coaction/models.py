from .extensions import db, bcrypt, login_manager, hasher
from flask.ext.login import UserMixin
from datetime import datetime


@login_manager.user_loader
def load_user(id):
    return User.query.get(id)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(200), unique=True)
    email = db.Column(db.String(120), unique=True)
    name = db.Column(db.String(120))
    encrypted_password = db.Column(db.String(60))

    def get_password(self):
        return getattr(self, "_password", None)
        return self._password

    def set_password(self, password):
        self._password = password
        self.encrypted_password = bcrypt.generate_password_hash(password)

    password = property(get_password, set_password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.encrypted_password, password)

    def __repr__(self):
        return "<Username {}>".format(self.username)

    def to_dict(self):
        return {"id": self.id,
                "username": self.username,
                "email": self.email,
                "name": self.name}


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(255))
    status = db.Column(db.String(255))
    description = db.Column(db.String(500), nullable=True)
    date_added = db.Column(db.Date)
    date_completed = db.Column(db.Date, nullable=True)
    date_due = db.Column(db.Date, nullable=True)

    def __repr__(self):
        return "<name {}>".format(self.name)

    @property
    def comments(self):
        data = [comment.to_dict() for comment in self.get_comments]
        return jsonify(results=data)

    def to_dict(self, detail=False):
        data= {"id": hasher.encode(self.id),
                "owner_id": self.owner_id,
                "name": self.name,
                "status": self.status,
                "description": self.description,
                "date_added": datetime.strftime(self.date_added, "%m/%d/%Y")
               }
        if self.date_completed:
            data["date_completed"] = datetime.strftime(self.date_completed,
                                                       "%m/%d/%Y")
        else:
            data["date_completed"] = None
        if self.date_due:
            data["date_due"] = datetime.strftime(self.date_due, "%m/%d/%Y")
        else:
            data["date_due"] = None
        return data


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    date = db.Column(db.DateTime, nullable=False)
    text = db.Column(db.String(500))
    task_comments = db.relationship('Task',
        backref=db.backref('get_comments', lazy='dynamic'))

    def __repr__(self):
        return "<comment {}>".format(self.id)

    def to_dict(self):
        return {"id": self.id,
                "owner_id": self.owner_id,
                "task_id": hasher.encode(self.task_id),
                "date": datetime.strftime(self.date, "%m/%d/%y %H:%M"),
                "text": self.text}
