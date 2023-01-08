from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import User



def imageURL_validation(form, field):
    img = field.data
    if not img[-3:] == 'jpg' and (not img[-3:] == 'png') and img[-4:] != 'jpeg' and img[-4:] != 'webp' and img[-3:] != 'gif' and img[-3:] != 'svg':

        raise ValidationError("Input must be a valid Image Url.")

def bio_validation(form, field):
    bio = field.data
    if len(bio) > 60:

        raise ValidationError("Bio must be no more than 60 characters")

def description_validation(form, field):
    description = field.data
    if len(description) > 255:

        raise ValidationError("Desscription must be no more than 255 characters")


class ProfileForm(FlaskForm):

    avatar = StringField('avatar', validators=[Optional(), imageURL_validation])
    bio = StringField('bio', validators=[Optional(), bio_validation])
    description = StringField('description', validators=[Optional(), description_validation])
