from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_length(form, field):
    # Checking if username is longer than 3
    username = field.data
    if len(username) < 3 or len(username) >40:
        raise ValidationError('Username must be 3-40 characters long.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_length(form, field):
    password = field.data
    if len(password) < 6 or len(password)>14:
        raise ValidationError("Password must be between 6 characters to 14 characters.")


def validate_email(form, field):
    email = field.data
    #  if not img[-3:] == 'jpg' and (not img[-3:] == 'png') and img[-4:] != 'jpeg' and img[-4:] != 'webp' and img[-3:] != 'gif' and img[-3:] != 'svg':
    if '@' not in email or  (not email[-4:] == '.com') and (not email[-4:] =='.net') and (not email[-3:]=='.io'):
        raise ValidationError("Invalid email address.")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, validate_email])
    password = StringField('password', validators=[DataRequired(), password_length])
    avatar = StringField('avatar', validators=[Optional()])
