import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/dashboard/dashboard';
import Bookings from './Pages/bookings/Bookings';
import Cabins from './Pages/cabins/Cabins';
import Login from './Pages/Login/Login';
import Users from './Pages/users/Users';
import Settings from './Pages/settings/Settings';
import AppLayout from './Pages/AppLayout/AppLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'bookings',
          element: <Bookings />,
        },
        {
          path: 'cabins',
          element: <Cabins />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'users',
          element: <Users />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
