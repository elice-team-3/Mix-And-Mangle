import React from 'react'
import { motion } from 'framer-motion'

const ChatBubble = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="relative h-fit w-fit"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <img className="relative" src="/images/chat-bubble.png" alt="" />
      <div className="absolute left-0 top-28 flex h-160 w-full flex-col items-center justify-center text-balance break-keep text-center text-20 font-semibold">
        {children}
      </div>
    </motion.div>
  )
}

export default ChatBubble
