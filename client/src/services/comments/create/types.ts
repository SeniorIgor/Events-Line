import { APIResponse, Comment, Response } from '@/src/types';

export type CreateCommentResponse = Response<Comment>;
export interface CreateCommentRequest {
  eventId: string;
  comment: Omit<Comment, 'id'>;
}

export type CreateCommentAPIResponse = APIResponse<{ comment: Comment }>;
export type CreateCommentAPIRequest = Omit<Comment, 'id'>;
