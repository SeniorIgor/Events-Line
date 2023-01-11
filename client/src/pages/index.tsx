import { useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';

import EventList from '@/src/components/event-list';
import FormNewsletter from '@/src/modules/comments/FormNewsletter/FormNewsletter';
import { getFeaturedEvents } from '@/src/services/events';
import { Event } from '@/src/types/event';

import useTypedDispatch from '../hooks/useTypedDispatch';
import { loadProfileRequest } from '../store/features/user';

interface HomePageProps {
  events: Array<Event>;
}

const HomePage: NextPage<HomePageProps> = ({ events }) => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(loadProfileRequest());
  }, [dispatch]);

  return (
    <>
      <FormNewsletter />
      <EventList items={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await getFeaturedEvents();

  if (error || !data) {
    return { props: { events: [] }, revalidate: 1 };
  }

  return { props: { events: data }, revalidate: 1800 };
};

export default HomePage;
