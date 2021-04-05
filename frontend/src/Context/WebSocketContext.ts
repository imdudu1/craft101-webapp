import React from 'react';

export interface WebSocketContextValue {
  client?: WebSocket;
}

const cache = new WeakMap<
  typeof React.createContext,
  React.Context<WebSocketContextValue>
>();

const getWebSocketContext = () => {
  let context = cache.get(React.createContext)!;
  if (!context) {
    context = React.createContext<WebSocketContextValue>({});
    context.displayName = 'WebSocketContext';
    cache.set(React.createContext, context);
  }
  return context;
};

export { getWebSocketContext };
