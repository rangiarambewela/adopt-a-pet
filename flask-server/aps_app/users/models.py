

from aps_app import db, bcrypt
import datetime
from sqlalchemy import Column, Integer, DateTime, String, BINARY, BOOLEAN, Text



class User(db.Model):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    username = Column(String(20), unique=True, nullable=False)
    first_name = Column(String(), nullable=False)
    last_name = Column(String(), nullable=False)
    email = Column(String(345), unique=True, nullable=False)
    password = Column(BINARY(60), nullable=False)  # suggested by https://stackoverflow.com/questions/5881169/what-column-type-length-should-i-use-for-storing-a-bcrypt-hashed-password-in-a-d
    admin_status = Column(BOOLEAN, nullable=False, default=False)
    created_at = Column(DateTime, default=lambda: datetime.datetime.utcnow())



    @classmethod
    def find_by_email(cls, email):
        user = cls.query.filter_by(email=email).first()
        if not user:
            return None
        return user

    @classmethod
    def find_by_username(cls, username):
        user = db.session.query(cls).filter_by(username=username).first()
        if not user:
            return None
        return user

    @classmethod
    def find_by_id(cls, user_id):
        user = db.session.query(cls).filter_by(user_id=user_id).first()
        if not user:
            return None
        return user

    @classmethod
    def register_user(cls, username, fname, lname, email, password):

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(
            username=username,
            first_name=fname,
            last_name=lname,
            email=email,
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()

        return new_user

    # @classmethod
    # def get_user(cls, username):
    #     user = cls.find_by_username(username)
    #     if not user:
    #         return None
    #
    #     user_data = {
    #         "id": user.user_id,
    #         "username": user.username,
    #         "first_name": user.first_name,
    #         "last_name": user.last_name,
    #         "email": user.email,
    #         "created_at": user.created_at.strftime("%Y-%m-%d %H:%M:%S")
    #     }
    #     return user_data
