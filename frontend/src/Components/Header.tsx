import ExploreIcon from '@material-ui/icons/Explore';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React from 'react';

const Header: React.FC = () => (
  <header className="h-20 bg-white flex justify-between items-center px-3 border-b">
    <span className="">CRAFT101</span>
    <nav className="h-full">
      <ul className="h-full flex items-center">
        <li className="h-full w-24 px-3 border-opacity-10 border-l align-middle flex justify-center items-center hover:bg-blue-50">
          <ExploreIcon />
        </li>
        <li className="h-full w-24 px-3 border-opacity-10 border-l flex justify-center items-center hover:bg-blue-50">
          <Badge badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
        </li>
        <li className="h-full w-24 px-3 border-opacity-10 border-l border-r flex justify-center items-center hover:bg-blue-50">
          <LockOpenIcon />
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
