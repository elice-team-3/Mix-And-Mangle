import React from 'react'

import { EventResponse } from '@/services/api.schemas'
import { Button } from '@/components/ui/button'
import { useApiEventEventIdNetworkingPrepareGet } from '@/services/소켓/소켓'
import { blackSans } from '@/font/blackHanSans'
import { cn } from '@/lib/utils'
import { useApiSessionsEventIdGroupGetSuspense } from '@/services/네트워크-세션/네트워크-세션'
import GroupList from '@/components/ui/GroupList'
import { useUserStore } from '@/store/user'

interface NetworkGroupPrepareProps {
  event: EventResponse
}

const NetworkGroupPrepare = ({ event }: NetworkGroupPrepareProps) => {
  const nextQuery = useApiEventEventIdNetworkingPrepareGet(event.event_id, {
    query: {
      enabled: false,
    },
  })

  const { isMaster } = useUserStore()

  const handleNext = () => {
    nextQuery.refetch()
  }

  const groupQuery = useApiSessionsEventIdGroupGetSuspense(event.event_id)

  const group = groupQuery.data

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const teamCount = Math.max(...group.group_info.map((team) => team.group_id))

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className={cn('mb-55 text-28', blackSans.className)}>진행중</h1>
      <p className="mb-16 text-22 font-bold">한번 더 확인해보세요!</p>
      <GroupList
        teams={
          group.group_info as {
            group_id: number
            user_name: string
            user_id: number
          }[]
        }
        teamCount={teamCount}
      />
      {isMaster && (
        <div className="fixed bottom-0 left-0 mx-auto flex w-full gap-16 p-16 phone:w-full">
          <Button
            type="button"
            onClick={() => {
              handleNext()
            }}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  )
}

export default NetworkGroupPrepare
