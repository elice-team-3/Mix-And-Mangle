import React from 'react'

import { SocketProvider } from '@/context/socket'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center bg-gradient-to-t from-[#BED1FF] to-white" />
      <div className="relative">{children}</div>
    </SocketProvider>
  )
}

export default layout
