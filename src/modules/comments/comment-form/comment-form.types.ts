import { Comment } from "@/src/types";

type NewComment = Omit<Comment, 'id'>;

export interface CommentFormState extends NewComment {}

export type OnAddComment = (comment: NewComment) => void;

export interface CommentFormProps {
  onAddComment: OnAddComment;
}
