import type { NextPage } from 'next';
import { useRouter } from "next/router";

import EventList from "@/src/components/event-list";
import paths from "@/src/config/paths";
import EventSearchTitle from "@/src/modules/events/event-search-title";
import eventsService, { DateFilter } from "@/src/services/events";
import Button from "@/src/ui/button";
import ErrorAlert from "@/src/ui/error-alert";

const checkSearchParams = ({ year, month }: DateFilter) => {
  return (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2022 ||
    month < 1 ||
    month > 12
  );
};

const FilteredEventsPage: NextPage = () => {
  const { search } = useRouter().query;

  if (!search) {
    return <h4 className="center">Loading...</h4>;
  }

  const [year, month] = search as Array<string>;
  const filters = { year: +year, month: +month };

  if (checkSearchParams(filters)) {
    return (
      <>
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

  const events = eventsService.getFilteredEvents(filters);

  if (!events?.length) {
    return (
      <>
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

  return (
    <>
      <EventSearchTitle date={new Date(filters.year, filters.month - 1)} />
      <EventList items={events} />
    </>
  );
};

export default FilteredEventsPage;
