import React from 'react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const GroupList = ({
  teams,
  teamCount,
}: {
  teams: {
    group_id: number
    user_name: string
    user_id: number
  }[]
  teamCount: number
}) => {
  const teamGroups: string[][] = Array.from({ length: 6 }, () => [])

  teams.forEach((user) => {
    teamGroups[user.group_id].push(user.user_name)
  })

  return (
    <motion.div
      className={cn(
        'grid w-full grid-cols-2 gap-12',
        teamCount >= 5 && 'grid-cols-3',
      )}
    >
      {teamGroups
        .filter((team) => team.length > 0)
        .map((team, index) => (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.3 + index * 0.1 },
            }}
            key={index}
            className="flex w-full flex-col items-center gap-4 rounded-12 bg-white py-12"
          >
            <div className="rounded-4 bg-[#FF5829] px-20 py-4 text-12 text-white">
              <p>{index + 1} 팀</p>
            </div>
            {team.map((user) => (
              <p key={user}>{user}</p>
            ))}
          </motion.div>
        ))}
    </motion.div>
  )
}

export default GroupList
