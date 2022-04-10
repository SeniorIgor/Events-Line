import { FC, memo, useCallback, useState } from "react";

import CommentForm from "../comment-form/comment-form";
import CommentList from "../comment-list";

import styles from "./comments-section.module.scss";

interface CommentsSectionProps {
  eventId: string;
}

const CommentsSection: FC<CommentsSectionProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleCommentsHandler = useCallback(() => {
    setShowComments((state) => !state);
  }, []);

  const addCommentHandler = useCallback(() => {
    // send data to API
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
