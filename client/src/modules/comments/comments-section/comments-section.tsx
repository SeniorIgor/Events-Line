import { FC, memo, useCallback, useEffect, useState } from 'react';

import { createComment } from '@/src/services/comments/create';
import getAllComments from '@/src/services/comments/getAll';
import { Comment } from '@/src/types';

import CommentForm, { OnAddComment } from '../comment-form';
import CommentList from '../comment-list';

import styles from './comments-section.module.scss';

interface CommentsSectionProps {
  eventId: string;
}

interface CommentsSectionState {
  comments: Array<Comment>;
  showComments: boolean;
  isLoading?: boolean;
  error?: string | null;
}

const initialState: CommentsSectionState = {
  comments: [],
  showComments: false,
  isLoading: false,
  error: null,
};

const generalError = 'Something went wrong, please try again later';

const CommentsSection: FC<CommentsSectionProps> = ({ eventId }) => {
  // const { mutate } = useSWRConfig();

  const [state, setState] = useState<CommentsSectionState>(initialState);

  const toggleCommentsHandler = useCallback(
    () => setState((prev) => ({ ...prev, showComments: !prev.showComments })),
    [],
  );

  const addCommentHandler: OnAddComment = useCallback(
    async (comment) => {
      const { data, error } = await createComment({ comment, eventId });

      if (data) {
        setState((prev) => ({ ...prev, comments: [...prev.comments, data] }));
        return true;
      }

      setState((prev) => ({ ...prev, error: error || generalError }));
      return false;
    },
    [eventId],
  );

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await getAllComments({ eventId, sort: { _id: -1 } });

      if (data?.length) {
        setState((prev) => ({ ...prev, comments: data }));
      }
    };

    fetchComments();
  }, [eventId]);

  return (
    <section className={styles.comments}>
      <button type="button" onClick={toggleCommentsHandler}>
        {state.showComments ? 'Hide' : 'Show'} Comments
      </button>
      {state.showComments && (
        <>
          <CommentForm eventId={eventId} onAddComment={addCommentHandler} />
          {Boolean(state.comments.length) && <CommentList eventId={eventId} comments={state.comments} />}
        </>
      )}
    </section>
  );
};

export default memo(CommentsSection);
