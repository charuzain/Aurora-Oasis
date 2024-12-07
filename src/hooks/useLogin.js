import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { loginApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  console.log("hi")

  const { mutate: login, isPending: isLogingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // data is return value of mutationFn
      console.log(data);
      toast.success('succesfully login');
      navigate('/');
    },
    onError: () => {
      toast.error('There was an error while login in');
    },
  });
  console.log(login)
  return { login, isLogingIn };
};
