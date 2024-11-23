from datetime import datetime, date

from fastapi.params import Query
from pydantic import BaseModel, Field, field_validator
from pydantic.dataclasses import dataclass

from src.util.enum import PERSONALITY, EVENTSTATUS, GROUPINGOPTION


###############
# User Schema #
###############

class UserCreateRequest(BaseModel):
    user_id: str = Field(..., description="사용자 아이디")
    name: str = Field(..., description="사용자 이름")
    birth_date: date = Field(..., description="생년월일")

    job: str = Field(None, description="직업")
    personality: PERSONALITY | None = Field(None, description="성격")
    interest: list[str] = Field([], description="관심사")
    hobby: list[str] = Field([], description="취미")


class UserUpdateRequest(BaseModel):
    name: str | None = Field(..., description="사용자 이름")
    birth_date: date | None = Field(..., description="생년월일")

    job: str | None = Field(None, description="직업")
    personality: PERSONALITY | None = Field(None, description="성격")
    interest: list[str] | None = Field([], description="관심사")
    hobby: list[str] | None = Field([], description="취미")


class UserResponse(BaseModel):
    user_id: str = Field(..., description="사용자 아이디")
    name: str
    birth_date: date = Field(..., description="생년월일")

    job: str = Field(None, description="직업")
    personality: PERSONALITY | None = Field(None, description="성격")
    interest: list[str] = Field([], description="관심사")
    hobby: list[str] = Field([], description="취미")

    created_at: str = Field(..., description="생성일")
    updated_at: str = Field(..., description="수정일")


################
# Event Schema #
################

class EventCreateRequest(BaseModel):
    name: str = Field(..., description="이벤트 이름")
    description: str = Field(..., description="이벤트 설명")
    status: EVENTSTATUS = Field(EVENTSTATUS.PENDING, description="이벤트 상태")
    start_date: datetime = Field(..., description="이벤트 시작일")
    end_date: datetime = Field(..., description="이벤트 종료일")
    additional_info: str = Field("", description="추가 정보")

    @field_validator('start_date', 'end_date', mode='before')
    def set_naive_datetime(cls, v):
        if isinstance(v, str):
            try:
                v = datetime.fromisoformat(v)
            except ValueError:
                raise ValueError(f"Invalid date format: {v}")

        if isinstance(v, datetime) and v.tzinfo is not None:
            return v.replace(tzinfo=None)  # 시간대 정보 제거
        return v


class EventUpdateRequest(BaseModel):
    name: str | None = Field(..., description="이벤트 이름")
    description: str | None = Field(..., description="이벤트 설명")
    status: EVENTSTATUS | None = Field(EVENTSTATUS.PENDING, description="이벤트 상태")
    start_date: datetime | None = Field(..., description="이벤트 시작일")
    end_date: datetime | None = Field(..., description="이벤트 종료일")
    additional_info: str | None = Field("", description="추가 정보")

    @field_validator('start_date', 'end_date', mode='before')
    def set_naive_datetime(cls, v):
        if isinstance(v, str):
            try:
                # ISO 8601 포맷에서 datetime 객체로 변환
                v = datetime.fromisoformat(v)
            except ValueError:
                raise ValueError(f"Invalid date format: {v}")

        if isinstance(v, datetime) and v.tzinfo is not None:
            return v.replace(tzinfo=None)  # 시간대 정보 제거
        return v


class EventResponse(BaseModel):
    event_id: int = Field(..., description="이벤트 아이디")
    name: str = Field(..., description="이벤트 이름")
    description: str = Field(..., description="이벤트 설명")
    status: str = Field(..., description="이벤트 상태")
    start_date: str = Field(..., description="이벤트 시작일")
    end_date: str = Field(..., description="이벤트 종료일")
    additional_info: str = Field("", description="추가 정보")
    created_at: str = Field(..., description="생성일")
    updated_at: str = Field(..., description="수정일")
    deleted_at: str | None = Field(None, description="삭제일")


class EventGroupingRequest(BaseModel):
    count: int = Field(1, description="나눌 조의 수")
    job: GROUPINGOPTION | None = Field(GROUPINGOPTION.RANDOM, description="직업")
    personality: GROUPINGOPTION | None = Field(GROUPINGOPTION.RANDOM, description="성격")
    interest: GROUPINGOPTION | None = Field(GROUPINGOPTION.RANDOM, description="관심사")


class EventGroupInfo(BaseModel):
    group_info: dict[str, int] = Field(..., description="조 편성 목록 {'user_id' : int}")


##################
# Session Schema #
##################

class SessionCreateRequest(BaseModel):
    user_id: str = Field(..., description="사용자 아이디")
    event_id: int = Field(..., description="이벤트 아이디")


class SessionResponse(BaseModel):
    session_id: int = Field(..., description="세션 아이디")
    user_id: str = Field(..., description="사용자 아이디")
    event_id: int = Field(..., description="이벤트 아이디")
    group_id: int | None = Field(None, description="그룹 아이디")
    created_at: str = Field(..., description="생성일")
    updated_at: str = Field(..., description="수정일")
    deleted_at: str | None = Field(None, description="삭제일")


################
#  Quiz Schema #
################

class QuizCreateRequest(BaseModel):
    event_id: int = Field(..., description="이벤트 아이디")
    question: str = Field(..., description="문제")
    answer: str = Field(..., description="정답")
    options: list[str] = Field(..., description="선택지")


@dataclass
class QuizListRequest:
    event_id: int | None = Query(default=None, description="이벤트 아이디")


class QuizResponse(BaseModel):
    id: int = Field(..., description="퀴즈 아이디")
    event_id: int = Field(..., description="이벤트 아이디")
    question: str = Field(..., description="문제")
    answer: str = Field(..., description="정답")
    options: list[str] = Field(..., description="선택지")
