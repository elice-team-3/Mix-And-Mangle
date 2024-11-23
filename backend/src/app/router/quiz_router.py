from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.app.schema import QuizCreateRequest, QuizResponse, QuizListRequest, QuizBulkCreateSchema
from src.db.model import Quiz, Event
from src.db.session import get_session

router = APIRouter(
    tags=["이벤트 퀴즈"],
)


@router.post(
    "/quiz",
    name="퀴즈 생성",
    description="이벤트에 관련된 퀴즈를 생성합니다.",
    status_code=201,
    response_model=QuizResponse,
    response_description="Created"
)
async def _(
        quiz: QuizCreateRequest,
        session: AsyncSession = Depends(get_session),
):
    new_quiz = Quiz(**quiz.model_dump())
    session.add(new_quiz)
    await session.commit()
    await session.refresh(new_quiz)
    return QuizResponse(
        **new_quiz.__dict__
    )


@router.post(
    "/quiz/bulk",
    name="퀴즈를 여러개 생성",
    description="이벤트에 관련된 퀴즈를 여러개 생성합니다.",
    status_code=201,
    response_model=list[QuizResponse],
)
async def _(
        bulk_create: QuizBulkCreateSchema,
        session: AsyncSession = Depends(get_session),
):
    event_id = bulk_create.event_id
    event = await session.scalar(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    new_quizzes = [
        Quiz(event_id=event_id, **q.model_dump()) for q in bulk_create.quizzes
    ]
    session.add_all(new_quizzes)

    await session.commit()
    await session.refresh(new_quizzes)
    return QuizResponse(
        **new_quizzes.__dict__
    )


@router.get(
    "/quiz",
    name="퀴즈 리스트",
    description="이벤트에 관련된 퀴즈 리스트를 가져옵니다.",
    status_code=200,
    response_model=list[QuizResponse],
)
async def _(
        quiz_request: QuizListRequest = Depends(),
        session: AsyncSession = Depends(get_session),
):
    stmt = select(Quiz)
    stmt.order_by(Quiz.id)
    if quiz_request.event_id:
        stmt = stmt.where(Quiz.event_id == quiz_request.event_id)
    result = await session.execute(stmt)

    return [QuizResponse(**q.__dict__) for q in set(result.scalars())]


@router.delete(
    "/quiz/{quiz_id}",
    name="퀴즈 삭제",
    description="퀴즈를 삭제합니다.",
    status_code=204,
)
async def _(
        quiz_id: int,
        session: AsyncSession = Depends(get_session),
):
    stmt = select(Quiz).where(Quiz.id == quiz_id)
    quiz = await session.execute(stmt)

    if not quiz:
        raise HTTPException(status_code=404, detail="퀴즈를 찾을 수 없습니다.")

    await session.delete(quiz)
    await session.commit()
