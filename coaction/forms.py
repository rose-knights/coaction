from flask_wtf import Form
from wtforms import StringField, PasswordField, DateField, validators
from wtforms.validators import DataRequired, Email, EqualTo, Length, AnyOf
from wtforms.fields.html5 import EmailField



class LoginForm(Form):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password',
                             validators=[DataRequired()])


class RegistrationForm(Form):
    name = StringField('Name', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password',
                             validators=[DataRequired(),
                                         EqualTo('password_verification',
                                         message="Passwords must match"),
                                         Length(min=5)])
    password_verification = PasswordField('Repeat password')


class AddTask(Form):
    name = StringField('Name', validators=[DataRequired()])
    status = StringField('Status', validators=[AnyOf(values=['to_do', 'doing',
                                                             'done'])])
    description = StringField('Description',
                              validators=[validators.Length(max=500)])
    date_due = DateField('Date Due')


class AddComment(Form):
    text = StringField('Comment', validators=[DataRequired()])
