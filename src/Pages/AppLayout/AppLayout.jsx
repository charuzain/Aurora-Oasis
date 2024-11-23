import { Outlet } from 'react-router-dom';
import './AppLayout.scss'
import { NavBar } from '../../Components/NavBar/NavBar';

const AppLayout = () => {
  return (
    <div className='container'>
      <nav className='navbar'><NavBar/></nav>
      <aside className='aside'>SideBar</aside>
      <main className='main'>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
