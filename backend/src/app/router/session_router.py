from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.app.schema import SessionResponse, SessionCreateRequest, SessionListQuery
from src.db.model import Session
from src.db.session import get_session

router = APIRouter(
    tags=["네트워크 세션"],
)


@router.post(
    "/sessions",
    name="사용자 이벤트 참여",
    description="사용자가 이벤트에 참여합니다.",
    status_code=201,
    response_model=SessionResponse,
    response_description="Created",
)
async def _(
        session_request: SessionCreateRequest,
        db: AsyncSession = Depends(get_session)
):
    result = await db.scalars(
        select(Session)
        .where(Session.user_id == session_request.user_id)
        .where(Session.event_id == session_request.event_id)
        .where(Session.is_deleted == False)
    )
    session = list(result.unique().all())

    if session not in [None, []]:
        raise HTTPException(status_code=409, detail="이미 참여한 세션입니다.")

    session = Session(
        user_id=session_request.user_id,
        event_id=session_request.event_id,
    )

    db.add(session)
    await db.commit()
    await db.refresh(session)

    return SessionResponse(
        session_id=session.id,
        user_id=session.user_id,
        event_id=session.event_id,
        group_id=session.group_id,
        created_at=session.formatted_created_at,
        updated_at=session.formatted_updated_at,
        deleted_at=session.formatted_deleted_at if session.deleted_at else None,
    )


@router.get(
    "/sessions/{session_id}",
    name="네트워크 세션 조회",
    description="네트워크 세션을 조회합니다.",
    status_code=200,
    response_model=SessionResponse,
    response_description="Ok",
)
async def _(
        session_id: int,
        db: AsyncSession = Depends(get_session)
):
    session = await db.scalar(
        select(Session)
        .where(Session.id == session_id)
        .where(Session.is_deleted == False)
    )
    if session is None:
        raise HTTPException(status_code=404, detail="네트워크 세션을 찾을 수 없습니다.")

    return SessionResponse(
        session_id=session.id,
        user_id=session.user_id,
        event_id=session.event_id,
        group_id=session.group_id,
        created_at=session.formatted_created_at,
        updated_at=session.formatted_updated_at,
        deleted_at=session.formatted_deleted_at if session.deleted_at else None,
    )


@router.get(
    "/sessions",
    name="세션 목록 조회",
    description="세션 목록을 조회합니다.",
    status_code=200,
    response_model=list[SessionResponse],
    response_description="Ok",
)
async def _(
        list_query: SessionListQuery = Depends(),
        db: AsyncSession = Depends(get_session)
):
    stmt = select(Session).where(Session.is_deleted == False)

    if list_query.event_id:
        stmt = stmt.where(Session.event_id == list_query.event_id)

    if list_query.user_id:
        stmt = stmt.where(Session.user_id == list_query.user_id)

    if list_query.group_id:
        stmt = stmt.where(Session.group_id == list_query.group_id)

    sessions = await db.scalars(stmt)

    return [
        SessionResponse(
            session_id=session.id,
            user_id=session.user_id,
            event_id=session.event_id,
            group_id=session.group_id,
            created_at=session.formatted_created_at,
            updated_at=session.formatted_updated_at,
            deleted_at=session.formatted_deleted_at if session.deleted_at else None,
        )
        for session in sessions
    ]


@router.delete(
    "/sessions/{session_id}",
    name="세션 삭제",
    description="세션을 삭제합니다.",
    status_code=204,
    response_description="No Content",
)
async def _(
        session_id: int,
        db: AsyncSession = Depends(get_session)
):
    session = await db.scalar(
        select(Session)
        .where(Session.id == session_id)
        .where(Session.is_deleted == False)
    )
    if session is None:
        raise HTTPException(status_code=404, detail="네트워크 세션을 찾을 수 없습니다.")

    await db.delete(session)
    await db.commit()
    return None
