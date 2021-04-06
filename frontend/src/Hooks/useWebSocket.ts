import { useContext, useState } from 'react';
import { getWebSocketContext } from '../Context/WebSocketContext';

export const useWebSocket = (event: string) => {
  const [data, setData] = useState<string>('');
  const { client } = useContext(getWebSocketContext());
  client?.addEventCallback(event, setData);
  return data;
};
