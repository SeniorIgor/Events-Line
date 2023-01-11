import axios from 'axios';

import { Comment } from '@/src/types';
import { formatError } from '@/src/utils';

import { CreateCommentAPIResponse, CreateCommentRequest, CreateCommentResponse } from './types';

export const createComment = async ({ eventId, comment }: CreateCommentRequest): Promise<CreateCommentResponse> => {
  try {
    const { data, status } = await axios.post<CreateCommentAPIResponse>(`/api/${eventId}/comments`, comment, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (status > 299 || !data) {
      return { error: data.message };
    }

    return { data: data.comment as Comment, status };
  } catch (e) {
    return { error: formatError(e) };
  }
};

export * from './types';
export default createComment;
