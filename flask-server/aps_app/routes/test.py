from flask import Blueprint
from aps_app.models.dogs import Dog


test = Blueprint("test", __name__)
# test api route


@test.route("/test")
def test_function():
    all_dogs = Dog.query.all()
    print(all_dogs)
    out = []
    for dog in all_dogs:
        out.append({
            'id': dog.dogId,
            'name': dog.name,
            'sex': dog.sex,
            'age': dog.age
        })

    return out
