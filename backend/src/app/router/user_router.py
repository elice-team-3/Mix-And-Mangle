from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.schema import UserCreateRequest, UserResponse, UserUpdateRequest
from src.db.model import User
from src.db.session import get_session

router = APIRouter(
    tags=["사용자"],
)


@router.post(
    "/users",
    name="사용자 생성",
    status_code=201,
    description="사용자를 생성합니다.",
    response_model=UserResponse,
    response_description="Created",
)
async def _(
        request_body: UserCreateRequest,
        db: AsyncSession = Depends(get_session),
):
    user_id = request_body.user_id

    user = await db.get(User, user_id)
    if user:
        raise HTTPException(
            status_code=409,
            detail="이미 존재하는 사용자입니다.",
        )

    user = User(
        user_id=user_id,
        name=request_body.name,
        birth_date=request_body.birth_date,
        job=request_body.job,
        personality=request_body.personality.value,
        interest=request_body.interest,
        hobby=request_body.hobby,
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return UserResponse(
        user_id=user.user_id,
        name=user.name,
        birth_date=user.birth_date,
        job=user.job,
        personality=user.personality,
        interest=user.interest,
        hobby=user.hobby,
        created_at=user.formatted_created_at,
        updated_at=user.formatted_updated_at,
    )


@router.get(
    "/users/{user_id}",
    name="사용자 조회",
    status_code=200,
    description="사용자를 조회합니다.",
    response_model=UserResponse,
    response_description="Ok",
)
async def _(
        user_id: str,
        db: AsyncSession = Depends(get_session),
):
    user = await db.scalars(
        select(User)
        .where(User.user_id == user_id)
        .where(User.is_deleted == False)
    )
    user = user.first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="사용자를 찾을 수 없습니다.",
        )

    return UserResponse(
        user_id=user.user_id,
        name=user.name,
        birth_date=user.birth_date,
        job=user.job,
        personality=user.personality,
        interest=user.interest,
        hobby=user.hobby,
        created_at=user.formatted_created_at,
        updated_at=user.formatted_updated_at,
    )


@router.get(
    "/users",
    name="사용자 목록 조회",
    status_code=200,
    description="사용자 목록을 조회합니다.",
    response_model=list[UserResponse],
    response_description="Ok",
)
async def _(
        db: AsyncSession = Depends(get_session),
):
    users = await db.scalars(
        select(User)
        .where(User.is_deleted == False)
        .order_by(User.created_at.desc())
    )

    return [
        UserResponse(
            user_id=user.user_id,
            name=user.name,
            birth_date=user.birth_date,
            job=user.job,
            personality=user.personality,
            interest=user.interest,
            hobby=user.hobby,
            created_at=user.formatted_created_at,
            updated_at=user.formatted_updated_at,
        )
        for user in users
    ]


@router.put(
    "/users/{user_id}",
    name="사용자 수정",
    status_code=200,
    description="사용자 정보를 수정합니다.",
    response_model=UserResponse,
    response_description="Ok",
)
async def _(
        user_id: str,
        request_body: UserUpdateRequest,
        db: AsyncSession = Depends(get_session),
):
    user = await db.scalars(
        select(User)
        .where(User.user_id == user_id)
        .where(User.is_deleted == False)
    )
    user = user.first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="사용자를 찾을 수 없습니다.",
        )

    for key, value in request_body.model_dump(exclude_unset=True).items():
        if key == "personality":
            value = value.value
        setattr(user, key, value)

    await db.commit()
    await db.refresh(user)

    return UserResponse(
        user_id=user.user_id,
        name=user.name,
        birth_date=user.birth_date,
        job=user.job,
        personality=user.personality,
        interest=user.interest,
        hobby=user.hobby,
        created_at=user.formatted_created_at,
        updated_at=user.formatted_updated_at,
    )


@router.delete(
    "/users/{user_id}",
    name="사용자 삭제",
    status_code=204,
    description="사용자를 삭제합니다.",
    response_description="No Content",
)
async def _(
        user_id: str,
        db: AsyncSession = Depends(get_session),
):
    user = await db.scalars(
        select(User)
        .where(User.user_id == user_id)
        .where(User.is_deleted == False)
    )
    user = user.first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="사용자를 찾을 수 없습니다.",
        )

    user.is_deleted = True
    user.deleted_at = datetime.now()

    await db.commit()
    return
