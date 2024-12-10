import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { logoutUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: logoutUser,
    mutationKey: ['users'],
    onSuccess: () => {
      //remove all he queries before logging out
      queryClient.removeQueries();
      navigate('/login');
    },
    onError: () => {
      toast.error('Logout failed. Please try again.');
    },
  });
  return (
    <>
      <button onClick={() => mutate()} disabled={isPending}>
        Logout
      </button>
    </>
  );
};

export default Header;
