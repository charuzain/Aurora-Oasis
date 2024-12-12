import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
// wrap applayout in protectedroute componenet it determine if there is a currently logged in user , it there is a authenticated user all the routes un applayout can be accesses.
const ProtectedRoute = ({ children }) => {
  // getCurrentUser();
  const navigate = useNavigate();

  // Load the authenticated user
  // const {
  //   data: user,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: getCurrentUser,
  // });
  // {
  //   user, isLoading, isError;
  // }
  const { user, isLoading, isError } = useCurrentUser();

  // if there is no authenticated user redirect to login
  useEffect(() => {
    if (!isLoading && user?.role !== 'authenticated') {
      navigate('/login');
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // While loading show Spinner

  // if the  user is authenticated render the app

  if (user?.role === 'authenticated') {
    return children;
  }
  // If the user is not authenticated, return null (no content rendered)
  // return null ensures that unauthenticated users don’t see protected content while waiting for the redirection.Redirection happens in useEffect once the user data is fetched.This pattern avoids rendering the children prematurely, ensuring a smoother user experience.
  return null;
};

export default ProtectedRoute;

// Why navigate inside useEffect although it has condition and is supposed to run if role is not.Initially I had  if (user?.role !== 'authenticated') {
//   navigate('/login');
// } this is not correct and some error occured  -> Cannot update a component (RouterProvider) while rendering a different component (ProtectedRoute)
//     The error occured because I was trying to update a state or trigger navigation within the render phase of a component (ProtectedRoute). This violates React's rules, as it expects state updates or side effects to happen in lifecycle methods, hooks, or event handlers, but not during rendering.

// Here's a breakdown and solution for this issue:

// Why This Happens
// React Router:

// In your ProtectedRoute component, you're likely checking for a condition (e.g., user authentication) and then attempting to navigate (e.g., navigate('/login')).
// navigate triggers a state change in the React Router while your ProtectedRoute is still rendering, leading to this error.
// React's Rules:

// State changes (like navigation) during rendering lead to instability because React doesn't know if the component should continue rendering or start over.

// Solution
// Use useEffect for Navigation
// ensure that navigation logic is only triggered after the component has finished rendering, by moving it to a useEffect
