'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { useUserStore } from '@/store/user'
import { Button } from '@/components/ui/button'

const Page = () => {
  const { user } = useUserStore()

  return (
    <div
      className="flex h-full flex-col items-center justify-between"
      style={{
        backgroundImage: 'url(/images/bg.png)',
      }}
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        className="flex flex-1 flex-col items-center justify-center gap-10"
      >
        <img src="/icons/check.png" className="h-120 w-120" alt="" />
        <p className="text-center text-24 font-semibold">
          <strong className="text-primary">{user?.name}</strong>
          님의
          <br />
          AI 분석이 완료되었어요!
          <br />곧 진행될 행사에서 만나요!
        </p>
      </motion.div>
      <Link href="/" className="w-full">
        <Button>홈으로 가기</Button>
      </Link>
    </div>
  )
}

export default Page
