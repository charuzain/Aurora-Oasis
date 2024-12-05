import { fetchAllBookings } from '../../services/apiBookings';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { NUM_PER_PAGE } from '../../utils/constants';
import './BookingTable.scss';
import Menus from '../Menu/Menus';
import { HiEllipsisVertical } from 'react-icons/hi2';

const BookingTable = () => {
  const [searchParams] = useSearchParams();

  const filter = searchParams.get('status') || 'all';
  const sortQuery = searchParams.get('sortBy') || 'startDate-asc';
  const pageNum = Number(searchParams.get('page')) || 1;

  const { isPending, data, error } = useQuery({
    queryKey: ['bookings', filter, sortQuery, pageNum],
    queryFn: () => fetchAllBookings(filter, sortQuery, pageNum),
  });
  const queryClient = useQueryClient();

  if (isPending) {
    return <h1>Loading..</h1>;
  }
  let bookings = data.bookings;
  let count = data.count;

  if (pageNum < Math.ceil(count / NUM_PER_PAGE)) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortQuery, pageNum + 1],
      queryFn: () => fetchAllBookings(filter, sortQuery, pageNum + 1),
    });
  }

  if (pageNum > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortQuery, pageNum - 1],
      queryFn: () => fetchAllBookings(filter, sortQuery, pageNum - 1),
    });
  }

  return (
    <div>
      
        {bookings.map((booking) => (
          <div key={booking.id} className="row">
            <div>{booking.cabins.name}</div>
            <div>
              <span>{booking.guests.fullName}</span>
              <span>{booking.guests.email}</span>
            </div>
            <div>
              <span>{booking.numNights} night stay</span>
              <span>{booking.startDate} </span>
              <span>{booking.endDate} </span>
            </div>
            <div>{booking.status}</div>
            <div>${booking.totalPrice}</div>
            <Menus.Menu>
              <Menus.Toggle id={booking.id} />
              <Menus.List id={booking.id}>
                <Menus.Button>Add</Menus.Button>
                <Menus.Button>Add</Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </div>
        ))}
    
      {Math.ceil(count / NUM_PER_PAGE) > 1 && <Pagination count={count} />}
    </div>
  );
};

export default BookingTable;
