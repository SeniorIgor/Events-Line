import { Comment } from '@/src/types';

type NewComment = Omit<Comment, 'id'>;

export interface FormCommentState extends NewComment {
  isError?: boolean;
}

export type OnAddComment = (comment: NewComment) => void;

export interface FormCommentProps extends Pick<NewComment, 'eventId'> {
  isClearForm?: boolean;
  onAddComment: OnAddComment;
}
