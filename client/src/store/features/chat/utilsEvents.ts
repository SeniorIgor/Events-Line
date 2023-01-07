export interface ChannelValue {
  payload: number;
}

type EventHandler = (value: ChannelValue) => void;

export interface EventProvider {
  subscribe: (event: string, handler: EventHandler) => void;
  unsubscribe: (event: string, handler: EventHandler) => void;
}

export const createEventProvider = (): EventProvider => {
  let value = 0;

  const subscribers = {};

  const triggerEvent = (event: string, payload: ChannelValue) =>
    (subscribers[event] || []).map((callback: EventHandler) => callback(payload));

  setInterval(() => {
    value += 1;

    triggerEvent('value', { payload: value });
  }, 3000);

  return {
    subscribe: (event: string, handler: EventHandler) => {
      if (!subscribers[event]) {
        subscribers[event] = [];
      }

      subscribers[event].push(handler);
    },
    unsubscribe: (event: string, handler: EventHandler) => {
      subscribers[event] = subscribers[event].filter((subscriber: EventHandler) => subscriber !== handler);
    },
  };
};
