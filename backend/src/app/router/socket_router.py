from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from starlette.responses import FileResponse

from src.app.schema import SessionResponse, SessionCreateRequest
from src.db.model import Session
from src.db.session import get_session
from src.app.sio import sioserver

router = APIRouter(
    tags=["소켓"],
)


@router.get(
    "/static",
    name="소켓 테스트",
)
async def _():
    return FileResponse("src/static/index.html")


@router.get(
    "/event/{event_id}/start",
    name="이벤트 시작",
)
async def _(
        event_id: str,
):
    await sioserver.emit("start", room=event_id)


@router.get(
    "/event/{event_id}/start-quiz",
    name="퀴즈 시작",
)
async def _(
        event_id: str,
):
    await sioserver.emit("start", room=event_id)


@router.get(
    "/event/{event_id}/start-session",
    name="조 나눠서 세션 시작",
)
async def _(
        event_id: str,
):
    await sioserver.emit("start", room=event_id)


@router.get(
    "/event/{event_id}/start-networking",
    name="네트워킹 시작",
)
async def _(
        event_id: str,
):
    await sioserver.emit("start", room=event_id)
