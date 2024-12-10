import { Outlet } from 'react-router-dom';
import './AppLayout.scss';
import { NavBar } from '../../Components/NavBar/NavBar';
import Header from '../../Components/Header/Header';

const AppLayout = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <NavBar />
      </nav>
      <aside className="aside">
        <Header/>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
