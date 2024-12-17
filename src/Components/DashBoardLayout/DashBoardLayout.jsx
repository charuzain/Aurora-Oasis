import SalesChart from '../SalesChart/SalesChart';
import Statistics from '../Statistics/Statistics';
import './DashBoardLayout.scss';

const DashBoardLayout = ({bookings , stays,cabins}) => {
  return (
    <section className="dashboard-layout">
      <Statistics bookings={bookings} stays={stays} cabins={cabins} />
      <div>Today Activity</div>
      <div>
        <SalesChart bookings={bookings}/>
      </div>
      <div>Stay</div>
      <div>Chart</div>
    
    </section>
  );
};

export default DashBoardLayout;
