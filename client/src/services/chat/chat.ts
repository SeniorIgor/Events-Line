import { Message } from '@/src/types';

type Subscriber = (messages: Array<Message>) => void;

let subscriberList: Array<Subscriber> = [];

let ws: WebSocket | null = null;

const closeHandler = () => {
  setTimeout(createChannel, 3000);
};

const startConnection = () => {
  return new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
};

const messageHandler = (event: MessageEvent) => {
  const messages = JSON.parse(event.data);

  subscriberList.map((subscriber) => subscriber(messages));
};

function createChannel() {
  ws?.removeEventListener('close', closeHandler);
  ws?.close();

  ws = startConnection();
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
}

export const chatAPI = {
  create() {
    createChannel();
  },
  subscribe(subscriber: Subscriber) {
    subscriberList.push(subscriber);
  },
  unsubscribe(subscriber: Subscriber) {
    subscriberList = subscriberList.filter((current) => current !== subscriber);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};
