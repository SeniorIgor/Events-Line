import type { NextPage } from 'next';
import { useRouter } from "next/router";
import { useCallback } from "react";

import EventList from "@/src/components/event-list";
import paths from "@/src/config/paths";
import EventsSearch, { SearchEventHandler } from "@/src/modules/events/event-search";
import eventsService from "@/src/services/events";

const EventsPage: NextPage = () => {
  const events = eventsService.getAllEvents();
  const router = useRouter();

  const handleSearch: SearchEventHandler = useCallback(
    ({ month, year }) => {
      const path = `${paths.events}/${year}/${month}`;
      router.push(path);
    },
    [router]
  );

  return (
    <>
      <EventsSearch onSearch={handleSearch} />
      <EventList items={events} />
    </>
  );
};

export default EventsPage;
