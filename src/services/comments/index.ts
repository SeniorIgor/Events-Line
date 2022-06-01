import axios from 'axios';

import { apiPath } from '@/config/api';
import { Comment, Response } from '@/src/types';
import { formatError } from '@/src/utils/format-error';

export const createComment = async (comment: Omit<Comment, 'id'>): Promise<Response | undefined> => {
  try {
    const { status } = await axios.post(apiPath.events.all, comment);

    if (status !== 200) {
      return { error: 'Comment not added!' };
    }

    return {};
  } catch (e) {
    return { error: formatError(e) };
  }
};
