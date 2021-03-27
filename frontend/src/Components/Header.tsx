import React from 'react';
import ExploreIcon from '@material-ui/icons/Explore';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="bg-white border-b sticky">
    <div className="container h-20 mx-auto flex justify-between items-center">
      <Link to="/">
        <img className="w-40" src="images/logo.png" alt="logo" />
      </Link>
      <nav>
        <ul className="flex items-center">
          <li className="h-20 w-24 px-3 border-opacity-10 border-l align-middle flex justify-center items-center hover:bg-gray-50">
            <ExploreIcon />
          </li>
          <li className="h-20 w-24 px-3 border-opacity-10 border-l flex justify-center items-center hover:bg-gray-50">
            <Badge badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
          </li>
          <Link to="/auth">
            <li className="h-20 w-24 px-3 border-opacity-10 border-l border-r flex justify-center items-center hover:bg-gray-50">
              <LockOpenIcon />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
