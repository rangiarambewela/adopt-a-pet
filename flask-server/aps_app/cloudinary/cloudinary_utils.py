import cloudinary.uploader
import cloudinary.api
import cloudinary
from dotenv import load_dotenv
import os
load_dotenv()

cloudinary.config(
    cloud_name=os.environ["CLOUNDINARY_CLOUD_NAME"],
    api_key=os.environ["CLOUNDINARY_API_KEY"],
    api_secret=os.environ["CLOUNDINARY_API_SECRET"],
    secure=True
)


def delete_cloudinary_images(images):
    for image in images:
        try:
            cloudinary.uploader.destroy(image.get("public_id"))
        except Exception as e:
            print("Error deleting image from cloudinary")
            print(e)
