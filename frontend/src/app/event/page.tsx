'use client'

import React from 'react'

import { useApiEventsGetSuspense } from '@/services/이벤트/이벤트'

import EventBlock from './_components/EventBlock'

const Page = () => {
  const query = useApiEventsGetSuspense()

  return (
    <div className="h-full overflow-y-scroll">
      <h1 className="mb-20 text-22 font-semibold">만든 행사 목록</h1>
      <ul className="flex flex-col gap-16">
        {query.data.map((event) => {
          return (
            <li key={event.event_id}>
              <EventBlock event={event} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Page
