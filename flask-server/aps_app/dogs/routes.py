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
def get_all_dogs():

    user_id = session.get("user_id")
    # Should not need to do the check below anymore because before_request takes care of it
    # if not user_id:
    #     return dict_json_response({
    #         "authenticated": False,
    #         "status": "error",
    #         "errors": {
    #             "message": "User is not authenticated"
    #         }
    #     }, 401)

    all_dogs = Dogs.query.filter_by(coordinator_id=user_id)

    out = []
    for dog in all_dogs:
        out.append({
            'id': dog.dog_id,
            'type': "dog",
            'name': dog.name,
            'birthdate': dog.birthdate.strftime("%b %d %Y"),
            'sex': dog.sex,
            'status': dog.status,
            'image': dog.data.get("image")
        })

    return dict_json_response(out, 200)


@dogs.route("/api/dogs/new", methods=["POST"])
# validate_authentication
@validate_payload(CreateDogSchema)
def create_new_dog(payload):
    print(payload)
    # return dict_json_response({}, 200)
    # NEED TO USE VALIDATE AUTH to get user object
    name = payload.get("name")
    breed = payload.get("breed")
    color = payload.get("color")
    birthdate = payload.get("birthdate")
    sex = payload.get("sex")
    size = payload.get("size")
    house_trained = payload.get("house_trained")
    good_with_kids = payload.get("good_with_kids")
    intake_date = payload.get("intake_date")
    adoption_fee = payload.get("adoption_fee")
    status = payload.get("status")

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
        new_dog = Dogs.create(
            coordinator_id=user_id,
            name=name,
            birthdate=birthdate,
            sex=sex,
            breed=breed,
            color=color,
            size=size,
            house_trained=house_trained,
            good_with_kids=good_with_kids,
            intake_date=intake_date,
            adoption_fee=adoption_fee,
            status=status)
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
