import { Link, NavLink } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';
import { HiCalendarDays } from 'react-icons/hi2';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { HiOutlineUsers } from 'react-icons/hi2';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import logo from '../../assets/aurora.svg';
import './NavBar.scss';
import Uploader from '../../data/Uploader';


export const NavBar = () => {
  return (
    <>
      <div className="nav__logo">
        <img src={logo} alt="The Aurora Retreat" className="nav__image" />
      </div>
      <ul className="nav__list">
        <li className="nav__item">
          <Link to={'/'} className="nav__link">
            <HiOutlineHome />
            <span>Home</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link to={'/bookings'} className="nav__link">
            <HiCalendarDays />
            <span>Bookings</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link to={'/cabins'} className="nav__link">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link to={'/users'} className="nav__link">
            <HiOutlineUsers />
            <span>Users</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link to={'/settings'} className="nav__link">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
      <Uploader/>
    </>
  );
};
