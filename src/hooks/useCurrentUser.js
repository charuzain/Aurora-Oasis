import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/apiAuth';

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isError };
};
