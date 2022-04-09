import { Event } from "../../../types";

export type EventLogisticsProps = Pick<Event, 'date' | 'location' | 'image'> & {
  imageAlt: string;
};
