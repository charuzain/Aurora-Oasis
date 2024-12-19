import { useSearchParams } from 'react-router-dom';
import { useBookingAfterDate } from '../../hooks/useBookingAfterDate';
import { useStayAfterDate } from '../../hooks/useStayAfterDate';
import DashBoardLayout from '../../Components/DashBoardLayout/DashBoardLayout';
import { useCabin } from '../../hooks/useCabins';
import { useTodayActivity } from '../../hooks/useTodayActivity';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isPending, isError, data, error } = useBookingAfterDate();

  const { isStaysPending, isStaysError, staysData, staysError } =
    useStayAfterDate();
  
  const { todayActivities, isTodayActivityPending } = useTodayActivity();

  const updateFilterParams = (value) => {
    searchParams.set('last', value);
    setSearchParams(searchParams);
  };

  const { cabins, isPending: isCabinsLoading } = useCabin();

  if (
    isPending ||
    isStaysPending ||
    isTodayActivityPending ||
    isCabinsLoading
  ) {
    return <h1>Loading...</h1>;
  }

  if (isError || isStaysError) {
    return <span>Error: {error.message || staysError.message}</span>;
  }

  if (!isStaysPending && staysData) {
    console.log(todayActivities);
    // console.log(staysData.confirmedStay);
    // console.log(data.data);
    // const confirmedStay = staysData.confirmedStay;
    // console.log('Confirmed Stays:', confirmedStay);
    // // console.log(todayActivity);
  }

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => updateFilterParams('7')}>Last 7 days</button>
        <button onClick={() => updateFilterParams('30')}>Last 30 days</button>
        <button onClick={() => updateFilterParams('90')}>Last 90 days</button>
      </div>
      <DashBoardLayout
        bookings={data.data}
        stays={staysData.confirmedStay}
        cabins={cabins}
      />
    </>
  );
};

export default Dashboard;
