import { FC, memo } from 'react';

import { CommentListProps } from './comment-list.types';

import styles from './comment-list.module.scss';

const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <ul className={styles.comments}>
      {comments.map(({ id, name, message }) => (
        <li key={id}>
          <p>{message}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default memo(CommentList);
