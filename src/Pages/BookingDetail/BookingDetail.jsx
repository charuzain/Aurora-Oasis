import { useParams } from 'react-router-dom';
import { useBookingDetails } from '../../hooks/useBookingDetails';

const BookingDetail = () => {
  const { bookingId } = useParams();

  const { data, isPending, isError } = useBookingDetails(bookingId);

  if (isPending) {
    return <h1>Loading</h1>;
  }
  console.log(data);


  return (
    <>
      <h1>status is{data.status }</h1>
      <p>{bookingId}</p>
    </>
  );
};

export default BookingDetail;
