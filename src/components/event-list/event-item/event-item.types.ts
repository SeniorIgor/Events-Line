import { Event } from '../../../types';

export type EventItemProps = Pick<Event, 'id' | 'date' | 'location' | 'title' | 'image'>;
