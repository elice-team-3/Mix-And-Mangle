'use client'

import React, { useCallback, useEffect } from 'react'

import { EventResponse } from '@/services/api.schemas'
import { cn } from '@/lib/utils'
import { blackSans } from '@/font/blackHanSans'
import {
  useApiEventEventIdNetworkingEndGet,
  useApiEventEventIdTimerActionPut,
} from '@/services/소켓/소켓'
import { useSocket } from '@/context/socket'
import { useTimer } from '@/store/timer'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/user'

const Networking = ({
  event,
  topic,
}: {
  event: EventResponse
  topic: string
}) => {
  const timerMutation = useApiEventEventIdTimerActionPut()

  const { socket } = useSocket()

  const { intervalID, time, startInterval, stopInterval, resetInterval } =
    useTimer()

  const handleStop = useCallback((socket = false) => {
    stopInterval()

    if (!socket) {
      timerMutation.mutate({
        action: 'stop',
        eventId: event.event_id,
      })
    }
  }, [])

  const handleStart = useCallback((socket = false) => {
    startInterval()

    if (!socket) {
      timerMutation.mutate({
        action: 'start',
        eventId: event.event_id,
      })
    }
  }, [])

  const { isMaster } = useUserStore()

  const handleReset = useCallback(
    (socket = false) => {
      if (!socket) {
        timerMutation.mutate({
          action: 'reset',
          eventId: event.event_id,
        })
      }

      resetInterval()
    },
    [event.event_id, timerMutation, handleStop],
  )

  useEffect(() => {
    socket.on('timer.start', () => {
      handleStart(true)
    })
    socket.on('timer.stop', () => {
      handleStop(true)
    })
    socket.on('timer.reset', () => {
      handleReset(true)
    })
  }, [socket])

  useEffect(() => {
    startInterval()

    return () => {
      stopInterval()
    }
  }, [])

  const nextQuery = useApiEventEventIdNetworkingEndGet(event.event_id, {
    query: {
      enabled: false,
    },
  })

  const handleNext = () => {
    nextQuery.refetch()
  }

  return (
    <div>
      <h1 className={cn('mb-40 text-center text-28', blackSans.className)}>
        주제
      </h1>
      <div className="mb-50 rounded-12 border-2 border-solid border-[#CAC1E1] bg-white py-20">
        <p className="text-center text-20 font-bold">{topic}</p>
      </div>
      <div className="w-full">
        <p className="digital text-center text-90">
          {time.hours.toString().padStart(2, '0')}:
          {time.minutes.toString().padStart(2, '0')}:
          {time.seconds.toString().padStart(2, '0')}
        </p>
      </div>
      <div className={cn('flex justify-center gap-12', !isMaster && 'hidden')}>
        <button
          className="flex rounded-12 bg-[#FF5829] px-20 py-10 text-white"
          onClick={() => {
            if (!intervalID) {
              handleStart()
            } else {
              handleStop()
            }
          }}
        >
          {intervalID ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C15.2044 2 14.4413 2.31607 13.8787 2.87868C13.3161 3.44129 13 4.20435 13 5V19C13 19.7956 13.3161 20.5587 13.8787 21.1213C14.4413 21.6839 15.2044 22 16 22C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V5C19 4.20435 18.6839 3.44129 18.1213 2.87868C17.5587 2.31607 16.7956 2 16 2ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20C15.7348 20 15.4804 19.8946 15.2929 19.7071C15.1054 19.5196 15 19.2652 15 19V5C15 4.73478 15.1054 4.48043 15.2929 4.29289C15.4804 4.10536 15.7348 4 16 4C16.2652 4 16.5196 4.10536 16.7071 4.29289C16.8946 4.48043 17 4.73478 17 5V19ZM8 2C7.20435 2 6.44129 2.31607 5.87868 2.87868C5.31607 3.44129 5 4.20435 5 5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22C8.79565 22 9.55871 21.6839 10.1213 21.1213C10.6839 20.5587 11 19.7956 11 19V5C11 4.20435 10.6839 3.44129 10.1213 2.87868C9.55871 2.31607 8.79565 2 8 2ZM9 19C9 19.2652 8.89464 19.5196 8.70711 19.7071C8.51957 19.8946 8.26522 20 8 20C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V5C7 4.73478 7.10536 4.48043 7.29289 4.29289C7.48043 4.10536 7.73478 4 8 4C8.26522 4 8.51957 4.10536 8.70711 4.29289C8.89464 4.48043 9 4.73478 9 5V19Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.54 8.99978L8.88 3.45978C8.35729 3.15794 7.764 2.99982 7.16039 3.00148C6.55679 3.00314 5.96438 3.16451 5.44333 3.46922C4.92228 3.77393 4.49115 4.21111 4.19375 4.73636C3.89634 5.26161 3.74324 5.85621 3.75 6.45978V17.5798C3.75 18.4868 4.11032 19.3567 4.7517 19.9981C5.39307 20.6395 6.26296 20.9998 7.17 20.9998C7.77044 20.9988 8.36009 20.8401 8.88 20.5398L18.54 14.9998C19.0591 14.6994 19.49 14.2678 19.7896 13.7482C20.0892 13.2287 20.2469 12.6395 20.2469 12.0398C20.2469 11.4401 20.0892 10.8509 19.7896 10.3313C19.49 9.81181 19.0591 9.38019 18.54 9.07978V8.99978ZM17.54 13.1898L7.88 18.8098C7.66349 18.9325 7.41887 18.997 7.17 18.997C6.92113 18.997 6.67652 18.9325 6.46 18.8098C6.2441 18.6851 6.06482 18.5058 5.94018 18.2899C5.81555 18.074 5.74996 17.8291 5.75 17.5798V6.41978C5.74996 6.17048 5.81555 5.92556 5.94018 5.70964C6.06482 5.49373 6.2441 5.31443 6.46 5.18978C6.67741 5.06894 6.9213 5.00367 7.17 4.99978C7.41853 5.00488 7.66214 5.07007 7.88 5.18978L17.54 10.7698C17.756 10.8944 17.9353 11.0737 18.0601 11.2896C18.1848 11.5055 18.2504 11.7504 18.2504 11.9998C18.2504 12.2491 18.1848 12.4941 18.0601 12.71C17.9353 12.9259 17.756 13.1052 17.54 13.2298V13.1898Z"
                fill="white"
              />
            </svg>
          )}
          {intervalID ? '일시정지' : '시작하기'}
        </button>

        <button
          className="flex rounded-12 bg-white px-20 py-10 text-black"
          onClick={() => {
            handleReset()
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.91 15.51H15.38C15.1148 15.51 14.8604 15.6154 14.6729 15.8029C14.4854 15.9904 14.38 16.2448 14.38 16.51C14.38 16.7752 14.4854 17.0296 14.6729 17.2171C14.8604 17.4046 15.1148 17.51 15.38 17.51H17.78C16.6769 18.6627 15.2544 19.4593 13.6952 19.7974C12.1359 20.1355 10.5112 19.9996 9.02978 19.4072C7.54834 18.8149 6.27787 17.7931 5.38159 16.4732C4.48531 15.1532 4.00418 13.5955 4 12C4 11.7348 3.89464 11.4804 3.70711 11.2929C3.51957 11.1054 3.26522 11 3 11C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2.00529 13.9528 2.58222 15.8613 3.6596 17.49C4.73699 19.1187 6.26767 20.3964 8.06274 21.1652C9.85782 21.9341 11.8387 22.1605 13.761 21.8166C15.6833 21.4727 17.4628 20.5735 18.88 19.23V21C18.88 21.2652 18.9854 21.5196 19.1729 21.7071C19.3604 21.8946 19.6148 22 19.88 22C20.1452 22 20.3996 21.8946 20.5871 21.7071C20.7746 21.5196 20.88 21.2652 20.88 21V16.5C20.8775 16.2416 20.7752 15.9943 20.5943 15.8097C20.4135 15.6251 20.1683 15.5177 19.91 15.51ZM12 2C9.43639 2.00731 6.97349 2.99891 5.12 4.77V3C5.12 2.73478 5.01464 2.48043 4.82711 2.29289C4.63957 2.10536 4.38522 2 4.12 2C3.85478 2 3.60043 2.10536 3.41289 2.29289C3.22536 2.48043 3.12 2.73478 3.12 3V7.5C3.12 7.76522 3.22536 8.01957 3.41289 8.20711C3.60043 8.39464 3.85478 8.5 4.12 8.5H8.62C8.88522 8.5 9.13957 8.39464 9.32711 8.20711C9.51464 8.01957 9.62 7.76522 9.62 7.5C9.62 7.23478 9.51464 6.98043 9.32711 6.79289C9.13957 6.60536 8.88522 6.5 8.62 6.5H6.22C7.32247 5.34787 8.74409 4.5515 10.3024 4.21311C11.8607 3.87472 13.4846 4.00975 14.9656 4.60086C16.4466 5.19198 17.7172 6.21221 18.6142 7.5306C19.5113 8.849 19.9938 10.4054 20 12C20 12.2652 20.1054 12.5196 20.2929 12.7071C20.4804 12.8946 20.7348 13 21 13C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
              fill="black"
            />
          </svg>
          초기화
        </button>
      </div>
      {isMaster && (
        <div className="absolute bottom-0 left-0 flex w-full gap-16 phone:fixed phone:p-16">
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

export default Networking
