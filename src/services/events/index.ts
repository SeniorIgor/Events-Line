import axios from 'axios';

import { apiPath } from '@/config/api';
import { Event, EventFilter, EventsResponse, Response } from '@/src/types';
import { formatError } from '@/src/utils';

export const getEvents = async (): Promise<Response<Array<Event>>> => {
  const events: Array<Event> = [];

  try {
    const { data } = await axios.get<EventsResponse>(apiPath.events.all);

    Object.entries(data).forEach(([key, value]) => events.push({ ...value, id: key }));

    return { data: events };
  } catch (e) {
    return { data: events, error: formatError(e) };
  }
};

export const getFeaturedEvents = async (): Promise<Response<Array<Event>>> => {
  const events: Array<Event> = [];

  try {
    const { data } = await axios.get<EventsResponse>(`${apiPath.events.all}?isFeatured=true`);

    Object.entries(data).forEach(([key, value]) => events.push({ ...value, id: key }));

    return { data: events };
  } catch (e) {
    return { data: events, error: formatError(e) };
  }
};

export const getEventById = async (eventId: string): Promise<Response<Event>> => {
  let event: Event;

  try {
    const { data } = await axios.get<Omit<Event, 'id'>>(apiPath.events.byId(eventId));

    event = { ...data, id: eventId };
  } catch (e) {
    return { error: formatError(e) };
  }

  return { data: event };
};

export const getFilteredEvents = async ({ year, month }: EventFilter): Promise<Response<Array<Event>>> => {
  const events: Array<Event> = [];

  try {
    const { data } = await axios.get<EventsResponse>(apiPath.events.all);

    Object.entries(data).forEach(([key, value]) => {
      const eventDate = new Date(value.date);

      if (eventDate.getFullYear() === year && eventDate.getMonth() === month - 1) {
        events.push({ ...value, id: key });
      }
    });
  } catch (e) {
    return { data: events, error: formatError(e) };
  }

  return { data: events };
};
