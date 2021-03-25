import React from 'react';

const LiveStateBar: React.FC = () => (
  <div className="h-24 border-gray-50 shadow-sm rounded-md bg-white">
    <div className="h-full">
      <ul className="h-full flex justify-around">
        <li className="flex flex-col justify-center items-center">
          <p className="font-sans-kr text-sm font-color text-gray-400">
            🌳 전체 서버
          </p>
          <p className="font-sans-kr text-sm opacity-90 shadow-sm font-bold text-red-600 border rounded-full py-1 px-3 mt-2">
            9,999,999+
          </p>
        </li>
        <li className="flex flex-col justify-center items-center">
          <p className="font-sans-kr text-sm font-color text-gray-400">
            🌱 새로운 서버
          </p>
          <p className="font-sans-kr text-sm opacity-90 shadow-sm font-bold text-green-700 border rounded-full py-1 px-3 mt-2">
            9,999,999+
          </p>
        </li>
        <li className="flex flex-col justify-center items-center">
          <p className="font-sans-kr text-sm font-color text-gray-400">
            ⛏ 오늘 방문자
          </p>
          <p className="font-sans-kr text-sm opacity-90 shadow-sm font-bold text-gray-800 border rounded-full py-1 px-3 mt-2">
            9,999,999+
          </p>
        </li>
      </ul>
    </div>
  </div>
);

export default LiveStateBar;
