import { useCallback } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import EventList from '@/src/components/event-list';
import { routes } from '@/src/constants';
import EventsSearch, { SearchEventHandler } from '@/src/modules/events/components/event-search';
import { getEvents } from '@/src/services/events';
import { Event } from '@/src/types';

interface EventsPageProps {
  events: Array<Event>;
}

const EventsPage: NextPage<EventsPageProps> = ({ events }) => {
  const router = useRouter();

  const handleSearch: SearchEventHandler = useCallback(
    ({ month, year }) => {
      const path = `${routes.events}/${year}/${month}`;
      router.push(path);
    },
    [router],
  );

  return (
    <>
      <EventsSearch onSearch={handleSearch} />
      <EventList items={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const { data, error } = await getEvents();

  if (error || !data) {
    return { props: { events: [] }, revalidate: 1 };
  }

  return { props: { events: data }, revalidate: 60 };
};

export default EventsPage;
