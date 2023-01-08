from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.types import DateTime, Date
from .upvotequestion import upvotesquestion

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    questioncontent = db.Column(db.String(1000), nullable=False)
    questionimage = db.Column(db.String(1000))
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)
    topicId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('topics.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    answers = db.relationship('Answer', back_populates='question', cascade='all, delete')
    topic = db.relationship('Topic', back_populates='questions')
    user = db.relationship('User', back_populates='questions')

    question_upvotes = db.relationship('User', secondary=upvotesquestion, back_populates='user_upvotes')

    def to_dict(self):
        return {
            'id': self.id,
            'questioncontent': self.questioncontent,
            'userId':self.userId,
            'topicId':self.topicId,
            'questionimage':self.questionimage,
            'createdAt':self.createdAt,
            'updatedAt':self.updatedAt,
            'answers': [answer.to_dict() for answer in self.answers],
            'username': self.user.username if self.user else None,
            'avatar': self.user.avatar if self.user else None,
            "followers": [user.id for user in self.user.followers],
            "question_upvotes": [user.id for user in self.question_upvotes]
        }
