from flask import Blueprint, jsonify, session, request
from app.models import db, User, Question, Answer
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime
from app.forms import ProfileForm

now= datetime.now()

profile_routes = Blueprint('profiles', __name__)

@profile_routes.route('/<int:id>')
def profile(id):
    profile = User.query.get(id)
    if profile is None:
        return {'message': "No such profile"}
    return profile.to_dict()

#get one user's question
@profile_routes.route('/<int:id>/questions')
def profile_questions(id):
    questions = Question.query.filter(Question.userId == id)
    if questions is None:
        return {'message': "No such question for the user"}
    return {'questions': [question.to_dict() for question in questions]}

#get one user's answer
@profile_routes.route("/<int:id>/answers")
def profile_answers(id):
    answers = Answer.query.filter(Answer.userId == id)
    if answers is None:
        return {'message': "No such question for the user"}
    return {'answers': [answer.to_dict() for answer in answers]}


#update profile
@profile_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def update_profile(id):
    # print(id)
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    edit_profile = User.query.get(id)
    # print(edit_product)
    if edit_profile is None:
        return {"errors" : "Profile couldn't be found"}, 404
    if edit_profile.id != current_user.id:
        return {"errors" : "You don't have the right to edit the profile"}, 403

    if form.validate_on_submit():
        edit_profile = User.query.get(id)
        edit_profile.avatar = form.data['avatar']
        edit_profile.bio = form.data['bio']
        edit_profile.description = form.data['description']
        # edit_product.userId = current_user.id
        # edit_product.createdAt = now,
        edit_profile.updatedAt = now
        # db.session.add(edit_product)
        db.session.commit()
        return edit_profile.to_dict()
    return {"errors" : validation_errors_to_error_messages(form.errors)}, 400
