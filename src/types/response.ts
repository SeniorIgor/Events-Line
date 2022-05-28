export interface Response<T = undefined> {
  data?: T;
  error?: string;
}

export interface ErrorResponse {
  message: string;
}
