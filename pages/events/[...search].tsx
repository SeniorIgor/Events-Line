import type { NextPage, GetServerSideProps } from 'next';
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";

import paths from "@/config/paths";
import EventList from "@/src/components/event-list";
import EventSearchTitle from "@/src/modules/events/components/event-search-title";
import { getFilteredEvents } from "@/src/services/events";
import { Event } from "@/src/types";
import Button from "@/src/ui/button";
import ErrorAlert from "@/src/ui/error-alert";

interface FilteredEventsPageProps {
  search: Array<string>;
}

interface Params extends ParsedUrlQuery {
  search: Array<string>;
}

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = ({ search }) => {
  const [events, setEvents] = useState<Array<Event>>();
  const [year, month] = search;
  const filters = { year: +year, month: +month };

  const head = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${month}/${year}.`} />
    </Head>
  );

  const { data, error } = useSWR<Array<Event> | undefined, Error>(
    '/getEvents',
    async () => (await getFilteredEvents(filters)).data
  );

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  if (error) {
    return (
      <>
        {head}
        <ErrorAlert>
          <p className="center">Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button as="link" href={paths.events}>
            Show All Events
          </Button>
        </div>
      </>
    );
  }

  if (!events) {
    return (
      <>
        {head}
        <div className="center">
          <h4>Loading...</h4>
        </div>
      </>
    );
  }

  if (!events.length) {
    return (
      <>
        {head}
        <ErrorAlert>
          <p className="center">Not events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button as="link" href={paths.events}>
            Show All Events
          </Button>
        </div>
      </>
    );
  }

  const currentDate = new Date(filters.year, filters.month - 1);

  return (
    <>
      {head}
      <EventSearchTitle date={currentDate} />
      <EventList items={events} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  FilteredEventsPageProps,
  Params
> = async ({ params }) => {
  const { search } = params!;

  return { props: { search } };
};

export default FilteredEventsPage;
