import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../services/apiBookings';

export const useDeleteBooking = () => {
  // console.log(id)
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const {mutate:deleteBookingQuery ,isPending:isDeletingCabin } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success('Booking deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error('Error deleting Booking:', error);
    },
    // onSettled: () => navigate(-1),
  });

  // console.log("mutation is " , mutation)
  return {deleteBookingQuery , isDeletingCabin}
};
