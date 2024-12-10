import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { logoutUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import defaultImage from '../../../public/default-user.jpg';
import { TbLogout } from 'react-icons/tb';
import { HiOutlineUser, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

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
    <div>
      <div>
        <img src={defaultImage} alt="Avatar" />
      </div>
      <button onClick={() => navigate('/account')}>
        <HiOutlineUser />
      </button>
      <button>
        <HiOutlineMoon />
      </button>
      <button onClick={() => mutate()} disabled={isPending}>
        <TbLogout />
      </button>
    </div>
  );
};

export default Header;
