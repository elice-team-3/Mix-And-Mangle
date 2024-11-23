from socketio import AsyncServer

sioserver = AsyncServer(cors_allowed_origins="*", async_mode='asgi')


@sioserver.event
async def connect(sid, environ):
    print('connect ', sid)


@sioserver.event
async def disconnect(sid):
    print('disconnect ', sid)


@sioserver.event
async def join(sid, room):
    try:
        event_id = room['event_id']
        user_id = room['user_id']
        await sioserver.enter_room(sid, event_id)
        print(f"{user_id} joined room {event_id}")
    except Exception as e:
        print(f"{sid} joined room {room} failed: {e}")


@sioserver.event
async def leave(sid, room):
    try:
        event_id = room['event_id']
        user_id = room['user_id']
        await sioserver.leave_room(sid, event_id)
        print(f"{user_id} left room {event_id}")
    except Exception as e:
        print(f"{sid} left room {room} failed: {e}")
