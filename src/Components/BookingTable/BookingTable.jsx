import { fetchAllBookings } from '../../services/apiBookings';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { NUM_PER_PAGE } from '../../utils/constants';
import './BookingTable.scss';
import Menus from '../Menu/Menus';
// import { HiEllipsisVertical } from 'react-icons/hi2';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useCheckIn } from '../../hooks/useCheckIn';
import { useConfirmDelete } from '../../hooks/UseConfirmDelete';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import { useDeleteBooking } from '../../hooks/useDeleteBooking';

const BookingTable = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { showDeleteDialog, confirmDeleteHandler } = useConfirmDelete();
  const navigate = useNavigate();
  const { deleteBookingQuery, isDeletingCabin } = useDeleteBooking();
  const mutation = useCheckIn();

  const deleteCabinHandler = (id) => {
    console.log("delete cabin")
    console.log(id)
    deleteBookingQuery(id);
  };

  const filter = searchParams.get('status') || 'all';
  const sortQuery = searchParams.get('sortBy') || 'startDate-asc';
  const pageNum = Number(searchParams.get('page')) || 1;

  const { isPending, data, error } = useQuery({
    queryKey: ['bookings', filter, sortQuery, pageNum],
    queryFn: () => fetchAllBookings(filter, sortQuery, pageNum),
  });

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

  const detailHandler = (id) => {
    navigate(`/bookings/${id}`);
  };

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
              <Menus.Button
                icon={<HiEye />}
                onClick={() => detailHandler(booking.id)}
              >
                See details
              </Menus.Button>

              {booking.status === 'unconfirmed' && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/checkin/${booking.id}`)}
                >
                  Check in
                </Menus.Button>
              )}

              {/* checkout change the sttaus from checkin to checkout */}
              {booking.status === 'checked-in' && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => {
                    mutation.mutate({
                      id: booking.id,
                      status: 'checked-out',
                    });
                  }}
                >
                  Check Out
                </Menus.Button>
              )}

              <Menus.Button icon={<HiTrash />} onClick={()=>confirmDeleteHandler()}>
                Delete booking
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>

          {showDeleteDialog && (
            <ConfirmDelete
              name="cabin"
              id={booking.id}
              confirmDeleteHandler={confirmDeleteHandler}
              onClickDelete={() => {
                deleteCabinHandler(booking.id)
                confirmDeleteHandler() 
              }}
            />
          )}
        </div>
      ))}

      {Math.ceil(count / NUM_PER_PAGE) > 1 && <Pagination count={count} />}
    </div>
  );
};

export default BookingTable;
