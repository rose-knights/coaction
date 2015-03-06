#!/usr/bin/env python
import os
import random

from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import MigrateCommand
from flask.ext.script.commands import ShowUrls, Clean

from coaction import create_app, db
from coaction.generate_seed_data import create_specified_user, create_task, \
                                 create_multiple_users, create_task_comment, \
                                 task_comment_creation
from coaction.models import User

app = create_app()
manager = Manager(app)
manager.add_command('server', Server())
manager.add_command('db', MigrateCommand)
manager.add_command('show-urls', ShowUrls())
manager.add_command('clean', Clean())


@manager.shell
def make_shell_context():
    """ Creates a python REPL with several default imports
        in the context of the app
    """
    return dict(app=app, db=db)


@manager.command
def createdb():
    """Creates the database with all model tables.
    Migrations are preferred."""
    db.create_all()


@manager.command
def seed(tasks=27, users=10):
    """Seed database."""

    test_user = create_specified_user('test@test.com', 'test',
                                      'Test', 'testusername')
    create_multiple_users(users)
    user_list = User.query.all()
    comment_count = 0
    for user in user_list:
        for task in range(random.randint(1, 10)):
            counter = task_comment_creation(user)
            comment_count += counter
    db.session.commit()

    print('Tasks: {} Users: {} Comments: {}\n'
          'Test Username: {}\nTest Password: {}'.format(tasks, users,
                                                        comment_count,
                                                        test_user.username,
                                                        test_user.password))

if __name__ == '__main__':
    manager.run()
