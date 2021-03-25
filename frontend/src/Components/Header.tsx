import React from 'react';
import ExploreIcon from '@material-ui/icons/Explore';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const Header: React.FC = () => (
  <header className="bg-white border-b sticky">
    <div className="container h-20 mx-auto flex justify-between items-center">
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
    </div>
  </header>
);

export default Header;
