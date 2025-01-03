/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Mix&Mingle API
 * 
Mix&Mingle API Server

 * OpenAPI spec version: 0.6.0
 */
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'

import type {
  ApiQuizGetParams,
  HTTPValidationError,
  QuizBulkCreateSchema,
  QuizCreateRequest,
  QuizResponse,
} from '../api.schemas'
import { customInstance } from '../../utils/axios'
import type { ErrorType, BodyType } from '../../utils/axios'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

/**
 * 이벤트에 관련된 퀴즈를 생성합니다.
 * @summary 퀴즈 생성
 */
export const apiQuizPost = (
  quizCreateRequest: BodyType<QuizCreateRequest>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<QuizResponse>(
    {
      url: '/api/quiz',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: quizCreateRequest,
      signal,
    },
    options,
  )
}

export const getApiQuizPostMutationOptions = <
  TError = ErrorType<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiQuizPost>>,
    TError,
    { data: BodyType<QuizCreateRequest> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof apiQuizPost>>,
  TError,
  { data: BodyType<QuizCreateRequest> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof apiQuizPost>>,
    { data: BodyType<QuizCreateRequest> }
  > = (props) => {
    const { data } = props ?? {}

    return apiQuizPost(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ApiQuizPostMutationResult = NonNullable<
  Awaited<ReturnType<typeof apiQuizPost>>
>
export type ApiQuizPostMutationBody = BodyType<QuizCreateRequest>
export type ApiQuizPostMutationError = ErrorType<HTTPValidationError>

/**
 * @summary 퀴즈 생성
 */
export const useApiQuizPost = <
  TError = ErrorType<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiQuizPost>>,
    TError,
    { data: BodyType<QuizCreateRequest> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof apiQuizPost>>,
  TError,
  { data: BodyType<QuizCreateRequest> },
  TContext
> => {
  const mutationOptions = getApiQuizPostMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * 이벤트에 관련된 퀴즈 리스트를 가져옵니다.
 * @summary 퀴즈 리스트
 */
export const apiQuizGet = (
  params?: ApiQuizGetParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<QuizResponse[]>(
    { url: '/api/quiz', method: 'GET', params, signal },
    options,
  )
}

export const getApiQuizGetQueryKey = (params?: ApiQuizGetParams) => {
  return ['/api/quiz', ...(params ? [params] : [])] as const
}

export const getApiQuizGetQueryOptions = <
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params?: ApiQuizGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof apiQuizGet>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getApiQuizGetQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof apiQuizGet>>> = ({
    signal,
  }) => apiQuizGet(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof apiQuizGet>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiQuizGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof apiQuizGet>>
>
export type ApiQuizGetQueryError = ErrorType<HTTPValidationError>

export function useApiQuizGet<
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params: undefined | ApiQuizGetParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof apiQuizGet>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiQuizGet>>,
          TError,
          TData
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiQuizGet<
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params?: ApiQuizGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof apiQuizGet>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiQuizGet>>,
          TError,
          TData
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiQuizGet<
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params?: ApiQuizGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof apiQuizGet>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 퀴즈 리스트
 */

export function useApiQuizGet<
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params?: ApiQuizGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof apiQuizGet>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getApiQuizGetQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const getApiQuizGetSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params?: ApiQuizGetParams,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof apiQuizGet>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getApiQuizGetQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof apiQuizGet>>> = ({
    signal,
  }) => apiQuizGet(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof apiQuizGet>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiQuizGetSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof apiQuizGet>>
>
export type ApiQuizGetSuspenseQueryError = ErrorType<HTTPValidationError>

export function useApiQuizGetSuspense<
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params: undefined | ApiQuizGetParams,
  options: {
    query: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof apiQuizGet>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useApiQuizGetSuspense<
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params?: ApiQuizGetParams,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof apiQuizGet>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useApiQuizGetSuspense<
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params?: ApiQuizGetParams,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof apiQuizGet>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
/**
 * @summary 퀴즈 리스트
 */

export function useApiQuizGetSuspense<
  TData = Awaited<ReturnType<typeof apiQuizGet>>,
  TError = ErrorType<HTTPValidationError>,
>(
  params?: ApiQuizGetParams,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof apiQuizGet>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
} {
  const queryOptions = getApiQuizGetSuspenseQueryOptions(params, options)

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * 이벤트에 관련된 퀴즈를 여러개 생성합니다.
 * @summary 퀴즈를 여러개 생성
 */
export const apiQuizBulkPost = (
  quizBulkCreateSchema: BodyType<QuizBulkCreateSchema>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<QuizResponse[]>(
    {
      url: '/api/quiz/bulk',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: quizBulkCreateSchema,
      signal,
    },
    options,
  )
}

export const getApiQuizBulkPostMutationOptions = <
  TError = ErrorType<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiQuizBulkPost>>,
    TError,
    { data: BodyType<QuizBulkCreateSchema> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof apiQuizBulkPost>>,
  TError,
  { data: BodyType<QuizBulkCreateSchema> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof apiQuizBulkPost>>,
    { data: BodyType<QuizBulkCreateSchema> }
  > = (props) => {
    const { data } = props ?? {}

    return apiQuizBulkPost(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ApiQuizBulkPostMutationResult = NonNullable<
  Awaited<ReturnType<typeof apiQuizBulkPost>>
>
export type ApiQuizBulkPostMutationBody = BodyType<QuizBulkCreateSchema>
export type ApiQuizBulkPostMutationError = ErrorType<HTTPValidationError>

/**
 * @summary 퀴즈를 여러개 생성
 */
export const useApiQuizBulkPost = <
  TError = ErrorType<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiQuizBulkPost>>,
    TError,
    { data: BodyType<QuizBulkCreateSchema> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof apiQuizBulkPost>>,
  TError,
  { data: BodyType<QuizBulkCreateSchema> },
  TContext
> => {
  const mutationOptions = getApiQuizBulkPostMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * 퀴즈를 삭제합니다.
 * @summary 퀴즈 삭제
 */
export const apiQuizQuizIdDelete = (
  quizId: number,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<void>(
    { url: `/api/quiz/${quizId}`, method: 'DELETE' },
    options,
  )
}

export const getApiQuizQuizIdDeleteMutationOptions = <
  TError = ErrorType<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiQuizQuizIdDelete>>,
    TError,
    { quizId: number },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof apiQuizQuizIdDelete>>,
  TError,
  { quizId: number },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof apiQuizQuizIdDelete>>,
    { quizId: number }
  > = (props) => {
    const { quizId } = props ?? {}

    return apiQuizQuizIdDelete(quizId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ApiQuizQuizIdDeleteMutationResult = NonNullable<
  Awaited<ReturnType<typeof apiQuizQuizIdDelete>>
>

export type ApiQuizQuizIdDeleteMutationError = ErrorType<HTTPValidationError>

/**
 * @summary 퀴즈 삭제
 */
export const useApiQuizQuizIdDelete = <
  TError = ErrorType<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof apiQuizQuizIdDelete>>,
    TError,
    { quizId: number },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof apiQuizQuizIdDelete>>,
  TError,
  { quizId: number },
  TContext
> => {
  const mutationOptions = getApiQuizQuizIdDeleteMutationOptions(options)

  return useMutation(mutationOptions)
}
