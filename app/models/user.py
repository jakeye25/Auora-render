from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follow import follows
from .upvotequestion import upvotesquestion

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255))
    bio=db.Column(db.String(60))
    description=db.Column(db.String(255))

    questions = db.relationship('Question', back_populates='user', cascade='all,delete')
    answers = db.relationship('Answer', back_populates='user', cascade='all,delete')

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    user_upvotes = db.relationship('Question', secondary=upvotesquestion, back_populates='question_upvotes')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'avatar': self.avatar,
            'bio': self.bio,
            'description': self.description,
            'followers': [{'id':user.id, 'username':user.username, 'avatar':user.avatar} for user in self.followers],
            'following': [{'id':user.id, 'username':user.username, 'avatar':user.avatar} for user in self.following]

        }
