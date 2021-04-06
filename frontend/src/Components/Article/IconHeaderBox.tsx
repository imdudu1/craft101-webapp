import React from 'react';

interface IProps {
  icon: string;
  children: JSX.Element;
}

const IconHeaderBox = ({ icon, children }: IProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center m-2">
      <div className="mb-2">{icon}</div>
      <div>{children}</div>
    </div>
  );
};

export default IconHeaderBox;
