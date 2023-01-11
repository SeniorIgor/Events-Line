import { GENERAL_ERROR } from '@/src/constants';

import { UseMutateResponseError, UseMutateStateError } from './useMutate.types';

export const formatMutateStateError = (error: UseMutateResponseError | null, status?: number): UseMutateStateError => {
  let message = GENERAL_ERROR;

  if (error?.title && status && status < 500) {
    message = error.title;
  }

  return error ? { ...error, message } : { message };
};
