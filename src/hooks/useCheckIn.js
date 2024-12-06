import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCheckIn } from '../services/apiBookings';

export const useCheckIn = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCheckIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
  console.log(mutation)
  return mutation;
};
