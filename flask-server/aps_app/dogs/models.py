from sqlalchemy.orm import relationship

from aps_app import db
import datetime
from sqlalchemy import Column, Integer, DateTime, String, JSON, ForeignKey


class Dogs(db.Model):

    __tablename__ = "dogs"

    dog_id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    coordinator_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    name = Column(String(20), nullable=False)
    age = Column(Integer, nullable=False)
    sex = Column(String(1), nullable=False)
    status = Column(Integer, nullable=False)
    data = Column(JSON, nullable=False, default={})
    created_at = Column(DateTime, default=lambda: datetime.datetime.utcnow())

    coordinator = relationship("Users")

    # STATUS 1 = available
    # STATUS 0 = unavailable
    # STATUS 2 = pending


    def __repr__(self):
        return f'<Dog: {self.name}, Age: {self.age}, Sex: {self.sex}, ID: {self.dog_id}>'  # function ensures readable print statement for debugging



