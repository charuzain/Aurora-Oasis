import { useSearchParams } from "react-router-dom";
import BookingHeader from "../../Components/BookingHeader/BookingHeader";
import BookingTable from "../../Components/BookingTable/BookingTable";
import Pagination from "../../Components/Pagination/Pagination";
import TableHeader from "../../Components/TableHeader/TableHeader";
import Menus from "../../Components/Menu/Menus";


const Bookings = () => {

  return (
    <>
      <Menus>
        <TableHeader />
        <BookingTable />
      </Menus>
    </>
  );
}

export default Bookings