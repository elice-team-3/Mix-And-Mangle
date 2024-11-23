import { create } from 'zustand'

import { EventGroupInfoGroupInfo, QuizSchema } from '@/services/api.schemas'

interface EventFunnelStore {
  teamCount: number
  setTeamCount: (count: number) => void
  selectedQuizs: QuizSchema[]
  addQuiz: (quiz: QuizSchema) => void
  removeQuiz: (quiz: QuizSchema) => void
  resetQuiz: () => void
  job: boolean
  setJob: (job: boolean) => void
  personality: boolean
  setPersonality: (personality: boolean) => void
  interest: boolean
  setInterest: (interest: boolean) => void
  matched: Record<string, EventGroupInfoGroupInfo>
  setMatched: (matched: Record<string, EventGroupInfoGroupInfo>) => void
}

export const eventFunnelStore = create<EventFunnelStore>((set) => ({
  teamCount: 1,
  setTeamCount: (count) => {
    set(() => ({ teamCount: count }))
  },
  selectedQuizs: [],
  addQuiz: (quiz) => {
    set((state) => ({ selectedQuizs: [...state.selectedQuizs, quiz] }))
  },
  removeQuiz: (quiz) => {
    set((state) => ({
      selectedQuizs: state.selectedQuizs.filter(
        (q) => q.question !== quiz.question,
      ),
    }))
  },
  resetQuiz: () => {
    set({ selectedQuizs: [] })
  },
  job: false,
  setJob: (state) => {
    set(() => ({ job: state }))
  },
  personality: false,
  setPersonality: (state) => {
    set(() => ({ personality: state }))
  },
  interest: false,
  setInterest: (state) => {
    set(() => ({ interest: state }))
  },
  matched: {},
  setMatched: (matched) => {
    set({ matched })
  },
}))

export const useEventFunnelStore = eventFunnelStore
