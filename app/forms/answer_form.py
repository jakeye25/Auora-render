from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from app.models import Question
from wtforms.validators import DataRequired, Email, ValidationError, Optional

def answerContent_validation(form, field):
    acontent = field.data
    if len(acontent) < 5 or len(acontent) > 1000:

        raise ValidationError("Content must be more than 5 characters and less than 1000 characters")


def imageURL_validation(form, field):
    img = field.data
    if not img[-3:] == 'jpg' and (not img[-3:] == 'png') and img[-4:] != 'jpeg' and img[-4:] != 'webp' and img[-3:] != 'gif' and img[-3:] != 'svg':

        raise ValidationError("Input must be a valid Image Url")

class AnswerForm(FlaskForm):
    answercontent = StringField("Answer Content", validators= [DataRequired(), answerContent_validation])
    answerimage = StringField("Image URL", validators= [Optional() , imageURL_validation])
