export const startConnection = () => {
  return new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
};
