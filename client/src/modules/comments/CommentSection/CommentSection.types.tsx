import { Comment } from '@/src/types';

export interface CommentSectionProps {
  eventId: string;
}

export interface CommentSectionState {
  comments: Array<Comment>;
  showComments: boolean;
  isClearForm: boolean;
}
