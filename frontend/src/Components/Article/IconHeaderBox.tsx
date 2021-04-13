import React from 'react';

interface IconHeaderBoxProps {
  icon: string;
  description: string;
  children: JSX.Element;
}

const IconHeaderBox = ({ icon, description, children }: IconHeaderBoxProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6">
      <div className="flex items-center justify-center mb-2 max-w-full">
        <div className="text-2xl mr-2">{icon}</div>
        <div className="max-w-full overflow-x-auto">{children}</div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default IconHeaderBox;
