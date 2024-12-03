import { fetchAllBookings } from '../../services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const BookingTable = () => {
  const [searchParams] = useSearchParams();

  const filter = searchParams.get('status') || 'all';
  const sortQuery = searchParams.get('sortBy') || 'startDate-asc';



  console.log(filter);
  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortQuery],
    queryFn: () => fetchAllBookings(filter, sortQuery),
  });

  if (isPending) {
    return <h1>Loading..</h1>;
  }
  // console.log(bookings);

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <div>{booking.cabins.name}</div>
          <div>
            <span>{booking.guests.fullName}</span>
            <span>{booking.guests.email}</span>
          </div>
          <div>{booking.status}</div>
          <div>${booking.totalPrice}</div>
          <div>
            <span>{booking.numNights} night stay</span>
            <span>{booking.startDate} </span>
            <span>{booking.endDate} </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingTable;
