import { fetchAllBookings } from '../../services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { NUM_PER_PAGE } from '../../utils/constants';

const BookingTable = () => {
  const [searchParams] = useSearchParams();

  const filter = searchParams.get('status') || 'all';
  const sortQuery = searchParams.get('sortBy') || 'startDate-asc';
  const pageNum = searchParams.get('page') || 1;

  console.log(filter);
  const { isPending, data, error } = useQuery({
    queryKey: ['bookings', filter, sortQuery, pageNum],
    queryFn: () => fetchAllBookings(filter, sortQuery, pageNum),
  });

  if (isPending) {
    return <h1>Loading..</h1>;
  }
  let bookings = data.bookings;
  let count = data.count;

  return (
    <>
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
      {Math.ceil(count / NUM_PER_PAGE) > 1 && <Pagination count={count} />}
    </>
  );
};

export default BookingTable;
