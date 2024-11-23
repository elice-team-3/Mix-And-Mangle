/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Mix&Mingle API
 * 
Mix&Mingle API Server

 * OpenAPI spec version: 0.6.0
 */
export type ApiSessionsGetParams = {
user_id?: string | null;
event_id?: number | null;
group_id?: number | null;
};

export type ApiQuizGetParams = {
event_id?: number | null;
};

export type AIApiEventsEventIdAiGrouppingPost200 = {[key: string]: { [key: string]: unknown }};

export type ValidationErrorLocItem = string | number;

export interface ValidationError {
  loc: ValidationErrorLocItem[];
  msg: string;
  type: string;
}

/**
 * 성격
 */
export type UserUpdateRequestPersonality = Personality | null;

/**
 * 사용자 이름
 */
export type UserUpdateRequestName = string | null;

/**
 * 직업
 */
export type UserUpdateRequestJob = string | null;

/**
 * 관심사
 */
export type UserUpdateRequestInterest = string[] | null;

/**
 * 취미
 */
export type UserUpdateRequestHobby = string[] | null;

/**
 * 생년월일
 */
export type UserUpdateRequestBirthDate = string | null;

export interface UserUpdateRequest {
  /** 생년월일 */
  birth_date: UserUpdateRequestBirthDate;
  /** 취미 */
  hobby?: UserUpdateRequestHobby;
  /** 관심사 */
  interest?: UserUpdateRequestInterest;
  /** 직업 */
  job?: UserUpdateRequestJob;
  /** 사용자 이름 */
  name: UserUpdateRequestName;
  /** 성격 */
  personality?: UserUpdateRequestPersonality;
}

/**
 * 성격
 */
export type UserResponsePersonality = Personality | null;

export interface UserResponse {
  /** 생년월일 */
  birth_date: string;
  /** 생성일 */
  created_at: string;
  /** 취미 */
  hobby?: string[];
  /** 관심사 */
  interest?: string[];
  /** 직업 */
  job?: string;
  name: string;
  /** 성격 */
  personality?: UserResponsePersonality;
  /** 수정일 */
  updated_at: string;
  /** 사용자 아이디 */
  user_id: string;
}

/**
 * 성격
 */
export type UserCreateRequestPersonality = Personality | null;

export interface UserCreateRequest {
  /** 생년월일 */
  birth_date: string;
  /** 취미 */
  hobby?: string[];
  /** 관심사 */
  interest?: string[];
  /** 직업 */
  job?: string;
  /** 사용자 이름 */
  name: string;
  /** 성격 */
  personality?: UserCreateRequestPersonality;
  /** 사용자 아이디 */
  user_id: string;
}

/**
 * 그룹 아이디
 */
export type SessionResponseGroupId = number | null;

/**
 * 삭제일
 */
export type SessionResponseDeletedAt = string | null;

export interface SessionResponse {
  /** 생성일 */
  created_at: string;
  /** 삭제일 */
  deleted_at?: SessionResponseDeletedAt;
  /** 이벤트 아이디 */
  event_id: number;
  /** 그룹 아이디 */
  group_id?: SessionResponseGroupId;
  /** 세션 아이디 */
  session_id: number;
  /** 수정일 */
  updated_at: string;
  /** 사용자 아이디 */
  user_id: string;
}

export interface SessionCreateRequest {
  /** 이벤트 아이디 */
  event_id: number;
  /** 사용자 아이디 */
  user_id: string;
}

export interface QuizSchema {
  /** 정답 */
  answer: string;
  /** 선택지 */
  options: string[];
  /** 문제 */
  question: string;
}

export interface QuizResponse {
  /** 정답 */
  answer: string;
  /** 이벤트 아이디 */
  event_id: number;
  /** 퀴즈 아이디 */
  id: number;
  /** 선택지 */
  options: string[];
  /** 문제 */
  question: string;
}

export interface QuizCreateRequest {
  /** 정답 */
  answer: string;
  /** 이벤트 아이디 */
  event_id: number;
  /** 선택지 */
  options: string[];
  /** 문제 */
  question: string;
}

export interface QuizBulkCreateSchema {
  /** 이벤트 아이디 */
  event_id: number;
  /** 퀴즈 목록 */
  quizzes: QuizSchema[];
}

