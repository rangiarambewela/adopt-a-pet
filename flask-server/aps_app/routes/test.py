from flask import Blueprint
from aps_app.dogs.models import Dogs


test = Blueprint("test", __name__)
# test api route


@test.route("/api/test", methods=['GET', 'POST'])
def test_function():
    all_dogs = Dogs.query.all()
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
