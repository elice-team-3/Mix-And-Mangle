import random

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from starlette.responses import FileResponse
import re
import json

from src.client.elice_ai_client import get_elice_client
from src.db.model import Session, Event
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
        event_id: int,
        session=Depends(get_session),
):
    event = await session.scalar(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    event.status = "event.start"
    await session.commit()
    await sioserver.emit("event.start", room=event_id)


@router.get(
    "/event/{event_id}/start-quiz",
    name="퀴즈 시작",
)
async def _(
        event_id: int,
        session=Depends(get_session),
):
    event = await session.scalar(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    event.status = "quiz.start"
    await session.commit()

    await sioserver.emit("quiz.start", room=event_id)


@router.get(
    "/event/{event_id}/start-networking",
    name="네트워킹 시작",
    description="네트워킹을 시작하는 메시지를 보냅니다."
)
async def _(
        event_id: int,
        session=Depends(get_session),
):
    event = await session.scalar(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    event.status = "networking.start"
    await session.commit()

    await sioserver.emit("network.start", room=event_id)


@router.get(
    "/event/{event_id}/topic-generate",
    name="네트워킹 대화 주제 생성",
    description="네트워킹 대화 주제를 생성하는 메시지를 보냅니다."
)
async def _(
        event_id: int,
        session=Depends(get_session),
        elice_client=Depends(get_elice_client)
):
    event = await session.scalar(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )

    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    topic_instruction = [
        "다음 행사 정보를 바탕으로 참가자들이 서로에게 질문하고 대답할 수 있는 주제를 생성해주세요.\n",
        "주제는 관련 토픽의 최신 트렌드를 바탕으로 만들어주세요.\n"
        "주제는 최대 5개까지 만들어주세요.\n",
        f"행사명: {event.name}\n",
        f"행사 카테고리: {event.event_category}\n",
        f"출력 시 다음과 같은 json 형태로 출력해주세요\n",
        '{"topic" : ["주제1", "주제2", "주제3", "주제4", "주제5"]}"'
    ]

    message = [
        {
            "role": "user",
            "content": "".join(topic_instruction)
        }
    ]
    resp = await elice_client.helpy_chat(message)
    print(resp)

    matches = re.findall(r'(\{[^}]*\})', resp)
    topics = []
    for match in matches:
        topics.extend(json.loads(match)["topic"])

    print(topics)

    # topics에서 랜덤한 주제를 선택하여 네트워킹 대화 주제로 설정
    topic = random.choice(topics)
    await sioserver.emit("network.topic.generate", data={"topic": topic}, room=event_id)
    return {"topic": topic}
