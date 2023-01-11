import axios from 'axios';

import { APIError, Response } from '@/src/types';

const axiosErrorHandler = <T>(error: APIError): Response<T> => {
  if (axios.isCancel(error)) {
    return {};
  }
  console.error(error);

  if (typeof error === 'object' && 'message' in error) {
    console.error('Error', error.message);
  }

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;

      return { status, data };
    }

    if (error.request) {
      return { error: error.request };
    }
  }

  return { error: String(error) };
};

export default axiosErrorHandler;
