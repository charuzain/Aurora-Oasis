import { useQuery } from '@tanstack/react-query';
import { GetBookingsAfterDate } from '../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { startDate } from '../utils/helpers';

export const useBookingAfterDate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryDays = searchParams.get('last')
    ? Number(searchParams.get('last'))
    : 90;
  const date = startDate(queryDays);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['bookings', queryDays],
    queryFn: () => GetBookingsAfterDate(date),
  });

  return { isPending, isError, data, error };
};
