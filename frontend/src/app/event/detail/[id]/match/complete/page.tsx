/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useEventFunnelStore } from '@/store/event-funnel'
import GroupList from '@/components/ui/GroupList'

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params: { id } }: PageProps) => {
  const { matched, teamCount } = useEventFunnelStore()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-30">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        className="flex flex-col items-center justify-center gap-10"
      >
        <img src="/icons/check.png" className="h-120 w-120" alt="" />
        <p className="text-center text-24 font-semibold">
          AI 분석이 완료되었습니다.
        </p>
      </motion.div>
      <GroupList teams={matched} teamCount={teamCount} />
      <div className="absolute bottom-0 left-0 flex w-full gap-16 phone:fixed phone:p-16">
        <Link href={`/event/detail/${id}/match/generate`}>
          <Button variant="tertiary">다시하기</Button>
        </Link>
        <Button>홈으로 가기</Button>
      </div>
    </div>
  )
}

export default Page