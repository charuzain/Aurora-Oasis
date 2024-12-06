import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCheckIn } from '../services/apiBookings';
import toast from 'react-hot-toast';

export const useCheckIn = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCheckIn,
    onSuccess: (data) => {
      // data is return value of mutationFn
      toast.success(
        `succesfully ${
          data.status === 'checked-in' ? 'checked-in' : 'checked-out'
        } `
      );
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: () => {
      toast.error('There was an error while checed in');
    },
  });
  return mutation;
};
