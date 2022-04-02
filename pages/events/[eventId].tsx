import type { NextPage } from 'next';
import { useRouter } from "next/router";
import { useMemo } from "react";

import EventContent from "@/src/modules/events/event-content";
import EventLogistics from "@/src/modules/events/event-logistics";
import EventSummary from "@/src/modules/events/event-summary";
import ErrorAlert from "@/src/ui/error-alert";

import events from "../../src/services/events";

const EventDetailPage: NextPage = () => {
  const { eventId } = useRouter().query;

  const event = useMemo(() => events.getEventById(String(eventId)), [eventId]);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        image={event.image}
        location={event.location}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
