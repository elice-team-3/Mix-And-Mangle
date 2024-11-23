import json
from datetime import datetime, date
from email.policy import default
from typing import Any, Annotated

from sqlalchemy import func, ForeignKey, JSON
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped, as_declarative, declared_attr, mapped_column, relationship


@as_declarative()
class Base:
    id: Any
    __name__: str
    __allow_unmapped__ = True

    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

    @declared_attr
    def __table_args__(cls) -> dict:
        return {"extend_existing": True}


class TimestampAndSoftDeleteBase(Base):
    __abstract__ = True

    is_deleted: Mapped[Annotated[bool, mapped_column(default=False)]]
    created_at: Mapped[Annotated[datetime, mapped_column(default=func.now())]]
    updated_at: Mapped[Annotated[datetime, mapped_column(default=func.now(), onupdate=func.now())]]
    deleted_at: Mapped[Annotated[datetime | None, mapped_column(default=None)]]

    @hybrid_property
    def formatted_created_at(self) -> str:
        return self.created_at.strftime("%Y-%m-%d %H:%M:%S")

    @hybrid_property
    def formatted_updated_at(self) -> str:
        return self.updated_at.strftime("%Y-%m-%d %H:%M:%S")

    @hybrid_property
    def formatted_deleted_at(self) -> str:
        return self.deleted_at.strftime("%Y-%m-%d %H:%M:%S") if self.deleted_at else None


class TimestampBase(Base):
    __abstract__ = True

    created_at: Mapped[Annotated[datetime, mapped_column(default=func.now())]]
    updated_at: Mapped[Annotated[datetime, mapped_column(default=func.now(), onupdate=func.now())]]

    @hybrid_property
    def formatted_created_at(self) -> str:
        return self.created_at.strftime("%Y-%m-%d %H:%M:%S")

    @hybrid_property
    def formatted_updated_at(self) -> str:
        return self.updated_at.strftime("%Y-%m-%d %H:%M:%S")


class User(TimestampAndSoftDeleteBase):
    __tablename__ = "user"
    user_id: Mapped[str] = mapped_column(primary_key=True, unique=True)
    name: Mapped[str] = mapped_column(nullable=False)
    birth_date: Mapped[date] = mapped_column(nullable=False)

    # Optional columns
    job: Mapped[str] = mapped_column(nullable=True)
    personality: Mapped[str] = mapped_column(nullable=True)
    interest: Mapped[list] = mapped_column(JSON, default=[], nullable=True)
    hobby: Mapped[list] = mapped_column(JSON, default=[], nullable=True)

    # Relationship
    sessions: Mapped["Session"] = relationship(
        "Session", back_populates="user", lazy="joined"
    )

    user_answers: Mapped[Any] = relationship(
        "UserAnswer", back_populates="user", lazy="joined"
    )


class Event(TimestampAndSoftDeleteBase):
    __tablename__ = "event"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(nullable=False)

    start_date: Mapped[datetime] = mapped_column(nullable=False)
    end_date: Mapped[datetime] = mapped_column(nullable=False)

    participant_count: Mapped[int] = mapped_column(nullable=False)
    event_category: Mapped[str] = mapped_column(nullable=False)
    additional_info: Mapped[str] = mapped_column(nullable=True)

    # Relationship
    sessions: Mapped[Any] = relationship(
        "Session", back_populates="event", lazy="joined"
    )
    quizzes: Mapped[Any] = relationship(
        "Quiz", back_populates="event", lazy="joined"
    )


class Session(TimestampAndSoftDeleteBase):
    __tablename__ = "session"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("user.user_id"))
    event_id: Mapped[int] = mapped_column(ForeignKey("event.id"))

    group_id: Mapped[int] = mapped_column(nullable=True)

    # Relationship
    user: Mapped[User] = relationship(
        "User", back_populates="sessions", lazy="joined", uselist=False
    )
    event: Mapped[Event] = relationship(
        "Event", back_populates="sessions", lazy="joined", uselist=False
    )


class Quiz(TimestampBase):
    __tablename__ = "quiz"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("event.id"))
    question: Mapped[str] = mapped_column(nullable=False)
    answer: Mapped[str] = mapped_column(nullable=False)
    options: Mapped[list] = mapped_column(JSON, nullable=False)

    # Relationship
    event: Mapped[Event] = relationship(
        "Event", back_populates="quizzes", lazy="joined", uselist=False
    )


class UserAnswer(TimestampBase):
    __tablename__ = "user_answer"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("user.user_id"))
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quiz.id"))
    answer: Mapped[str] = mapped_column(nullable=False)

    # Relationship
    user: Mapped[User] = relationship(
        "User", back_populates="user_answers", lazy="joined"
    )
