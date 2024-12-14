import BookingHeader from "../../Components/BookingHeader/BookingHeader";
import BookingTable from "../../Components/BookingTable/BookingTable";
import TableHeader from "../../Components/TableHeader/TableHeader";
import Menus from "../../Components/Menu/Menus";


const Bookings = () => {

  return (
    <>
      <Menus>
        <TableHeader />
        <BookingHeader/>
        <BookingTable />
      </Menus>
    </>
  );
}

export default Bookings