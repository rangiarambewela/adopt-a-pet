from flask import Blueprint, request, session
from .models import Dogs, DogImages
from aps_app.authentication.utils import validate_payload
from aps_app import dict_json_response
from .schemas import CreateDogSchema
from ..cloudinary.cloudinary_utils import delete_cloudinary_images
from ..cloudinary.schemas import DeleteImagesSchema

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
@validate_payload(CreateDogSchema)
def create_new_dog(payload):
    print(payload)
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
    images = payload.get("images")
    display_status = payload.get("display_status")
    user_id = session.get("user_id")
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
            status=status,
            display_status=display_status
        )

        # Store all images in the database
        for img in images:
            DogImages.store_dog_image(new_dog.dog_id, img)

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


@dogs.route('/api/dogs/delete-cloudinary-images', methods=['POST'])
@validate_payload(DeleteImagesSchema)
def delete_dog_images(payload):
    images = payload.get('images')
    delete_cloudinary_images(images)
    out = {"message": "success"}
    return dict_json_response(out, 200)
