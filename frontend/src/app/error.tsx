'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

const error = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-24">
      <p>에러가 발생했습니다. 다시 시도해주세요.</p>
      <Link href="/">
        <Button>메인으로</Button>
      </Link>
    </div>
  )
}

export default error
