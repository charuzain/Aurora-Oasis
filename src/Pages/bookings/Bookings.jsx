import { useSearchParams } from "react-router-dom";
import BookingHeader from "../../Components/BookingHeader/BookingHeader";
import BookingTable from "../../Components/BookingTable/BookingTable";


const Bookings = () => {

  return (
    <>
      <BookingHeader />
      <BookingTable />
    </>
  );
}

export default Bookings