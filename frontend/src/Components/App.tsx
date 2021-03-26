import React from 'react';
import Routes from './Routes';
import Header from './Header';

function App() {
  return (
    <div className="h-full min-h-screen bg-gray-100">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