export type Personality = typeof Personality[keyof typeof Personality];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Personality = {
  내향적: '내향적',
  양면성: '양면성',
  외향적: '외향적',
} as const;

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export type Groupingoption = typeof Groupingoption[keyof typeof Groupingoption];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Groupingoption = {
  랜덤: '랜덤',
  유사성: '유사성',
} as const;

/**
 * 이벤트 상태
 */
export type EventUpdateRequestStatus = Eventstatus | null;

/**
 * 이벤트 시작일
 */
export type EventUpdateRequestStartDate = string | null;

/**
 * 이벤트 이름
 */
export type EventUpdateRequestName = string | null;

/**
 * 이벤트 카테고리
 */
export type EventUpdateRequestEventCategory = string | null;

/**
 * 이벤트 종료일
 */
export type EventUpdateRequestEndDate = string | null;

/**
 * 이벤트 설명
 */
export type EventUpdateRequestDescription = string | null;

/**
 * 추가 정보
 */
export type EventUpdateRequestAdditionalInfo = string | null;

export interface EventUpdateRequest {
  /** 추가 정보 */
  additional_info?: EventUpdateRequestAdditionalInfo;
  /** 이벤트 설명 */
  description: EventUpdateRequestDescription;
  /** 이벤트 종료일 */
  end_date: EventUpdateRequestEndDate;
  /** 이벤트 카테고리 */
  event_category: EventUpdateRequestEventCategory;
  /** 이벤트 이름 */
  name: EventUpdateRequestName;
  /** 참가자 수 */
  participant_count?: number;
  /** 이벤트 시작일 */
  start_date: EventUpdateRequestStartDate;
  /** 이벤트 상태 */
  status?: EventUpdateRequestStatus;
}

/**
 * 이벤트 카테고리
 */
export type EventResponseEventCategory = string | null;

/**
 * 삭제일
 */
export type EventResponseDeletedAt = string | null;

export interface EventResponse {
  /** 추가 정보 */
  additional_info?: string;
  /** 생성일 */
  created_at: string;
  /** 삭제일 */
  deleted_at?: EventResponseDeletedAt;
  /** 이벤트 설명 */
  description: string;
  /** 이벤트 종료일 */
  end_date: string;
  /** 이벤트 카테고리 */
  event_category: EventResponseEventCategory;
  /** 이벤트 아이디 */
  event_id: number;
  /** 이벤트 이름 */
  name: string;
  /** 참가자 수 */
  participant_count?: number;
  /** 이벤트 시작일 */
  start_date: string;
  /** 이벤트 상태 */
  status: string;
  /** 수정일 */
  updated_at: string;
}

/**
 * 성격
 */
export type EventGroupingRequestPersonality = Groupingoption | null;

/**
 * 직업
 */
export type EventGroupingRequestJob = Groupingoption | null;

/**
 * 관심사
 */
export type EventGroupingRequestInterest = Groupingoption | null;

export interface EventGroupingRequest {
  /** 나눌 조의 수 */
  count?: number;
  /** 관심사 */
  interest?: EventGroupingRequestInterest;
  /** 직업 */
  job?: EventGroupingRequestJob;
  /** 성격 */
  personality?: EventGroupingRequestPersonality;
}

/**
 * 조 편성 목록 {'user_id' : int}
 */
export type EventGroupInfoGroupInfo = {[key: string]: number};

export interface EventGroupInfo {
  /** 조 편성 목록 {'user_id' : int} */
  group_info: EventGroupInfoGroupInfo;
}

export type Eventstatus = typeof Eventstatus[keyof typeof Eventstatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Eventstatus = {
  대기중: '대기중',
  진행중: '진행중',
  종료됨: '종료됨',
  취소됨: '취소됨',
} as const;

export interface EventCreateRequest {
  /** 추가 정보 */
  additional_info?: string;
  /** 이벤트 설명 */
  description: string;
  /** 이벤트 종료일 */
  end_date: string;
  /** 이벤트 카테고리 */
  event_category: string;
  /** 이벤트 이름 */
  name: string;
  /** 참가자 수 */
  participant_count?: number;
  /** 이벤트 시작일 */
  start_date: string;
  /** 이벤트 상태 */
  status?: Eventstatus;
}
