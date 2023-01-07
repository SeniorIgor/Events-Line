import { FC, memo } from 'react';
import Image from 'next/image';

import ArrowRightIcon from '@/public/icons/arrow-right.svg';
import CalendarIcon from '@/public/icons/calendar.svg';
import LocationIcon from '@/public/icons/location.svg';
import { routes } from '@/src/constants';

import Button from '../../button';

import { EventItemProps } from './event-item.types';

import styles from './event-item.module.scss';

const EventItem: FC<EventItemProps> = ({ id, title, image, date, location }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(/, /, '\n');

  return (
    <li className={styles.item}>
      <div className={styles.image}>
        <Image src={`/${image}`} alt={title} layout="fill" objectFit="cover" priority />
      </div>
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <CalendarIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <LocationIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button as="link" href={`${routes.events}/${id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default memo(EventItem);
