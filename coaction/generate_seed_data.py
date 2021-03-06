from faker import Factory
from .models import User, Task, Comment
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
    status = random.choice(['to_do', 'doing', 'done'])
    description = fake.text(max_nb_chars=random.randint(10,500))
    date_added = fake.date_time_between(start_date="-10d", end_date="now")
    if random.random() > .9:
        date_completed = fake.date_time_between(start_date="-3d",
                                                end_date="-1d")
    else:
        date_completed = None
    date_due = fake.date_time_between(start_date="-2d", end_date="+15d")

    task = Task(owner_id = user_id,
                name = name,
                status = status,
                description = description,
                date_added = date_added,
                date_completed = date_completed,
                date_due = date_due)
    db.session.add(task)
    db.session.commit()
    return task

def create_multiple_users(num=20):
    fake = Factory.create()
    profile = fake.simple_profile()
    for count in range(num):
        profile = fake.simple_profile()
        create_specified_user(email=profile['mail'],
                              password=fake.password(),
                              name=profile['name'],
                              username=profile['username'])

def create_task_comment(task_object):
    fake = Factory.create()
    new_comment = Comment(owner_id=task_object.owner_id,
                          task_id=task_object.id,
                          date=fake.date_time_between(start_date="-30y",
                                                      end_date="now"),
                          text=fake.text(max_nb_chars=random.randint(6,500)))
    db.session.add(new_comment)
    return True

def task_comment_creation(user):
    new_task = create_task(user.id)
    count = random.randint(0,3)
    [create_task_comment(new_task) for comment in range(count) if count]
    return count
