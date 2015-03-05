from faker import Factory
from .models import User, Task
import random
import datetime
from coaction import db


def create_specified_user(email, password, name, username):
    user = User(email=email, name=name, password=password, username=username)
    db.session.add(user)
    db.session.commit()
    return user

def create_task(user_id=1):
    fake = Factory.create()
    name = fake.text(max_nb_chars=10)
    status = fake.text(max_nb_chars=20)
    description = fake.text(max_nb_chars=random.randint(1,500))
    date_added = fake.date_time_between(start_date="-10d", end_date="now")
    if random.random() > .9:
        date_completed = fake.date_time_between(start_date="-3d", end_date="-1d")
    else:
        date_completed = None
    date_due = fake.date_time_between(start_date="-2d", end_date="+15d")

    item = Item(owner_id = user_id,
                name = name,
                status = status,
                description = description,
                date_added = date_added,
                date_completed = date_completed,
                date_due = date_due)
    db.session.add(item)
    db.session.commit()
    return True
