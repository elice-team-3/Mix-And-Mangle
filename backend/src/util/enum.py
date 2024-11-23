from enum import Enum


class PERSONALITY(Enum):
    INTROVERT = "내향적"
    AMBIVERT = "양면성"
    EXTROVERT = "외향적"


class EVENTSTATUS(Enum):
    PENDING = "대기중"
    ONGOING = "진행중"
    FINISHED = "종료됨"
    CANCLED = "취소됨"


class GROUPINGOPTION(Enum):
    RANDOM = "랜덤"
    SIMILARITY = "유사성"
