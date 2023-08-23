from marshmallow import Schema, fields, validates_schema, ValidationError


class CreateDogSchema(Schema):
    name = fields.Str(required=True)
    age = fields.Integer(required=True)
    sex = fields.Str(required=True)
    status = fields.Integer(required=True)

    @validates_schema
    def validate_create_dog_form(self, data, **kwargs):
        email_regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
        errors = {}
        possible_statuses = [0, 1, 2]

        if data["status"] not in possible_statuses:
            errors["status"] = ["Please enter valid adoption status"]
        if errors:
            raise ValidationError(errors)