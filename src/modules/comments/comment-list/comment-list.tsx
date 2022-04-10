import { FC, memo } from "react";

import styles from "./comment-list.module.scss";

const CommentList: FC = () => {
  return (
    <ul className={styles.comments}>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
};

export default memo(CommentList);
