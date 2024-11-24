import re
import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.schema import (
    EventResponse,
    EventCreateRequest,
    EventUpdateRequest,
    EventGroupingRequest,
    EventGroupInfo,
    SessionResponse, QuizBulkCreateSchema, QuizSchema
)
from src.client.elice_ai_client import get_elice_client
from src.db.model import Event, User, Session
from src.db.session import get_session

router = APIRouter(
    tags=["이벤트"]
)


@router.post(
    "/events",
    name="이벤트 생성",
    description="이벤트를 생성합니다.",
    status_code=201,
    response_model=EventResponse,
    response_description="Created",
)
async def _(
        event: EventCreateRequest,
        db: AsyncSession = Depends(get_session)
):
    event = Event(
        name=event.name,
        description=event.description,
        status=event.status.value,
        start_date=event.start_date,
        end_date=event.end_date,
        additional_info=event.additional_info,
        event_category=event.event_category,
        participant_count=event.participant_count
    )

    db.add(event)
    await db.commit()
    await db.refresh(event)

    return EventResponse(
        event_id=event.id,
        name=event.name,
        description=event.description,
        status=event.status,
        event_category=event.event_category,
        start_date=event.start_date.strftime("%Y-%m-%d %H:%M:%S"),
        end_date=event.end_date.strftime("%Y-%m-%d %H:%M:%S"),
        additioal_info=event.additional_info,
        participant_count=event.participant_count,
        created_at=event.formatted_created_at,
        updated_at=event.formatted_updated_at,
        delated_at=event.formatted_deleted_at
    )


