from flask import Blueprint, request, session
from .models import Users
from .schemas import (
    UserLoginSchema,
    UserRegisterSchema,
)
from aps_app.authentication.utils import validate_payload, public_endpoint
from aps_app import dict_json_response, bcrypt

users = Blueprint("user", __name__)


@users.route("/api/users")
def get_all_users():
    # all_users = User.query.all()
    # print(all_users)
    # out = []
    # for u in all_users:
    #     out.append({
    #         'id': u.user_id,
    #         'name': u.username,
    #     })
    #
    # return out
    return {
        'status': 200,
    }


@users.route('/api/login', methods=["POST"])
@public_endpoint()
@validate_payload(UserLoginSchema)
def login_user(payload):
    username = payload.get("username")
    password = payload.get("password")

    found_user = Users.find_by_username(username)

    if found_user is None:
        return dict_json_response({
            "authenticated": False,
            "status": "error",
            "errors": {
                "message": "Username or password is incorrect."
            }
        }, 401)

    # Found user - need to check password
    password_match = bcrypt.check_password_hash(found_user.password, password)
    if not password_match:
        return dict_json_response({
            "authenticated": False,
            "status": "error",
            "errors": {
                "message": "Username or password is incorrect."
            }
        }, 401)

    session["user_id"] = found_user.user_id

    # Credentials matched - log in successful
    user_info = {
        "id": found_user.user_id,
        "username": found_user.username,
        "first_name": found_user.first_name,
        "last_name": found_user.last_name,
        "email": found_user.email,
        "created_at": found_user.created_at.strftime("%Y-%m-%d %H:%M:%S")
    }

    json_dict = {
        "status": "success",
        "message": "Login Success",
        "user": user_info
    }
    return dict_json_response(json_dict, 200)


@users.route('/api/check-authentication', methods=['GET'])
@public_endpoint()
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return dict_json_response({
            "authenticated": False,
            "status": "error",
            "errors": {
                "message": "User is not authenticated"
            }
        }, 401)

    user = Users.find_by_id(user_id)

    user_info = {
        "id": user.user_id,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "created_at": user.created_at.strftime("%Y-%m-%d %H:%M:%S")
    }

    json_dict = {
        "status": "success",
        "message": "User Authenticated",
        "user": user_info
    }
    return dict_json_response(json_dict, 200)


@users.route('/api/register', methods=["POST"])
@validate_payload(UserRegisterSchema)
def register_user(payload):
    print(request.json)
    print(payload)
    username = payload.get("username")
    first_name = payload.get("firstName")
    last_name = payload.get("lastName")
    email = payload.get("email")
    password = payload.get("password")

    user_exists = Users.query.filter_by(username=username).first() is not None

    if user_exists:
        out = {"errors": {"username": "Username is already taken."}, "status": "error"}
        return dict_json_response(out, 200)

    new_user = Users.register_user(username, first_name, last_name, email, password)
    user_info = {
        "id": new_user.user_id,
        "username": new_user.username,
        "first_name": new_user.first_name,
        "last_name": new_user.last_name,
        "email": new_user.email,
        "created_at": new_user.created_at.strftime("%Y-%m-%d %H:%M:%S")
    }

    json_dict = {
        "status": "success",
        "message": "Created new user",
        "user": user_info
    }
    return dict_json_response(json_dict, 200)


@users.route('/api/logout', methods=['POST'])
def logout_user():
    try:
        session.pop("user_id")
        json_dict = {
            "status": "success",
            "message": "User logged out.",
        }
        return dict_json_response(json_dict, 200)
    except Exception as e:
        json_dict = {
            "status": "error",
            "message": "Something went wrong.",
        }
        return dict_json_response(json_dict, 400)


