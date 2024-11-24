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
    description="이벤트를 시작하는 메시지를 보냅니다.\n"
                "socket을 통해 event_id에 해당하는 room에\n"
                "'event.start' event를 발생시킵니다."
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
    await sioserver.emit("event.start", room=event_id)
    await session.commit()


@router.get(
    "/event/{event_id}/start-quiz",
    name="퀴즈 시작",
    description="퀴즈를 시작하는 메시지를 보냅니다.\n"
                "socket을 통해 event_id에 해당하는 room에\n"
                "'quiz.start' event를 발생시킵니다."
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
    "/event/{event_id}/networking-prepare",
    name="네트워킹 준비",
    description="네트워킹을 준비하는 메시지를 보냅니다.\n"
                "socket을 통해 event_id에 해당하는 room에\n"
                "'networking.prepare' event를 발생시킵니다."
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

    await sioserver.emit("networking.prepare", room=event_id)

    event.status = "networking.prepare"
    await session.commit()


@router.get(
    "/event/{event_id}/networking-group-prepare",
    name="네트워킹 그룹 준비",
    description="네트워킹 그룹을 준비하는 메시지를 보냅니다.\n"
                "socket을 통해 event_id에 해당하는 room에\n"
                "'networking.group.prepare' event를 발생시킵니다."
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

    await sioserver.emit("networking.group.prepare", room=event_id)

    event.status = "networking.group.prepare"
    await session.commit()


@router.get(
    "/event/{event_id}/start-networking",
    name="네트워킹 시작",
    description="네트워킹을 시작하는 메시지를 보냅니다.\n"
                "socket을 통해 event_id에 해당하는 room에\n"
                "'networking.start' event를 발생시킵니다."
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

    await sioserver.emit("networking.start", room=event_id)

    event.status = "networking.start"
    await session.commit()


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
    event = await session.scalars(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    event = event.first()
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    topic_instruction = [
        "다음 행사 정보를 바탕으로 참가자들이 서로에게 질문하고 대답할 수 있는 주제를 생성해주세요.\n",
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


@router.put(
    "/event/{event_id}/timer/{action}",
    name="타이머 시작",
    description="타이머를 시작하는 메시지를 보냅니다.\n"
                "socket을 통해 event_id에 해당하는 room에\n"
                "'timer.start', 'timer.stop', timer.reset event를 발생시킵니다."
)
async def _(
        event_id: int,
        action: str,
        session=Depends(get_session),
):
    event = await session.scalar(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    if action == "start":
        await sioserver.emit("timer.start", room=event_id)
    elif action == "stop":
        await sioserver.emit("timer.stop", room=event_id)
    elif action == "reset":
        await sioserver.emit("timer.reset", room=event_id)
    else:
        raise HTTPException(status_code=400, detail="action을 잘못 입력하셨습니다.")

    return {"action": action}


@router.get(
    "/event/{event_id}/networking-end",
    name="네트워킹 종료",
    description="네트워킹을 종료하는 메시지를 보냅니다.\n"
                "socket을 통해 event_id에 해당하는 room에\n"
                "'networking.end' event를 발생시킵니다."
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

    event.status = "networking.end"
    await session.commit()

    await sioserver.emit("networking.end", room=event_id)
    return {"message": "네트워킹 종료"}
