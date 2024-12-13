import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../services/apiAuth';
import toast from 'react-hot-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate:editUserInfo, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      // queryClient.setQueryData(['users'], user);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('user updated');
    },
    onError: () => {
      toast.error('cant update user');
    },
  });

  return {editUserInfo , isPending}
};
