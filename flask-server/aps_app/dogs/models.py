from sqlalchemy.orm import relationship

from aps_app import db
import datetime
from sqlalchemy import Column, Integer, DateTime, Date, String, Boolean, Float, JSON, ForeignKey


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
    data = Column(JSON, nullable=False, default={})
    created_at = Column(DateTime, default=lambda: datetime.datetime.utcnow())

    # STATUS 1 = available
    # STATUS 0 = unavailable
    # STATUS 2 = pending

    coordinator = relationship("Users")

    @classmethod
    def create(cls, coordinator_id, name, birthdate, sex, breed, color, size, house_trained, good_with_kids, intake_date, adoption_fee, status):
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
            status=status
        )

        db.session.add(new_dog)
        db.session.commit()

        return new_dog

    @classmethod
    def __repr__(cls):
        return f'<Dog: {cls.name}, Age: {cls.age}, Sex: {cls.sex}, ID: {cls.dog_id}>'  # function ensures readable print statement for debugging



