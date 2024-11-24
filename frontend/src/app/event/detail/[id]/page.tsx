/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import React from 'react'

import { useApiEventsEventIdGetSuspense } from '@/services/이벤트/이벤트'
import { Eventstatus } from '@/services/api.schemas'

import EventForm from '../../_components/EventForm'

interface Props {
  params: {
    id: string
  }
}

const Page = (props: Props) => {
  const { params } = props

  const id = parseInt(params.id)

  const query = useApiEventsEventIdGetSuspense(id)

  const event = query.data

  return (
    <div className="relative">
      <EventForm
        mode="edit"
        id={id}
        defaultValues={{
          name: event.name,
          description: event.description,
          status: event.status as Eventstatus,
          start_date: event.start_date,
          end_date: event.end_date,
          participant_count: event.participant_count
            ? event.participant_count
            : 0,
          event_category: event.event_category || '',
          additional_info: event.additional_info,
        }}
      />
    </div>
  )
}

export default Page
