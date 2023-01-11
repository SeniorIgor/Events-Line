import { AppNotification, AppNotificationStatus, Response } from 'src/types';

export interface UseMutateResponseError {
  status?: number;
  title?: string;
}

export interface UseMutateStateError extends UseMutateResponseError {
  message: string | null;
}

export type UseMutateOnFailure = (error: UseMutateResponseError) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseMutateHandler = (...args: any) => Promise<Response<any>>;

export interface UseMutateError {
  detail?: string;
  errorKey?: string | Array<string>;
  type?: string;
  title: string;
}

export type UseMutateNotificationValue = (message?: string | null) => AppNotification;

export type UseMutateNotification = Record<AppNotificationStatus, UseMutateNotificationValue>;

export interface UseMutateParams<T extends UseMutateHandler> {
  notification: UseMutateNotification;
  requestHandler: T;
  onSuccess?: (data: Awaited<ReturnType<T>>['data']) => void;
  onError?: UseMutateOnFailure;
}

export interface UseMutateState {
  isLoading: boolean;
  isSuccess: boolean;
  error: UseMutateStateError | null;
}

export interface UseMutateResult<T extends UseMutateHandler> {
  state: UseMutateState;
  onMutate: (...args: Parameters<T>) => Promise<void>;
  onResetErrors: () => void;
}
