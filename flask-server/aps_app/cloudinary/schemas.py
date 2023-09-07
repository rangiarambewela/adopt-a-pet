from marshmallow import Schema, fields


class ImageSchema(Schema):
    asset_id = fields.Str(required=True)
    created_at = fields.DateTime(required=True)
    original_filename = fields.Str(required=True)
    format = fields.Str(required=True)
    public_id = fields.Str(required=True)
    secure_url = fields.Str(required=True)
    signature = fields.Str(required=True)
    image_url = fields.Str(required=True)


class DeleteImagesSchema(Schema):
    images = fields.List(fields.Nested(ImageSchema()), required=True)
