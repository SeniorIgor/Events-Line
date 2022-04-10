import { Comment } from "@/src/types";

export interface CommentFormState extends Comment {}

export type OnAddComment = (comment: Comment) => void;

export interface CommentFormProps {
  onAddComment: OnAddComment;
}
