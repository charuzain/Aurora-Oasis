import { useSearchParams } from "react-router-dom";
import BookingHeader from "../../Components/BookingHeader/BookingHeader";
import BookingTable from "../../Components/BookingTable/BookingTable";
import Pagination from "../../Components/Pagination/Pagination";


const Bookings = () => {

  return (
    <>
      <BookingHeader />
      <BookingTable />
     
    </>
  );
}

export default Bookings