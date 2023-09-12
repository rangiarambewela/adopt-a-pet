from sqlalchemy.orm import relationship

from aps_app import db
import datetime
from sqlalchemy import Column, Integer, DateTime, Date, String, Boolean, Float, Text, JSON, ForeignKey


class Dogs(db.Model):

    __tablename__ = "dogs"

    dog_id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    coordinator_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    name = Column(String(20), nullable=False)
    birthdate = Column(Date, nullable=False)
    sex = Column(String(1), nullable=False)
    breed = Column(String(100), nullable=False, default="Unknown")
    size = Column(String(20), nullable=False)
    color = Column(String(100), nullable=False)
    house_trained = Column(Boolean, nullable=False)
    good_with_kids = Column(Boolean, nullable=False)
    intake_date = Column(Date, default=lambda: datetime.date.today())
    adoption_fee = Column(Float, nullable=False)
    status = Column(Integer, nullable=False, default=1)
    display_status = Column(Integer, nullable=False, default=0)
    data = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.datetime.utcnow())

    coordinator = relationship("Users")

    @classmethod
    def create(cls, coordinator_id, name, birthdate, sex, breed, color, size, house_trained, good_with_kids, intake_date, adoption_fee, status, display_status, data):
        new_dog = Dogs(
            coordinator_id=coordinator_id,
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
            display_status=display_status,
            data=data
        )

        db.session.add(new_dog)
        db.session.commit()

        return new_dog

    @classmethod
    def __repr__(cls):
        return f'<Dog: {cls.name}, Age: {cls.age}, Sex: {cls.sex}, ID: {cls.dog_id}>'  # function ensures readable print statement for debugging


class DogImages(db.Model):

    __tablename__ = "dog_images"

    image_id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    dog_id = Column(Integer, ForeignKey("dogs.dog_id"), nullable=False)
    asset_id = Column(String(100), nullable=False)  # NOT SURE IF THIS LENGTH IS OK
    image_url = Column(Text, nullable=False)
    original_filename = Column(Text, nullable=False)
    format = Column(String(20), nullable=False)
    public_id = Column(Text, nullable=False)
    secure_url = Column(Text, nullable=False)
    signature = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False)

    dog = relationship("Dogs")

    @classmethod
    def store_dog_image(cls, dog_id, image):
        new_img = DogImages(
            dog_id=dog_id,
            asset_id=image["asset_id"],
            image_url=image["image_url"],
            original_filename = image["original_filename"],
            format=image["format"],
            public_id=image["public_id"],
            secure_url=image["secure_url"],
            signature=image["signature"],
            created_at=image["created_at"],
        )

        db.session.add(new_img)
        db.session.commit()

        return new_img
