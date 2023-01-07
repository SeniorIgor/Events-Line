import { Event } from '@/src/types';

export type EventLogisticsProps = Pick<Event, 'date' | 'location' | 'image'> & {
  imageAlt: string;
};
