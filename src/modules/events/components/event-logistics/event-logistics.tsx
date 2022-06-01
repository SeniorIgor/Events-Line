import { FC, memo } from 'react';
import Image from 'next/image';

import CalendarIcon from '@/public/icons/calendar.svg';
import LocationIcon from '@/public/icons/location.svg';

import LogisticsItem from '../logistics-item';

import { EventLogisticsProps } from './event-logistics.types';

import styles from './event-logistics.module.scss';

const EventLogistics: FC<EventLogisticsProps> = ({ date, location, image, imageAlt }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = location.replace(/, /, '\n');

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image src={`/${image}`} alt={imageAlt} layout="fill" objectFit="cover" priority />
      </div>
      <ul className={styles.list}>
        <LogisticsItem Icon={CalendarIcon}>
          <time>{formattedDate}</time>
        </LogisticsItem>
        <LogisticsItem Icon={LocationIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default memo(EventLogistics);
