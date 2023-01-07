import axios from 'axios';

export const axiosInstance = axios.create();

export * from './axios.types';
export { default as axiosErrorHandler } from './utils/axiosErrorHandler';
