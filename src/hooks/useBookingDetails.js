import { useQuery } from '@tanstack/react-query';
import { fetchBookingById } from '../services/apiBookings';

export const useBookingDetails = (id) => {
  console.log(id);
  const { data, isPending, isError } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => fetchBookingById(id),
  });

  return { data, isPending, isError };
};
