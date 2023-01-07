const basePath = 'https://senior-nextjs-cource-default-rtdb.firebaseio.com';

export const apiPath = {
  events: {
    all: `${basePath}/events.json`,
    byId: (id: string) => `${basePath}/events/${id}.json`,
  },
  comments: {
    all: (eventId: string) => `${basePath}/events/${eventId}/comments.json`,
    byId: (eventId: string, commentId: string) => `${basePath}/events/${eventId}/comments/${commentId}.json`,
  },
};
