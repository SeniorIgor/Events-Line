import { Sort } from 'mongodb';

import { APIResponse, Comment, Response } from '@/src/types';

type GetAllCommentsData = Array<Comment>;

export interface GetAllCommentsRequest {
  eventId: string;
  sort?: Sort | string;
}
export type GetAllCommentsResponse = Response<GetAllCommentsData>;

export type GetAllCommentsAPIResponse = APIResponse<{ comments: GetAllCommentsData }>;
