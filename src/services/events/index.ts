import axios from "axios";

import { Event, EventFilter, EventsResponse, Response } from "@/src/types";

const formatError = (err: any): string => {
  if (!err) {
    return '';
  }

  if (typeof err === 'object' && 'message' in err) {
    return String(err.message);
  }

  return String(err);
};

export const getEvents = async (): Promise<Response<Array<Event>>> => {
  const events: Array<Event> = [];

  try {
    const { data } = await axios.get<EventsResponse>(
      'https://senior-nextjs-cource-default-rtdb.firebaseio.com/events.json'
    );

    Object.entries(data).forEach(([key, value]) =>
      events.push({ ...value, id: key })
    );

    return { data: events };
  } catch (e) {
    return { data: events, error: formatError(e) };
  }
};

export const getFeaturedEvents = async (): Promise<Response<Array<Event>>> => {
  const events: Array<Event> = [];

  try {
    const { data } = await axios.get<EventsResponse>(
      'https://senior-nextjs-cource-default-rtdb.firebaseio.com/events.json?isFeatured=true'
    );

    Object.entries(data).forEach(([key, value]) =>
      events.push({ ...value, id: key })
    );

    return { data: events };
  } catch (e) {
    return { data: events, error: formatError(e) };
  }
};

export const getEventById = async (
  eventId: string
): Promise<Response<Event>> => {
  let event: Event;

  try {
    const { data } = await axios.get<Event>(
      `https://senior-nextjs-cource-default-rtdb.firebaseio.com/events/${eventId}.json`
    );

    event = data;
  } catch (e) {
    return { error: formatError(e) };
  }

  return { data: event };
};

export const getFilteredEvents = async ({
  year,
  month,
}: EventFilter): Promise<Response<Array<Event>>> => {
  const events: Array<Event> = [];

  try {
    const { data } = await axios.get<EventsResponse>(
      `https://senior-nextjs-cource-default-rtdb.firebaseio.com/events.json`
    );

    Object.entries(data).forEach(([key, value]) => {
      const eventDate = new Date(value.date);

      if (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month - 1
      ) {
        events.push({ ...value, id: key });
      }
    });
  } catch (e) {
    return { data: events, error: formatError(e) };
  }

  return { data: events };
};
