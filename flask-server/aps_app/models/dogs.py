from aps_app import db
import datetime
from sqlalchemy import Column, Integer, DateTime, String


class Dog(db.Model):
    __tablename__ = "dog"

    dog_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    age = Column(Integer, nullable=False)
    sex = Column(String(1), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.datetime.utcnow())

    def __repr__(self):
        return f'<Dog: {self.name}, Age: {self.age}, Sex: {self.sex}, ID: {self.dogId}>'  # function ensures readable print statement for debugging
