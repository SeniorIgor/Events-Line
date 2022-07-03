import { Comment } from '@/src/types';

type NewComment = Omit<Comment, 'id'>;

export interface CommentFormState extends NewComment {
  isError?: boolean;
  isLoading?: boolean;
}

export type OnAddComment = (comment: NewComment) => Promise<boolean>;

export interface CommentFormProps extends Pick<NewComment, 'eventId'> {
  onAddComment: OnAddComment;
}
