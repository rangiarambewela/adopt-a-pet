from flask import Blueprint, request, session
from .models import Dogs
# from .schemas import (
#     UserLoginSchema,
#     UserRegisterSchema,
# )
from aps_app.authentication.utils import validate_payload
from aps_app import dict_json_response
from .schemas import CreateDogSchema

dogs = Blueprint("dogs", __name__)


@dogs.route("/api/dogs", methods=["GET"])
# validate_authentication
def get_all_dogs():

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
            'id': dog.dog_id,
            'type': "dog",
            'name': dog.name,
            'age': dog.age,
            'sex': dog.sex,
            'status': dog.status,
            'image': dog.data.get("image")
        })

    return dict_json_response(out, 200)


@dogs.route("/api/dogs/new", methods=["POST"])
# validate_authentication
@validate_payload(CreateDogSchema)
def create_new_dog(payload):
    # NEED TO USE VALIDATE AUTH to get user object
    dog_name = payload.get("name")
    dog_age = payload.get("age")
    dog_sex = payload.get("sex")
    dog_status = payload.get("status")

    user_id = session.get("user_id")
    if not user_id:
        return dict_json_response({
            "authenticated": False,
            "status": "error",
            "errors": {
                "message": "User is not authenticated"
            }
        }, 401)
    try:
        new_dog = Dogs.create(user_id, dog_name, dog_age, dog_sex, dog_status)
        out = {
            "status": "success",
            "message": "dog created successfully"
        }
    except Exception as error:
        out = {
            "status": "error",
            "message": "error creating new dog profile"
        }

    return dict_json_response(out, 200)
