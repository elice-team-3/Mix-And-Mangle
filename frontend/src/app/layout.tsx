import type { Metadata } from 'next'

import './globals.css'
import InitialSetting from '@/components/InitialSetting'
import { Toaster } from '@/components/ui/toaster'
import LogoutButton from '@/components/LogoutButton'

import Providers from './_provider'

export const metadata: Metadata = {
  title: 'Mix & Mangle',
  description: 'Mix & Mangle',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="h-dvh bg-gray-100">
        <Providers>
          <div className="mx-auto h-full w-[30%] bg-white px-12 py-24 phone:w-full">
            {children}
          </div>
          <InitialSetting />
          <Toaster />
          <div className="fixed right-20 top-40">
            <LogoutButton />
          </div>
        </Providers>
      </body>
    </html>
  )
}
