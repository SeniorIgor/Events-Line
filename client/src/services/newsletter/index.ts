import axios from 'axios';

import { Response } from '@/src/types';
import { formatError } from '@/src/utils';

interface SubscribeNewsletterResponse {
  message: string;
}

export const subscribeNewsletter = async (email: string): Promise<Response<SubscribeNewsletterResponse>> => {
  try {
    const { data, status } = await axios.post<SubscribeNewsletterResponse>(
      '/api/newsletter',
      { email },
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (status > 300) {
      return { error: data.message };
    }

    return { data, status };
  } catch (e) {
    return { error: formatError(e) };
  }
};
