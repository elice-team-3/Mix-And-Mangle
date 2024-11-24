'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/user'

export default function Home() {
  const { setIsMaster, user } = useUserStore()

  const router = useRouter()

  const handleClickParticipant = () => {
    setIsMaster(false)

    if (!user) {
      router.push('/user/register')
    } else {
      router.push('/event')
    }
  }

  const handleClickMaster = () => {
    setIsMaster(true)
    router.push('/event')
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center bg-gradient-to-t from-[#BED1FF] to-white" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
          },
        }}
        className="relative"
      >
        <p className="mb-40 text-22 font-semibold">
          안녕하세요!
          <br /> 사용자 유형을 선택해주세요.
        </p>
        <Button
          variant="secondary"
          className="mb-12"
          onClick={handleClickParticipant}
        >
          참가자
        </Button>
        <Button variant="secondary" onClick={handleClickMaster}>
          주최자
        </Button>
      </motion.div>
    </div>
  )
}
