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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import BookingDetail from './Pages/BookingDetail/BookingDetail';
import CheckIn from './Pages/CheckIn/CheckIn';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import SignUp from './Pages/Signup/SignUp';
import UserAccount from './Pages/UserAccount/UserAccount';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from './Components/ErrorFallBack/ErrorFallBack';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary
          FallbackComponent={ErrorFallBack}
          onReset={() => {
            window.location.replace('/')
          }}
        >
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        </ErrorBoundary>
      ),
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
          path: '/bookings/:bookingId',
          element: <BookingDetail />,
        },
        {
          path: 'checkin/:bookingId',
          element: <CheckIn />,
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
        {
          path: '/account',
          element: <UserAccount />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
