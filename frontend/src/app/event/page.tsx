'use client'

import { motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'

import { useApiEventsGetSuspense } from '@/services/이벤트/이벤트'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/user'

import EventBlock from './_components/EventBlock'

const Page = () => {
  const query = useApiEventsGetSuspense()

  const { isMaster } = useUserStore()

  return (
    <div className="h-full overflow-y-scroll">
      <h1 className="mb-20 text-22 font-semibold">만든 행사 목록</h1>
      <ul className="mb-24 flex flex-col gap-16">
        {query.data.map((event, idx) => {
          return (
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={event.event_id}
            >
              <EventBlock event={event} />
            </motion.li>
          )
        })}
      </ul>
      {isMaster && (
        <Link href="/event/register">
          <Button>행사 만들기</Button>
        </Link>
      )}
    </div>
  )
}

export default Page
