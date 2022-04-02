import type { NextPage } from 'next';
import Link from "next/link";

import EventList from "@/src/components/event-list";

import events from "../src/services/events";

const HomePage: NextPage = () => {
  const featuredEvents = events.getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
