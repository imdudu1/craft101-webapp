import React, { useEffect } from 'react';
import { getWebSocketContext } from './WebSocketContext';
import { invariant } from 'ts-invariant';
import { LiveMC } from '../live-mc';

interface WebSocketProviderProps {
  client: LiveMC;
  children: React.ReactNode | React.ReactNode[] | null;
}

const WebSocketProvider = ({ client, children }: WebSocketProviderProps) => {
  const WebSocketContext = getWebSocketContext();

  useEffect(() => {
    return client.close;
  });

  return (
    <WebSocketContext.Consumer>
      {(context: any = {}) => {
        if (client && context.client !== client) {
          context = Object.assign({}, context, { client });
        }

        invariant(context.client, 'WebSocketProvider');

        return (
          <WebSocketContext.Provider value={context}>
            {children}
          </WebSocketContext.Provider>
        );
      }}
    </WebSocketContext.Consumer>
  );
};

export default WebSocketProvider;
