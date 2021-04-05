import React from 'react';

interface TagBadgeProps {
  tags: string[] | undefined;
}

const TagBadgeList = ({ tags }: TagBadgeProps) => (
  <ul className="flex flex-row">
    {tags?.map((name) => (
      <li className="mr-1" key={`tags-${name}`}>
        <div className="pt-1 pb-1 flex items-center space-x-1 text-sm px-2 bg-gray-200 text-gray-800 rounded-full">
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full">&nbsp;</div>
          <p className="w-10 text-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
            {name}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

export default TagBadgeList;
