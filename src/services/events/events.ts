import events from './events.data';
import { DateFilter } from './events.types';

const eventsService = {
  getFeaturedEvents: () => events.filter((event) => event.isFeatured),
  getAllEvents: () => events,
  getEventById: (id: string) => events.find((event) => event.id === id),
  getFilteredEvents: (dateFilter: DateFilter) => {
    const { year, month } = dateFilter;

    return events.filter((event) => {
      const eventDate = new Date(event.date);

      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });
  },
};

export default eventsService;
