import DurationChart from '../DurationChart/DurationChart';
import SalesChart from '../SalesChart/SalesChart';
import Statistics from '../Statistics/Statistics';
import './DashBoardLayout.scss';

const DashBoardLayout = ({ bookings, stays, cabins }) => {
  return (
    <section className="dashboard-layout">
      <Statistics bookings={bookings} stays={stays} cabins={cabins} />
      <div>Today Activity</div>
      <div>
        <SalesChart bookings={bookings} />
      </div>
      <div>
        <DurationChart bookings={bookings} stays ={stays} />
      </div>
    </section>
  );
};

export default DashBoardLayout;
