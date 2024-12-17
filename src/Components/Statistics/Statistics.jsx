import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';

const Statistics = ({ bookings, stays ,cabins}) => {

  const [searchParams] = useSearchParams()
  const days = Number(searchParams.get('last')) || 7

  
  
  const sales = bookings.reduce((a, c) => a + c.totalPrice, 0)


  const totalOccpiedNight = stays.reduce((a, c) => a + c.numNights, 0)
  
  const totalAvailableNights = cabins.length * days

  const occupancy = totalOccpiedNight / totalAvailableNights * 100;
  
  return (
    <>
      <div>
        <HiOutlineBriefcase />
        <div>
          <p>Bookings</p>
          <p>{bookings.length }</p>
        </div>
      </div>

      <div>
        <div>
          <HiOutlineBanknotes />
        </div>
        <div>
          <p>Sales</p>
          <p>${sales}</p>
        </div>
      </div>
      <div>
        <div>
          <HiOutlineCalendarDays />
        </div>
        <div>
          <p>Check Ins</p>
          <p>{stays.length}</p>
        </div>
      </div>

      <div>
        <div>
          <HiOutlineChartBar />
        </div>
        <div>
          <p>Occupancy Rates</p>
          <p>{Math.round(occupancy)}%</p>
        </div>
      </div>
    </>
  );
};

export default Statistics;
