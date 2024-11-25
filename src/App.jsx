import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/dashboard/dashboard';
import Bookings from './Pages/bookings/Bookings';
import Cabins from './Pages/cabins/Cabins';
import Login from './Pages/Login/Login';
import Users from './Pages/users/Users';
import Settings from './Pages/settings/Settings';
import AppLayout from './Pages/AppLayout/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

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
const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          success: {
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
