from flask import Blueprint, request, session
from .models import Dogs
# from .schemas import (
#     UserLoginSchema,
#     UserRegisterSchema,
# )
from aps_app.authentication.utils import validate_payload
from aps_app import dict_json_response

dogs = Blueprint("dogs", __name__)


@dogs.route("/api/dogs", methods=["GET"])
# validate_authentication
def get_all_dogs():
    print("IN DOGS ROUTE")

    # NEED TO USE VALIDATE AUTH to get user object

    user_id = session.get("user_id")
    if not user_id:
        return dict_json_response({
            "authenticated": False,
            "status": "error",
            "errors": {
                "message": "User is not authenticated"
            }
        }, 401)

    all_dogs = Dogs.query.filter_by(coordinator_id=user_id)

    out = []
    for dog in all_dogs:
        out.append({
            'dog_id': dog.dog_id,
            'name': dog.name,
            'age': dog.age,
            'sex': dog.sex,
            'status': dog.status,
            'image': dog.data["image"]
        })

    return dict_json_response(out, 200)