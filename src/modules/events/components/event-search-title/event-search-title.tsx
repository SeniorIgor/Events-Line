import { FC, memo, useMemo } from 'react';

import paths from '@/config/paths';
import Button from '@/src/components/button';

import { EventSearchTitleProps } from './event-search-title.types';

import styles from './event-search-title.module.scss';

const EventSearchTitle: FC<EventSearchTitleProps> = ({ date }) => {
  const formattedDate = useMemo(() => {
    if (!date) {
      return '';
    }

    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [date]);

  return (
    <section className={styles.title}>
      <h1>Events in {formattedDate}</h1>
      <Button as="link" href={paths.events}>
        Show all events
      </Button>
    </section>
  );
};

export default memo(EventSearchTitle);
