import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <nav>Navbar</nav>
      <aside>SideBar</aside>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
