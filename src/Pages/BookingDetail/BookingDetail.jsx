import { useParams } from 'react-router-dom';

const BookingDetail = () => {
  const { bookingId } = useParams();
  
  return (
    <>
      <h1>Booking Detail</h1>
      <p>{bookingId}</p>
    </>
  );
};

export default BookingDetail;
