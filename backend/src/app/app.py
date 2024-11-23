from contextlib import asynccontextmanager

import fastapi
from fastapi import FastAPI
from socketio import ASGIApp
from sqlalchemy.ext.asyncio import AsyncEngine
from src.app.sio import sioserver
from src.app.router import root_router as router
from src.db.model import Base
from src.db.session import engine

description = """
Mix&Mingle API Server
"""


async def init_db(engine: AsyncEngine):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def clear_db(engine: AsyncEngine):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # await clear_db(engine)
    await init_db(engine)
    yield


def create_app() -> ASGIApp:
    # FastAPI App 관련 설정
    fastapi_app = fastapi.FastAPI(
        title="Mix&Mingle API",
        lifespan=lifespan,
        version="0.3.0",
        description=description,
        # middleware=middlewares(),
        docs_url="/docs",
        redoc_url="/redoc"
    )

    # 라우터 설정
    fastapi_app.include_router(router, prefix="/api")

    app = ASGIApp(sioserver, fastapi_app)
    return app
