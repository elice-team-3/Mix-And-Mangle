import { create } from 'zustand'

interface TimerState {
  intervalID: NodeJS.Timeout | null
  clearInterval: () => void
  stopInterval: () => void
  resetInterval: () => void
  startInterval: () => void
  time: {
    hours: number
    minutes: number
    seconds: number
  }
}

const timerStore = create<TimerState>((set, get) => ({
  intervalID: null,
  time: {
    hours: 10,
    minutes: 0,
    seconds: 0,
  },
  stopInterval: () => {
    const intervalID = get().intervalID

    if (intervalID) {
      clearInterval(intervalID)
      set({ intervalID: null })
    }
  },
  clearInterval: () => {
    const intervalID = get().intervalID

    if (intervalID) {
      clearInterval(intervalID)
      set({ intervalID: null })
    }
  },
  resetInterval: () => {
    get().clearInterval()
    set({
      time: {
        hours: 10,
        minutes: 0,
        seconds: 0,
      },
    })
  },
  startInterval: () => {
    if (!get().intervalID) {
      const intervalID = setInterval(() => {
        set((state) => {
          if (
            state.time.hours === 0 &&
            state.time.minutes === 0 &&
            state.time.seconds === 0
          ) {
            get().clearInterval()
            return state
          }

          if (state.time.minutes === 0 && state.time.seconds === 0) {
            return {
              ...state,
              time: {
                hours: state.time.hours - 1,
                minutes: 59,
                seconds: 59,
              },
            }
          }

          if (state.time.seconds === 0) {
            return {
              ...state,
              time: {
                hours: state.time.hours,
                minutes: state.time.minutes - 1,
                seconds: 59,
              },
            }
          }

          return {
            ...state,
            time: {
              ...state.time,
              seconds: state.time.seconds - 1,
            },
          }
        })
      }, 1000)
      set({ intervalID })
    }
  },
}))

export const useTimer = () => timerStore()
