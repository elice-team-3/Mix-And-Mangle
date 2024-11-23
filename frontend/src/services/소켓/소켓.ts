/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Mix&Mingle API
 * 
Mix&Mingle API Server

 * OpenAPI spec version: 0.3.0
 */
import {
  useQuery,
  useSuspenseQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult
} from '@tanstack/react-query'
import type {
  HTTPValidationError
} from '../api.schemas'
import { customInstance } from '../../utils/axios';
import type { ErrorType } from '../../utils/axios';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


/**
 * @summary 소켓 테스트
 */
export const apiStaticGet = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<unknown>(
      {url: `/api/static`, method: 'GET', signal
    },
      options);
    }
  

export const getApiStaticGetQueryKey = () => {
    return [`/api/static`] as const;
    }

    
export const getApiStaticGetQueryOptions = <TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiStaticGetQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiStaticGet>>> = ({ signal }) => apiStaticGet(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiStaticGetQueryResult = NonNullable<Awaited<ReturnType<typeof apiStaticGet>>>
export type ApiStaticGetQueryError = ErrorType<unknown>


export function useApiStaticGet<TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiStaticGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiStaticGet<TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiStaticGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiStaticGet<TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 소켓 테스트
 */

export function useApiStaticGet<TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiStaticGetQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiStaticGetSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiStaticGetQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiStaticGet>>> = ({ signal }) => apiStaticGet(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiStaticGetSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof apiStaticGet>>>
export type ApiStaticGetSuspenseQueryError = ErrorType<unknown>


export function useApiStaticGetSuspense<TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiStaticGetSuspense<TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiStaticGetSuspense<TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 소켓 테스트
 */

export function useApiStaticGetSuspense<TData = Awaited<ReturnType<typeof apiStaticGet>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiStaticGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiStaticGetSuspenseQueryOptions(options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 이벤트 시작
 */
export const apiEventEventIdStartGet = (
    eventId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<unknown>(
      {url: `/api/event/${eventId}/start`, method: 'GET', signal
    },
      options);
    }
  

export const getApiEventEventIdStartGetQueryKey = (eventId: string,) => {
    return [`/api/event/${eventId}/start`] as const;
    }

    
export const getApiEventEventIdStartGetQueryOptions = <TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiEventEventIdStartGetQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiEventEventIdStartGet>>> = ({ signal }) => apiEventEventIdStartGet(eventId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(eventId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiEventEventIdStartGetQueryResult = NonNullable<Awaited<ReturnType<typeof apiEventEventIdStartGet>>>
export type ApiEventEventIdStartGetQueryError = ErrorType<HTTPValidationError>


export function useApiEventEventIdStartGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiEventEventIdStartGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiEventEventIdStartGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 이벤트 시작
 */

export function useApiEventEventIdStartGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiEventEventIdStartGetQueryOptions(eventId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiEventEventIdStartGetSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiEventEventIdStartGetQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiEventEventIdStartGet>>> = ({ signal }) => apiEventEventIdStartGet(eventId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiEventEventIdStartGetSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof apiEventEventIdStartGet>>>
export type ApiEventEventIdStartGetSuspenseQueryError = ErrorType<HTTPValidationError>


export function useApiEventEventIdStartGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 이벤트 시작
 */

export function useApiEventEventIdStartGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiEventEventIdStartGetSuspenseQueryOptions(eventId,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 퀴즈 시작
 */
export const apiEventEventIdStartQuizGet = (
    eventId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<unknown>(
      {url: `/api/event/${eventId}/start-quiz`, method: 'GET', signal
    },
      options);
    }
  

export const getApiEventEventIdStartQuizGetQueryKey = (eventId: string,) => {
    return [`/api/event/${eventId}/start-quiz`] as const;
    }

    
export const getApiEventEventIdStartQuizGetQueryOptions = <TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiEventEventIdStartQuizGetQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>> = ({ signal }) => apiEventEventIdStartQuizGet(eventId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(eventId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiEventEventIdStartQuizGetQueryResult = NonNullable<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>>
export type ApiEventEventIdStartQuizGetQueryError = ErrorType<HTTPValidationError>


export function useApiEventEventIdStartQuizGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartQuizGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartQuizGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 퀴즈 시작
 */

export function useApiEventEventIdStartQuizGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiEventEventIdStartQuizGetQueryOptions(eventId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiEventEventIdStartQuizGetSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiEventEventIdStartQuizGetQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>> = ({ signal }) => apiEventEventIdStartQuizGet(eventId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiEventEventIdStartQuizGetSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>>
export type ApiEventEventIdStartQuizGetSuspenseQueryError = ErrorType<HTTPValidationError>


export function useApiEventEventIdStartQuizGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartQuizGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartQuizGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 퀴즈 시작
 */

export function useApiEventEventIdStartQuizGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartQuizGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiEventEventIdStartQuizGetSuspenseQueryOptions(eventId,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 조 나눠서 세션 시작
 */
export const apiEventEventIdStartSessionGet = (
    eventId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<unknown>(
      {url: `/api/event/${eventId}/start-session`, method: 'GET', signal
    },
      options);
    }
  

export const getApiEventEventIdStartSessionGetQueryKey = (eventId: string,) => {
    return [`/api/event/${eventId}/start-session`] as const;
    }

    
export const getApiEventEventIdStartSessionGetQueryOptions = <TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiEventEventIdStartSessionGetQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>> = ({ signal }) => apiEventEventIdStartSessionGet(eventId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(eventId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiEventEventIdStartSessionGetQueryResult = NonNullable<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>>
export type ApiEventEventIdStartSessionGetQueryError = ErrorType<HTTPValidationError>


export function useApiEventEventIdStartSessionGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartSessionGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartSessionGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 조 나눠서 세션 시작
 */

export function useApiEventEventIdStartSessionGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiEventEventIdStartSessionGetQueryOptions(eventId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiEventEventIdStartSessionGetSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiEventEventIdStartSessionGetQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>> = ({ signal }) => apiEventEventIdStartSessionGet(eventId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiEventEventIdStartSessionGetSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>>
export type ApiEventEventIdStartSessionGetSuspenseQueryError = ErrorType<HTTPValidationError>


export function useApiEventEventIdStartSessionGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartSessionGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartSessionGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 조 나눠서 세션 시작
 */

export function useApiEventEventIdStartSessionGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartSessionGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiEventEventIdStartSessionGetSuspenseQueryOptions(eventId,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 네트워킹 시작
 */
export const apiEventEventIdStartNetworkingGet = (
    eventId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<unknown>(
      {url: `/api/event/${eventId}/start-networking`, method: 'GET', signal
    },
      options);
    }
  

export const getApiEventEventIdStartNetworkingGetQueryKey = (eventId: string,) => {
    return [`/api/event/${eventId}/start-networking`] as const;
    }

    
export const getApiEventEventIdStartNetworkingGetQueryOptions = <TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiEventEventIdStartNetworkingGetQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>> = ({ signal }) => apiEventEventIdStartNetworkingGet(eventId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(eventId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiEventEventIdStartNetworkingGetQueryResult = NonNullable<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>>
export type ApiEventEventIdStartNetworkingGetQueryError = ErrorType<HTTPValidationError>


export function useApiEventEventIdStartNetworkingGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartNetworkingGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>,
          TError,
          TData
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartNetworkingGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 네트워킹 시작
 */

export function useApiEventEventIdStartNetworkingGet<TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiEventEventIdStartNetworkingGetQueryOptions(eventId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getApiEventEventIdStartNetworkingGetSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApiEventEventIdStartNetworkingGetQueryKey(eventId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>> = ({ signal }) => apiEventEventIdStartNetworkingGet(eventId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type ApiEventEventIdStartNetworkingGetSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>>
export type ApiEventEventIdStartNetworkingGetSuspenseQueryError = ErrorType<HTTPValidationError>


export function useApiEventEventIdStartNetworkingGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartNetworkingGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useApiEventEventIdStartNetworkingGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 네트워킹 시작
 */

export function useApiEventEventIdStartNetworkingGetSuspense<TData = Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError = ErrorType<HTTPValidationError>>(
 eventId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof apiEventEventIdStartNetworkingGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getApiEventEventIdStartNetworkingGetSuspenseQueryOptions(eventId,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



