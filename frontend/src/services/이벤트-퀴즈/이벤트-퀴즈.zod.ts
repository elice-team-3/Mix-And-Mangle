/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Mix&Mingle API
 * 
Mix&Mingle API Server

 * OpenAPI spec version: 0.6.0
 */
import { z as zod } from 'zod'

/**
 * 이벤트에 관련된 퀴즈를 생성합니다.
 * @summary 퀴즈 생성
 */
export const apiQuizPostBody = zod.object({
  event_id: zod.number(),
  question: zod.string(),
  answer: zod.string(),
  options: zod.array(zod.string()),
})

/**
 * 이벤트에 관련된 퀴즈 리스트를 가져옵니다.
 * @summary 퀴즈 리스트
 */
export const apiQuizGetQueryParams = zod.object({
  event_id: zod.number().or(zod.null()).optional(),
})

export const apiQuizGetResponseItem = zod.object({
  id: zod.number(),
  event_id: zod.number(),
  question: zod.string(),
  answer: zod.string(),
  options: zod.array(zod.string()),
})
export const apiQuizGetResponse = zod.array(apiQuizGetResponseItem)

/**
 * 이벤트에 관련된 퀴즈를 여러개 생성합니다.
 * @summary 퀴즈를 여러개 생성
 */
export const apiQuizBulkPostBody = zod.object({
  event_id: zod.number(),
  quizzes: zod.array(
    zod.object({
      question: zod.string(),
      answer: zod.string(),
      options: zod.array(zod.string()),
    }),
  ),
})

/**
 * 퀴즈를 삭제합니다.
 * @summary 퀴즈 삭제
 */
export const apiQuizQuizIdDeleteParams = zod.object({
  quiz_id: zod.number(),
})
