from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Question, db
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime
from app.forms import QuestionForm

from app.s3_aws import (upload_file_to_s3, allowed_file, get_unique_filename)

now= datetime.now()

question_routes = Blueprint('questions', __name__)

#get all questions
@question_routes.route('/')
def questions():
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}

#get one question
@question_routes.route('/<int:id>')
def question(id):
    question = Question.query.get(id)
    if question is None:
        return {'message': "No such question"}
    return question.to_dict()

#get current user question
@question_routes.route("/current")
@login_required
def currentuser_question():
    currentuserid = current_user.id
    questions = Question.query.filter(Question.userId == currentuserid)
    return {'questions': [question.to_dict() for question in questions]}


#create a question
@question_routes.route('/new', methods=["POST"])
@login_required
def add_question():
    # print('**********************', dir(request))
    # print("----------------------------------------------------", dir(request.files))
    # print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", dir(request.form.get))

    # if "questionimage" not in request.files:
        # return {"errors": "image required"}, 400
        # url = "https://a0.muscache.com/im/pictures/60d85131-b43f-4edb-8051-28c0e6bd377a.jpg?im_w=720"
    #     pass
    # else:

    # image = request.files["questionimage"]
    # print("&&&&&&&&&&&&&&&&&&&&&&&&&&", image)
    # if not allowed_file(image.filename):
    #     return {"errors": "file type not permitted"}, 400

    # image.filename = get_unique_filename(image.filename)

    # upload = upload_file_to_s3(image)
    # print("upload######################", upload)
    # if "url" not in upload:
    #     return upload, 400

    # url = upload["url"]

    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_question = Question(
            questioncontent = form.data['questioncontent'],
            questionimage = form.data['questionimage'],
            # questionimage = url,
            userId = current_user.id,
            topicId = form.data['topicId'],
            createdAt = now,
            updatedAt = now
        )

        db.session.add(new_question)
        db.session.commit()
        return new_question.to_dict()
    return {"errors" : validation_errors_to_error_messages(form.errors)}, 400


#update question
@question_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def update_question(id):
    # print(id)
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    edit_question = Question.query.get(id)
    # print(edit_product)
    if edit_question is None:
        return {"errors" : "Question couldn't be found"}, 404
    if edit_question.userId != current_user.id:
        return {"errors" : "You don't have the right to edit the question"}, 403

    if form.validate_on_submit():
        edit_question = Question.query.get(id)
        edit_question.questioncontent = form.data['questioncontent']
        edit_question.topicId = form.data['topicId']
        edit_question.questionimage = form.data['questionimage']
        # edit_product.userId = current_user.id
        # edit_product.createdAt = now,
        edit_question.updatedAt = now
        # db.session.add(edit_product)
        db.session.commit()
        return edit_question.to_dict()
    return {"errors" : validation_errors_to_error_messages(form.errors)}, 400


#delete a question
@question_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_question(id):

    delete_question = Question.query.get(id)

    if delete_question is None:
        return {"errors": "No such question."}

    if delete_question.userId != current_user.id:
        return {"errors" : "You don't have the right to delete the question"}, 403

    db.session.delete(delete_question)
    db.session.commit()
    return {"message":"Successfully deleted!"}

#like a question

@question_routes.route('/<int:id>/upvotes', methods = ["PUT"])
@login_required
def upvote_question(id):

    question = Question.query.get(id)

    if question is None:
        return {'message': "No such question"}

    if current_user not in question.question_upvotes:
        question.question_upvotes.append(current_user)
        db.session.commit()
    else:
        question.question_upvotes.remove(current_user)
        db.session.commit()

    return {'question': question.to_dict()}
