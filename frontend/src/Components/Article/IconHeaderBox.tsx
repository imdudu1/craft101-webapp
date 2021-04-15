import React from 'react';

interface IconHeaderBoxProps {
  icon: string;
  description: string;
  children: JSX.Element;
}

const IconHeaderBox = ({ icon, description, children }: IconHeaderBoxProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-6">
      <div className="flex items-center justify-center mb-2 max-w-full">
        <div className="text-2xl mr-2">{icon}</div>
        <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          {children}
        </div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default IconHeaderBox;
