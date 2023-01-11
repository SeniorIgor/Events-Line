import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import ErrorAlert from '@/src/components/error-alert';
import CommentsSection from '@/src/modules/comments/CommentSection/CommentSection';
import EventContent from '@/src/modules/events/components/event-content';
import EventLogistics from '@/src/modules/events/components/event-logistics';
import EventSummary from '@/src/modules/events/components/event-summary';
import { getEventById, getFeaturedEvents } from '@/src/services/events';
import { Event } from '@/src/types';

interface EventDetailPageProps {
  event?: Event;
  status?: 'notFound';
}

interface Params extends ParsedUrlQuery {
  eventId: string;
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ event, status }) => {
  if (status === 'notFound') {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  if (!event) {
    return (
      <div className="center">
        <h6>Loading...</h6>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} image={event.image} location={event.location} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <CommentsSection eventId={event.id} />
    </>
  );
};

export const getStaticProps: GetStaticProps<EventDetailPageProps, Params> = async (context) => {
  const { eventId } = context.params!;

  const { data, error } = await getEventById(eventId);

  if (error) {
    return { notFound: true };
  }

  if (!data) {
    return { props: { status: 'notFound' }, revalidate: 60 };
  }

  return { props: { event: data }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data, error } = await getFeaturedEvents();

  if (error || !data) {
    return { paths: [], fallback: true };
  }

  const paths = data.map(({ id }) => ({ params: { eventId: id } }));

  return { paths, fallback: true };
};

export default EventDetailPage;
