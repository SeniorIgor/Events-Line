import { useEffect, useState } from 'react';

import { startConnection } from '../websocket/websocket';

export const useWsChannel = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let ws: WebSocket;

    const closeHandler = () => {
      setTimeout(createChannel, 3000);
    };

    function createChannel() {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();

      ws = startConnection();
      ws.addEventListener('close', closeHandler);
      setWsChannel(ws);
    }

    createChannel();

    return () => {
      ws.removeEventListener('close', closeHandler);
      ws.close();
    };
  }, []);

  useEffect(() => {
    const openHandler = () => setIsReady(true);

    wsChannel?.addEventListener('open', openHandler);

    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    };
  }, [wsChannel]);

  return { wsChannel, isReady };
};
