import { AxiosError, AxiosRequestConfig } from 'axios';

export type APIError = Error | AxiosError | string;

export interface Response<T> {
  data?: T;
  status?: number;
  error?: string;
}

export type RequestConfig = Pick<AxiosRequestConfig, 'signal'>;