@router.get(
    "/events/{event_id}",
    name="이벤트 조회",
    description="이벤트를 조회합니다.",
    status_code=200,
    response_model=EventResponse,
    response_description="Ok",
)
async def _(
        event_id: int,
        db: AsyncSession = Depends(get_session)
):
    event = await db.scalars(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    event = event.first()
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    return EventResponse(
        event_id=event.id,
        name=event.name,
        description=event.description,
        event_category=event.event_category,
        status=event.status,
        start_date=event.start_date.strftime("%Y-%m-%d %H:%M:%S"),
        end_date=event.end_date.strftime("%Y-%m-%d %H:%M:%S"),
        participant_count=event.participant_count,
        additioal_info=event.additional_info,
        created_at=event.formatted_created_at,
        updated_at=event.formatted_updated_at,
        delated_at=event.formatted_deleted_at
    )


@router.get(
    "/events",
    name="이벤트 목록 조회",
    description="이벤트 목록을 조회합니다.",
    status_code=200,
    response_model=list[EventResponse],
    response_description="Ok",
)
async def _(
        db: AsyncSession = Depends(get_session)
):
    event_list = await db.scalars(
        select(Event)
        .where(Event.is_deleted == False)
        .order_by(Event.created_at.desc())
    )

    event_list = set(event_list.all())
    print(len(event_list))
    return [
        EventResponse(
            event_id=event.id,
            name=event.name,
            description=event.description,
            event_category=event.event_category,
            status=event.status,
            start_date=event.start_date.strftime("%Y-%m-%d %H:%M:%S"),
            end_date=event.end_date.strftime("%Y-%m-%d %H:%M:%S"),
            participant_count=event.participant_count,
            additioal_info=event.additional_info,
            created_at=event.formatted_created_at,
            updated_at=event.formatted_updated_at,
            delated_at=event.formatted_deleted_at
        ) for event in event_list
    ]


@router.put(
    "/events/{event_id}",
    name="이벤트 수정",
    description="이벤트를 수정합니다.",
    status_code=200,
    response_model=EventResponse,
    response_description="Ok",
)
async def _(
        event_id: int,
        update_request: EventUpdateRequest,
        db: AsyncSession = Depends(get_session)
):
    event = await db.scalars(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    event = event.first()
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    for key, value in update_request.model_dump(exclude_unset=True).items():
        if key == "status":
            value = value.value
        setattr(event, key, value)

    await db.commit()
    await db.refresh(event)

    return EventResponse(
        event_id=event.id,
        name=event.name,
        description=event.description,
        event_category=event.event_category,
        status=event.status,
        start_date=event.start_date.strftime("%Y-%m-%d %H:%M:%S"),
        end_date=event.end_date.strftime("%Y-%m-%d %H:%M:%S"),
        additioal_info=event.additional_info,
        participant_count=event.participant_count,
        created_at=event.formatted_created_at,
        updated_at=event.formatted_updated_at,
        delated_at=event.formatted_deleted_at
    )


@router.delete(
    "/events/{event_id}",
    name="이벤트 삭제",
    status_code=204,
    description="이벤트를 삭제합니다.",
    response_description="Deleted",
)
async def _(
        event_id: int,
        db: AsyncSession = Depends(get_session)
):
    event = await db.scalars(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )
    event = event.first()
    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    event.is_deleted = True
    event.deleted_at = datetime.now()

    await db.commit()


@router.post(
    "/events/{event_id}/ai_groupping",
    status_code=200,
    name="이벤트 AI 그룹핑",
    description="이벤트에 속한 참여자를 AI로 그룹핑합니다.",
    response_model=dict[str, dict],
    response_description="Ok",
)
async def _(
        event_id: int,
        grouping_option: EventGroupingRequest,
        db: AsyncSession = Depends(get_session),
        elice_client=Depends(get_elice_client)
):
    grouping_instruction = [
        f"다음 기준에 따라 참가자들을 1번 조부터 {grouping_option.count}개 조로 최대한 균등하게 편성해줘\n"
        f"직업 : {grouping_option.job.value}\n",
        f"성격 : {grouping_option.personality.value}\n",
        f"관심사 : {grouping_option.interest.value}\n",
    ]

    users = await db.scalars(
        select(User)
        .join(User.sessions)
        .where(Session.event_id == event_id)
        .where(User.is_deleted == False)
    )
    users = set(users.all())
    if len(users) <= grouping_option.count:
        raise HTTPException(409, f"참여자가 부족합니다 {len(users)}")

    for idx, user in enumerate(users):
        grouping_instruction.extend(
            [
                f"{idx} 번 참가자\n",
                f"user_id : {user.user_id}\n",
                f"사용자 이름 : {user.name}\n",
                f"생일 : {user.birth_date}\n",
                f"직업 : {user.job}\n",
                f"성격 : {user.personality}\n",
            ]
        )

    grouping_instruction.append("균등하게 편성한 결과를 {user_id: 조번호} 와 같은 json 형태로 출력해줘")
    print("".join(grouping_instruction))
    message = [{
        "role": "user",
        "content": "".join(grouping_instruction)
    }]
    resp = await elice_client.helpy_chat(message)
    print(resp)
    matches = re.findall(r'(\{[^}]*\})', resp)
    print(matches[0])
    group_info = json.loads(matches[0])

    return {
        "group_info": group_info
    }


@router.post(
    "/events/{event_id}/set_group",
    status_code=200,
    name="이벤트 참여자 그룹핑",
    description="이벤트에 속한 참여자 그룹핑합니다.",
    response_model=list[SessionResponse],
    response_description="Ok",
    tags=["이벤트"]
)
async def _(
        event_id: int,
        request: EventGroupInfo,
        db: AsyncSession = Depends(get_session),
):
    sessions = await db.scalars(
        select(Session)
        .where(Session.event_id == event_id)
        .where(Session.is_deleted == False)
    )

    group_info: dict = request.group_info
    sessions = set(list(sessions))
    for session in sessions:
        if group_id := group_info.get(session.user_id):
            session.group_id = group_id

    await db.commit()

    return [
        SessionResponse(
            session_id=session.id,
            user_id=session.user_id,
            event_id=session.event_id,
            group_id=session.group_id,
            created_at=session.formatted_created_at,
            # updated_at=session.formatted_updated_at,
            deleted_at=session.formatted_deleted_at if session.deleted_at else None,
        )
        for session in sessions
    ]


@router.get(
    "/events/{event_id}/ai-quiz",
    status_code=200,
    name="이벤트 퀴즈 AI 생성",
    description="이벤트에 관련된 퀴즈를 AI를 통해 생성합니다.",
    response_model=QuizBulkCreateSchema,
)
async def _(
        event_id: int,
        db: AsyncSession = Depends(get_session),
        elice_client=Depends(get_elice_client)
):
    event = await db.scalar(
        select(Event)
        .where(Event.id == event_id)
        .where(Event.is_deleted == False)
    )

    if not event:
        raise HTTPException(status_code=404, detail="이벤트를 찾을 수 없습니다.")

    quiz_instructions = [
        f"다음 이벤트 정보를 바탕으로 퀴즈 10개를 생성해주고 퀴즈의 정답, 보기 3개를 같이 생성해줘\n",
        f"이벤트 이름 : {event.name}\n",
        f"이벤트 카테고리 : {event.event_category}\n",
        f"이벤트 설명 : {event.description}\n",
        f"이벤트 정보 : {event.additional_info}\n",
    ]

    quiz_instructions.append(
        f"출력 시 다음과 같은 json 형태로 출력해줘\n"
        '{"question": "퀴즈 질문", "answer": "정답", "options": ["보기1", "보기2", "보기3"]}'
    )

    print("".join(quiz_instructions))

    message = [
        {
            "role": "user",
            "content": "".join(quiz_instructions)
        }
    ]
    resp = await elice_client.helpy_chat(message)
    print(resp)

    matches = re.findall(r'(\{[^}]*\})', resp)
    quizzes = []
    for match in matches:
        quiz = json.loads(match)
        quizzes.append(QuizSchema(**quiz))

    return QuizBulkCreateSchema(
        event_id=event_id,
        quizzes=quizzes
    )
