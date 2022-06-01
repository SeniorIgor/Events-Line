import { FC, memo } from 'react';

import { EventSummaryProps } from './event-summary.types';

import styles from './event-summary.module.scss';

const EventSummary: FC<EventSummaryProps> = ({ title }) => {
  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default memo(EventSummary);
