import { makeRequest } from '@/src/utils/makeRequest/makeRequest';

interface LoginRequestBody {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  userId: number;
}

const baseURL = process.env.BASE_URL;

export const login = async (data: LoginRequestBody) => {
  return makeRequest<LoginResponse>({
    baseURL,
    url: '/api/1.0/auth/login',
    method: 'POST',
    data,
  });
};
