import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="h-dvh bg-gray-100">
        <div className="mx-auto h-full w-[30%] bg-white px-12 py-24 phone:w-full">
          {children}
        </div>
      </body>
    </html>
  )
}
