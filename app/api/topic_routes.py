from flask import Blueprint
from app.models import db, Topic
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime


topic_routes = Blueprint('topics', __name__)

#get all topics
@topic_routes.route('/', methods=['GET'])
def topics():
    topics = Topic.query.all()
    return {'topics': [topic.to_dict() for topic in topics]}
