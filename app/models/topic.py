from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.types import DateTime, Date


class Topic(db.Model):
    __tablename__ = 'topics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    topicimage = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    questions = db.relationship('Question', back_populates='topic')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'topicimage':self.topicimage,
            'createdAt':self.createdAt,
            'updatedAt':self.updatedAt,
            "questions": [question.to_dict() for question in self.questions]
        }
