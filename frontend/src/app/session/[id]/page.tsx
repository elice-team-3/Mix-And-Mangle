'use client'

import React, { useLayoutEffect, useState } from 'react'

import { useSocket } from '@/context/socket'
import { useUserStore } from '@/store/user'
import { useApiEventsEventIdGetSuspense } from '@/services/이벤트/이벤트'

import Wait from './_sections/Wait'
import EventStart from './_sections/EventStart'
import Quiz from './_sections/Quiz'
import Networking from './_sections/Networking'
import NetworkGroupPrepare from './_sections/NetworkGroupPrepare'
import NetworkPrepare from './_sections/NetworkPrepare'
import End from './_sections/End'

interface PageProps {
  params: {
    id: string
  }
}

type EventState =
  | 'wait'
  | 'event.start'
  | 'quiz.start'
  | 'networking.group.prepare'
  | 'networking.prepare'
  | 'networking.start'
  | 'network.topic.generate'
  | 'networking.end'

const Page = ({ params }: PageProps) => {
  const { socket } = useSocket()
  const { user } = useUserStore()

  const eventQuery = useApiEventsEventIdGetSuspense(Number(params.id))
  const event = eventQuery.data

  const defaultState = event.status as EventState

  const [eventState, setEventState] = useState<EventState>(defaultState)

  const [topic, setTopic] = useState('')

  useLayoutEffect(() => {
    if (!user) {
      return
    }

    socket.emit('join', {
      event_id: params.id,
      user_id: user.user_id,
    })

    socket.on('event.start', () => {
      setEventState('event.start')
    })

    socket.on('quiz.start', () => {
      setEventState('quiz.start')
    })

    socket.on('network.topic.generate', (data: { topic: string }) => {
      setEventState('network.topic.generate')
      setTopic(data.topic)
    })

    socket.on('networking.group.prepare', () => {
      setEventState('networking.group.prepare')
    })

    socket.on('networking.prepare', () => {
      setEventState('networking.prepare')
    })

    socket.on('networking.end', () => {
      setEventState('networking.end')
    })
  }, [socket, user, params.id])

  return (
    <div className="h-full w-full">
      {eventState === 'wait' && <Wait event={event} />}
      {eventState === 'event.start' && <EventStart event={event} />}
      {eventState === 'quiz.start' && <Quiz event={event} />}
      {eventState === 'networking.group.prepare' && (
        <NetworkGroupPrepare event={event} />
      )}
      {eventState === 'networking.prepare' && <NetworkPrepare event={event} />}
      {eventState === 'network.topic.generate' && (
        <Networking topic={topic} event={event} />
      )}
      {eventState === 'networking.end' && <End event={event} />}
    </div>
  )
}

export default Page
