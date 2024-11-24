from enum import Enum


class PERSONALITY(Enum):
    INTROVERT = "내향적"
    AMBIVERT = "양면성"
    EXTROVERT = "외향적"


class EVENTSTATUS(Enum):
    PENDING = "wait"
    ONGOING = "ongoing"
    FINISHED = "finished"
    CANCELED = "canceled"


class GROUPINGOPTION(Enum):
    RANDOM = "랜덤"
    SIMILARITY = "유사성"
