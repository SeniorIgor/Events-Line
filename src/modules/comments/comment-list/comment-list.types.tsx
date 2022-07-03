import { Comment } from '@/src/types';

export interface CommentListProps {
  eventId: string;
  comments: Array<Comment>;
}
