'use client'

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
} from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL + '/api/static'

export const socket = io(SOCKET_URL, {
  reconnectionDelay: 10000,
})

interface SocketContext {
  socket: typeof socket
  handleConnect: () => void
  handleDisconnect: () => void
}

export const SocketContext = createContext<SocketContext>({
  socket,
  handleConnect: () => {},
  handleDisconnect: () => {},
})

export const SocketProvider = ({ children }: PropsWithChildren) => {
  useLayoutEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [])

  const handleConnect = useCallback(() => {
    socket.connect()
  }, [])

  const handleDisconnect = useCallback(() => {
    socket.disconnect()
  }, [])

  return (
    <SocketContext.Provider
      value={{
        socket,
        handleConnect,
        handleDisconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return context
}
