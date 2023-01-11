import { FC, memo, useCallback, useEffect, useState } from 'react';

import { useMutate } from '@/src/hooks';
import { createComment } from '@/src/services/comments/create';
import getAllComments from '@/src/services/comments/getAll';

import CommentList from '../comment-list';
import FormComment, { OnAddComment } from '../FormComment';

import { notification } from './CommentSection.data';
import { CommentSectionProps, CommentSectionState } from './CommentSection.types';

import styles from './CommentSection.module.scss';

const initialState: CommentSectionState = {
  comments: [],
  showComments: false,
  isClearForm: false,
};

const CommentSection: FC<CommentSectionProps> = ({ eventId }) => {
  const [state, setState] = useState<CommentSectionState>(initialState);

  const { onMutate } = useMutate({
    notification,
    requestHandler: createComment,
    onSuccess: (data) => {
      if (data) {
        setState((prev) => ({ ...prev, comments: [...prev.comments, data], isClearForm: true }));
      }
    },
  });

  const toggleCommentsHandler = useCallback(
    () => setState((prev) => ({ ...prev, showComments: !prev.showComments })),
    [],
  );

  const addCommentHandler: OnAddComment = useCallback(
    (comment) => {
      setState((prev) => ({ ...prev, isClearForm: false }));

      onMutate({ comment, eventId });
    },
    [eventId, onMutate],
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
          <FormComment eventId={eventId} isClearForm={state.isClearForm} onAddComment={addCommentHandler} />
          {Boolean(state.comments.length) && <CommentList eventId={eventId} comments={state.comments} />}
        </>
      )}
    </section>
  );
};

export default memo(CommentSection);
