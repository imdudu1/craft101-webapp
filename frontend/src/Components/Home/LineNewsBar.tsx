import React from 'react';

const LineNewsBar: React.FC = () => (
  <div className="h-24 border-gray-50 shadow-sm rounded-md bg-white">
    <div className="h-full grid grid-cols-12">
      <div className="h-full col-span-1 bg-blue-300 rounded-l"></div>
      <div className="h-full col-span-11 flex flex-col justify-center px-3">
        <p className="font-sans-kr mb-1">📰 JOIN OUR COMMUNITY ADVENTURE!</p>
        <p className="font-sans-kr text-xs font-light text-gray-400 overflow-hidden overflow-ellipsis line-clamp-2">
          Once again, it’s time to highlight some of the latest community
          structures that have caught our eye.
        </p>
      </div>
    </div>
  </div>
);

export default LineNewsBar;
