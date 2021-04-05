import { useContext } from 'react';
import { getWebSocketContext } from '../Context/WebSocketContext';

const useSocket = () => {
  const context = useContext(getWebSocketContext());
  return;
};
