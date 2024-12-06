import { useNavigate, useParams } from 'react-router-dom';
import { useBookingDetails } from '../../hooks/useBookingDetails';
import { HiMiniArrowLongLeft, HiMiniHomeModern } from 'react-icons/hi2';

const BookingDetail = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data: booking, isPending, isError } = useBookingDetails(bookingId);

  if (isPending) {
    return <h1>Loading</h1>;
  }
  console.log(booking);
  const totalPrice =
    booking.cabinPrice * booking.numNights + booking.extraPrice;

  return (
    <>
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1>Booking #{booking.id}</h1>
          <span>{booking.status}</span>
        </div>
        <div>
          .
          <button onClick={() => navigate(-1)}>
            <HiMiniArrowLongLeft />
            <span>Back</span>
          </button>
        </div>
      </section>
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>
            <HiMiniHomeModern />
          </span>
          <p>
            {booking.numNights} nights in cabin {booking.cabins.name}
          </p>
        </div>
        <div>
          <span>
            {booking.startDate} - {booking.endDate}
          </span>
        </div>
      </section>

      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div>
            <img
              src={booking.cabins.image}
              alt={booking.cabins.name}
              style={{ width: '50px' }}
            />
          </div>

          <div>
            <p>Remarks</p>
            <p>{booking.observations}</p>
          </div>
          <div>
            <p>Breakfast Included</p>
            <p>{booking.hasBreakfast ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div>
          <div>
            <p>Full Name</p>
            <p>{booking.guests.fullName}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{booking.guests.email}</p>
          </div>
          <div>
            <p>ID | Country</p>
            <p>
              {booking.guests.nationalId} | {booking.guests.nationality}
            </p>
          </div>
          <div>
            <p>ID </p>
            <p>{booking.guests.nationality}</p>
          </div>
        </div>
      </section>

     
        <div>
          Total Price ${totalPrice}{' '}
          {booking.isPaid ? 'Paid' : 'Will Pay at property '}
      </div>
      
      <div>
        Booked {booking.created_at}
      </div>
      

      <section>
        <button onClick={()=>navigate(`/checkin/${booking.id}`)}>Check In</button>
        <button>Delete Booking</button>
        <button onClick={() => navigate(-1)}>Back</button>
      </section>
    </>
  );
};

export default BookingDetail;
