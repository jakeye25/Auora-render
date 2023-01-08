from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.answer_form import AnswerForm
from app.models import Answer, db
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime

now= datetime.now()

answer_routes = Blueprint('answers', __name__)

#get all answers
@answer_routes.route('/')
def answers():
    answers = Answer.query.all()
    return {'answers': [answer.to_dict() for answer in answers]}

#get one answer
@answer_routes.route('/<int:id>')
def answer(id):
    answer = Answer.query.get(id)
    if answer is None:
        return {'message': "No such answer"}
    return answer.to_dict()

#get answers based on questionId
@answer_routes.route('/questions/<int:id>')
def get_question_answers(id):
  question_answers = Answer.query.filter(Answer.questionId == id).all()
  return {'question_answers': [answer.to_dict() for answer in question_answers]}



#get current user question
@answer_routes.route("/current")
@login_required
def currentuser_answer():
    currentuserid = current_user.id
    answers = Answer.query.filter(Answer.userId == currentuserid)
    return {'answers': [answer.to_dict() for answer in answers]}

#create an answer
@answer_routes.route('/questions/<int:id>', methods=['POST'])
@login_required
def create_answer(id):
  form = AnswerForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    newanswer = Answer(
       answercontent = data['answercontent'],
       answerimage = data['answerimage'],
       questionId = id,
       userId = current_user.id,
       createdAt = now,
       updatedAt = now
    )
    db.session.add(newanswer)
    db.session.commit()
    return newanswer.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)},400

#update an answer
@answer_routes.route('/<int:answerId>', methods=['PUT'])
@login_required
def update_product_review(answerId):
    # print(reviewId)
    form = AnswerForm()
    form['csrf_token'].data=request.cookies['csrf_token']
    if form.validate_on_submit():
      updatedanswer= Answer.query.get(answerId)
      if updatedanswer:
         updatedanswer.answercontent = form.data['answercontent']
         updatedanswer.answerimage = form.data['answerimage']

         db.session.commit()
         return updatedanswer.to_dict()
      else:
        return {'message': 'Answer not found'}, 404
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#delete an answer
@answer_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_answer(id):
   answer = Answer.query.get(id)
   if answer:
     db.session.delete(answer)
     db.session.commit()
     return {'message': 'Successfully Deleted'}
   else:
     return {'message': "Answer cant not be found"}
