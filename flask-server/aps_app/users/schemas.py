from marshmallow import (
    Schema,
    fields,
    ValidationError,
    validates_schema,
)
from aps_app.users.models import User
import re


class UserLoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class UserRegisterSchema(Schema):
    firstName = fields.Str(required=True)
    lastName = fields.Str(required=True)
    email = fields.Str(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)

    @validates_schema
    def validate_registration_form(self, data, **kwargs):
        email_regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
        errors = {}

        if len(data["firstName"]) == 0:
            errors["first_name"] = ["Please enter your name"]
        if len(data["lastName"]) == 0:
            errors["last_name"] = ["Please enter your name"]
        if re.match(email_regex, data["email"]) is None:
            errors["email"] = ["Please enter a valid email"]
        elif User.find_by_email(data["email"]) is not None:
            errors["email"] = ["This email is already taken"]
        if User.find_by_username(data["username"]) is not None:
            errors["username"] = ["This username is already taken"]
        if (len(data["password"]) < 6) or (len(data["password"]) > 255):
            errors["password"] = [
                "Please ensure your password is 6 - 48 characters long"
            ]
        if errors:
            raise ValidationError(errors)