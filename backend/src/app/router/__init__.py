from fastapi import FastAPI, APIRouter

from .user_router import router as user_router
from .event_router import router as event_router
from .session_router import router as session_router
from .socket_router import router as socket_router

root_router = APIRouter()

root_router.include_router(user_router)
root_router.include_router(event_router)
root_router.include_router(session_router)
root_router.include_router(socket_router)

__ALL__ = [root_router]