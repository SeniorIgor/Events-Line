import { FC, memo } from 'react';

import { LogisticsItemProps } from './logistics-item.types';

import styles from './logistics-item.module.scss';

const LogisticsItem: FC<LogisticsItemProps> = ({ Icon, children }) => {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
};

export default memo(LogisticsItem);
