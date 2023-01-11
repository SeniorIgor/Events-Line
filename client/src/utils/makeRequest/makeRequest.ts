import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { APIError, Response } from '@/src/types';

import { axiosErrorHandler, axiosInstance } from '../axios/axios';

const baseAPI = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

export const makeRequest = async <T = unknown, D = unknown>(params: AxiosRequestConfig<D>): Promise<Response<T>> => {
  const localParams = params;
  const isBaseApi = params.baseURL === baseAPI;

  if (!localParams.paramsSerializer) {
    localParams.paramsSerializer = (queryParams) => qs.stringify(queryParams, { encode: false, indices: false });
  }

  if (isBaseApi) {
    localParams.headers = {
      ...localParams.headers,
      'API-KEY': apiKey as string,
    };
  }

  try {
    const { status, data, headers } = await axiosInstance.request<T>(localParams);

    return { status, data, headers };
  } catch (err) {
    return axiosErrorHandler<T>(err as APIError);
  }
};
