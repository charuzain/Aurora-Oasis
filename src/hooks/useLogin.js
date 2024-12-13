import toast from 'react-hot-toast';
import { useMutation} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../services/apiAuth';

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending: isLogingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // data is return value of mutationFn
      console.log(data);
      toast.success('succesfully login');
      navigate('/');
    },
    onError: () => {
      toast.error('Provided Password or email is incorrect');
    },
  });
  console.log(login)
  return { login, isLogingIn };
};
