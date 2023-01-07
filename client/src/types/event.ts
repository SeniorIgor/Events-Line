export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export type EventsResponse = Record<string, Event>;

export interface EventFilter {
  year: number;
  month: number;
}
