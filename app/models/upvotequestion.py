from .db import db, environment, SCHEMA, add_prefix_for_prod

upvotesquestion = db.Table(
    'upvotesquestion',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('question_id', db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), primary_key=True)
)

if environment == "production":
    upvotesquestion.schema = SCHEMA
