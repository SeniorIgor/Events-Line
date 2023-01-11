import axios from 'axios';

import { formatError } from '@/src/utils';

import { GetAllCommentsAPIResponse, GetAllCommentsRequest, GetAllCommentsResponse } from './types';

export const getAllComments = async ({ eventId, sort }: GetAllCommentsRequest): Promise<GetAllCommentsResponse> => {
  try {
    const { data, status } = await axios.get<GetAllCommentsAPIResponse>(`/api/${eventId}/comments`, {
      params: { sort },
    });

    if (status !== 200) {
      return { error: data.message };
    }

    return { data: data.comments, status };
  } catch (e) {
    return { error: formatError(e) };
  }
};

export * from './types';
export default getAllComments;
