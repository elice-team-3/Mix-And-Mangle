/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Mix&Mingle API
 * 
Mix&Mingle API Server

 * OpenAPI spec version: 0.6.0
 */
import {
  useMutation,
  useQuery,
  useSuspenseQuery
} from '@tanstack/react-query'
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
  UseSuspenseQueryResult
} from '@tanstack/react-query'
import type {
  ApiSessionsGetParams,
  HTTPValidationError,
  SessionCreateRequest,
  SessionResponse
} from '../api.schemas'
import { customInstance } from '../../utils/axios';
import type { ErrorType, BodyType } from '../../utils/axios';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


/**
 * 사용자가 이벤트에 참여합니다.
 * @summary 사용자 이벤트 참여
 */
export const apiSessionsPost = (
    sessionCreateRequest: BodyType<SessionCreateRequest>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<SessionResponse>(
      {url: `/api/sessions`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: sessionCreateRequest, signal
    },
      options);
    }
  


export const getApiSessionsPostMutationOptions = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiSessionsPost>>, TError,{data: BodyType<SessionCreateRequest>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof apiSessionsPost>>, TError,{data: BodyType<SessionCreateRequest>}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof apiSessionsPost>>, {data: BodyType<SessionCreateRequest>}> = (props) => {
          const {data} = props ?? {};

          return  apiSessionsPost(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApiSessionsPostMutationResult = NonNullable<Awaited<ReturnType<typeof apiSessionsPost>>>
    export type ApiSessionsPostMutationBody = BodyType<SessionCreateRequest>
    export type ApiSessionsPostMutationError = ErrorType<HTTPValidationError>

    /**
 * @summary 사용자 이벤트 참여
 */
export const useApiSessionsPost = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiSessionsPost>>, TError,{data: BodyType<SessionCreateRequest>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof apiSessionsPost>>,
        TError,
        {data: BodyType<SessionCreateRequest>},
        TContext
      > => {

      const mutationOptions = getApiSessionsPostMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * 세션 목록을 조회합니다.
 * @summary 세션 목록 조회
 */
export const apiSessionsGet = (
    params?: ApiSessionsGetParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<SessionResponse[]>(
      {url: `/api/sessions`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getApiSessionsGetQueryKey = (params?: ApiSessionsGetParams,) => {
    return [`/api/sessions`, ...(params ? [params]: [])] as const;
    }

    
export const getApiSessionsGetQueryOptions = <TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(params?: ApiSessionsGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiSessionsGetQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiSessionsGet>>> = ({ signal }) => apiSessionsGet(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiSessionsGetQueryResult = NonNullable<Awaited<ReturnType<typeof apiSessionsGet>>>
export type ApiSessionsGetQueryError = ErrorType<HTTPValidationError>


export function useApiSessionsGet<TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(
 params: undefined |  ApiSessionsGetParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiSessionsGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiSessionsGet<TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(
 params?: ApiSessionsGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiSessionsGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiSessionsGet<TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(
 params?: ApiSessionsGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 세션 목록 조회
 */

export function useApiSessionsGet<TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(
 params?: ApiSessionsGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiSessionsGetQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiSessionsGetSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(params?: ApiSessionsGetParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiSessionsGetQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiSessionsGet>>> = ({ signal }) => apiSessionsGet(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiSessionsGetSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof apiSessionsGet>>>
export type ApiSessionsGetSuspenseQueryError = ErrorType<HTTPValidationError>


export function useApiSessionsGetSuspense<TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(
 params: undefined |  ApiSessionsGetParams, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiSessionsGetSuspense<TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(
 params?: ApiSessionsGetParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiSessionsGetSuspense<TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(
 params?: ApiSessionsGetParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 세션 목록 조회
 */

export function useApiSessionsGetSuspense<TData = Awaited<ReturnType<typeof apiSessionsGet>>, TError = ErrorType<HTTPValidationError>>(
 params?: ApiSessionsGetParams, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiSessionsGetSuspenseQueryOptions(params,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * 네트워크 세션을 조회합니다.
 * @summary 네트워크 세션 조회
 */
export const apiSessionsSessionIdGet = (
    sessionId: number,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<SessionResponse>(
      {url: `/api/sessions/${sessionId}`, method: 'GET', signal
    },
      options);
    }
  

export const getApiSessionsSessionIdGetQueryKey = (sessionId: number,) => {
    return [`/api/sessions/${sessionId}`] as const;
    }

    
export const getApiSessionsSessionIdGetQueryOptions = <TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(sessionId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiSessionsSessionIdGetQueryKey(sessionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>> = ({ signal }) => apiSessionsSessionIdGet(sessionId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(sessionId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiSessionsSessionIdGetQueryResult = NonNullable<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>>
export type ApiSessionsSessionIdGetQueryError = ErrorType<HTTPValidationError>


export function useApiSessionsSessionIdGet<TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(
 sessionId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiSessionsSessionIdGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiSessionsSessionIdGet<TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(
 sessionId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiSessionsSessionIdGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiSessionsSessionIdGet<TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(
 sessionId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 네트워크 세션 조회
 */

export function useApiSessionsSessionIdGet<TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(
 sessionId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiSessionsSessionIdGetQueryOptions(sessionId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiSessionsSessionIdGetSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(sessionId: number, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiSessionsSessionIdGetQueryKey(sessionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>> = ({ signal }) => apiSessionsSessionIdGet(sessionId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiSessionsSessionIdGetSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>>
export type ApiSessionsSessionIdGetSuspenseQueryError = ErrorType<HTTPValidationError>


export function useApiSessionsSessionIdGetSuspense<TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(
 sessionId: number, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiSessionsSessionIdGetSuspense<TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(
 sessionId: number, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiSessionsSessionIdGetSuspense<TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(
 sessionId: number, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 네트워크 세션 조회
 */

export function useApiSessionsSessionIdGetSuspense<TData = Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError = ErrorType<HTTPValidationError>>(
 sessionId: number, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiSessionsSessionIdGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiSessionsSessionIdGetSuspenseQueryOptions(sessionId,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * 세션을 삭제합니다.
 * @summary 세션 삭제
 */
export const apiSessionsSessionIdDelete = (
    sessionId: number,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/api/sessions/${sessionId}`, method: 'DELETE'
    },
      options);
    }
  


export const getApiSessionsSessionIdDeleteMutationOptions = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiSessionsSessionIdDelete>>, TError,{sessionId: number}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof apiSessionsSessionIdDelete>>, TError,{sessionId: number}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof apiSessionsSessionIdDelete>>, {sessionId: number}> = (props) => {
          const {sessionId} = props ?? {};

          return  apiSessionsSessionIdDelete(sessionId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApiSessionsSessionIdDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof apiSessionsSessionIdDelete>>>
    
    export type ApiSessionsSessionIdDeleteMutationError = ErrorType<HTTPValidationError>

    /**
 * @summary 세션 삭제
 */
export const useApiSessionsSessionIdDelete = <TError = ErrorType<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof apiSessionsSessionIdDelete>>, TError,{sessionId: number}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof apiSessionsSessionIdDelete>>,
        TError,
        {sessionId: number},
        TContext
      > => {

      const mutationOptions = getApiSessionsSessionIdDeleteMutationOptions(options);

      return useMutation(mutationOptions);
    }
    