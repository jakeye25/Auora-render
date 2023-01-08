from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import  db, User, follows
from app.api.auth_routes import validation_errors_to_error_messages


follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/users/<int:id>', methods=['POST'])
@login_required
def follow_user(id):

    user = User.query.get(id)
    if user is None:
        return {'message': "No such user"}, 404

    if user.id == current_user.id:
        return {"message":"You can't follow yourself"}, 401

    if current_user not in user.followers:
        user.followers.append(current_user)
        db.session.commit()
        return {'user': user.to_dict()}
    else:
       return {"message": "You already follow this user"}


@follow_routes.route('/unfollow/users/<int:id>', methods=['POST'])
@login_required
def unfollow_user(id):

    user = User.query.get(id)
    if user is None:
        return {'message': "No such user"}, 404

    if user.id == current_user.id:
        return {"message":"You can't unfollow yourself"}, 401

    if current_user in user.followers:
        user.followers.remove(current_user)
        db.session.commit()
        return {'user': user.to_dict()}
    else:
       return {"message": "You are not following this user"}
