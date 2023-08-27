import datetime

from marshmallow import Schema, fields, validates_schema, ValidationError


class CreateDogSchema(Schema):
    name = fields.Str(required=True)
    birthdate = fields.Date(required=True)
    sex = fields.Str(required=True)
    status = fields.Integer(required=True)
    breed = fields.Str(required=True)
    size = fields.Str(required=True)
    color = fields.Str(required=True)
    house_trained = fields.Boolean(required=True)
    good_with_kids = fields.Boolean(required=True)
    intake_date = fields.Date(required=True)
    adoption_fee = fields.Float(required=True)
    status = fields.Integer(required=True)
    data = fields.Dict(required=False, default={})

    @validates_schema
    def validate_create_dog_form(self, data, **kwargs):
        errors = {}
        possible_statuses = [0, 1, 2]

        if data["status"] not in possible_statuses:
            errors["status"] = "Please enter valid adoption status"
        if data["adoption_fee"] > 1000000 or data["adoption_fee"] < 0:
            errors["adoption_fee"] = "Please enter a valid adoption fee"
        if errors:
            raise ValidationError(errors)