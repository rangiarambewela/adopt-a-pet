from functools import wraps
from flask import request
from marshmallow import ValidationError
from aps_app import dict_json_response


def public_endpoint(*args, **kw):
    """Flags endpoints that do not need authentication"""
    # All endpoints are treated as private by default
    # If not marked by this decorator, the endpoint will require user to be authenticated to proceed
    # Solution taken from:
    # https://stackoverflow.com/questions/19574694/flask-hit-decorator-before-before-request-signal-fires

    def wrapper(endpoint_method):
        endpoint_method._skip_authentication = True

        @wraps(endpoint_method)
        def wrapped(*endpoint_args, **endpoint_kw):
            return endpoint_method(*endpoint_args, **endpoint_kw)
        return wrapped
    return wrapper


def validate_payload(schema, many=False):
    """Validate payload schema for incoming requests"""

    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                # Validate payload matches the expected schema
                payload = schema(many=many).load(request.get_json(), unknown="exclude")
                kwargs["payload"] = payload
            except ValidationError as err:
                print(err.messages)
                json_dict = {
                    "status": "error",
                    "message": "Information you've provided is not valid. Please update your input and try again.",
                    "errors": err.messages,
                }
                return dict_json_response(json_dict, 400)
            return f(*args, **kwargs)

        return decorated_function
    return decorator

