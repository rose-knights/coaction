#!/usr/bin/env python
import os

from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import MigrateCommand
from flask.ext.script.commands import ShowUrls, Clean

from coaction import create_app, db
from coaction.generate_seed_data import create_specified_user, create_task


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
def seed():
    """Seed database."""
    tasks = 27
    user = create_specified_user('test@test.com', 'test',
                                 'Test', 'testusername')
    for count in range(tasks):
        create_task(user.id)

    print('Tasks: {} Username: {}'.format(tasks, user.username))


if __name__ == '__main__':
    manager.run()
