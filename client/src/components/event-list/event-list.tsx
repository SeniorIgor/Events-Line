import { FC, memo } from 'react';

import EventItem from './event-item';
import { EventListProps } from './event-list.types';

import styles from './event-list.module.scss';

const EventList: FC<EventListProps> = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map(({ id, title, location, date, image }) => (
        <EventItem key={id} id={id} title={title} location={location} date={date} image={image} />
      ))}
    </ul>
  );
};

export default memo(EventList);
