import { WEBSOCKET_URL } from './constants';

export const client = new WebSocket(WEBSOCKET_URL);

client.onopen = () => {
  console.log('Connected');
  client.send(
    JSON.stringify({
      event: 'message',
    }),
  );
};
