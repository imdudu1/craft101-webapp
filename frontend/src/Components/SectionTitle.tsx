import React from 'react';

interface Props {
  title: string;
  explanation: string;
}

const SectionTitle: React.FC<Props> = ({ title, explanation }) => (
  <div className="border-gray-50 shadow-sm rounded-md bg-white px-3 py-3 mb-4">
    <div className="flex flex-row justify-between items-center">
      <p className="font-sans-kr text-lg text-gray-700">{title}</p>
      <p className="font-sans-kr font-light text-xs text-gray-600 overflow-ellipsis">
        {explanation}
      </p>
    </div>
  </div>
);

export default SectionTitle;
