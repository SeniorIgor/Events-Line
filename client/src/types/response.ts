export interface Response<T = unknown> {
  data?: T;
  error?: string;
}

export type APIResponse<T = Record<string, unknown>> = Partial<T> & {
  message?: string;
};

export type ResponseFunc = () => void;
