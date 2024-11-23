import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-full">
      <div className="fixed left-0 top-0 h-dvh w-dvw bg-gradient-to-t from-[rgb(190,192,255)] to-white" />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

export default Layout
