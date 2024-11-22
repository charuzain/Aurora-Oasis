import { Outlet } from 'react-router-dom';
import './AppLayout.scss'

const AppLayout = () => {
  return (
    <div className='container'>
      <nav className='navbar'>Navbar</nav>
      <aside className='aside'>SideBar</aside>
      <main className='main'>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
