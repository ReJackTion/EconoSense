from sqlalchemy import Integer, String, Column, Boolean
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=True)
    surname = Column(String(256), nullable=True)
    email = Column(String, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    email_notification = Column(Boolean, default=True)
    # is_superuser = Column(Boolean, default=False)
    # recipes = relationship(
    #     "Recipe",
    #     cascade="all,delete-orphan",
    #     back_populates="submitter",
    #     uselist=True,
    # )
