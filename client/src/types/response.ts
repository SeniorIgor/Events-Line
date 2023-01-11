import { AxiosError, AxiosResponseHeaders } from 'axios';

export type APIResponse<T = Record<string, unknown>> = Partial<T> & {
  message?: string;
};

export type APIError = Error | AxiosError | string;

export interface Response<T> {
  data?: T;
  status?: number;
  error?: string;
  headers?: AxiosResponseHeaders;
}

export type ResponseFunc = () => void;
