import { FC, memo, useCallback, useState } from "react";
import { useSWRConfig } from "swr";

import { createComment } from "@/src/services/comments";

import CommentForm, { OnAddComment } from "../comment-form";
import CommentList from "../comment-list";

import styles from "./comments-section.module.scss";

interface CommentsSectionProps {
  eventId: string;
}

const CommentsSection: FC<CommentsSectionProps> = ({ eventId }) => {
  const { mutate } = useSWRConfig();

  const [status, setStatus] = useState();
  const [showComments, setShowComments] = useState(false);

  const toggleCommentsHandler = useCallback(() => {
    setShowComments((state) => !state);
  }, []);

  const addCommentHandler: OnAddComment = useCallback(async (comment) => {
    try {
      const response = await createComment(comment);
    } catch (error) {}
  }, []);

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && (
        <>
          <CommentForm onAddComment={addCommentHandler} />
          <CommentList />
        </>
      )}
    </section>
  );
};

export default memo(CommentsSection);
