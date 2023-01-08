from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.types import DateTime, Date


class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    answercontent = db.Column(db.String(1000), nullable=False)
    answerimage = db.Column(db.String(1000))
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)
    questionId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='answers')
    question = db.relationship('Question', back_populates='answers')

    def to_dict(self):
        return {
            'id': self.id,
            'answercontent': self.answercontent,
            'questionId':self.questionId,
            'userId':self.userId,
            'answerimage':self.answerimage,
            'createdAt':self.createdAt,
            'updatedAt':self.updatedAt,
            'question':self.question.questioncontent,
            'username': self.user.username if self.user else None,
            'avatar': self.user.avatar if self.user else None
        }
