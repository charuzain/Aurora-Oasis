import { useTodayActivity } from '../../hooks/useTodayActivity';

const TodayActivity = () => {
  const { todayActivities, isTodayActivityPending } = useTodayActivity();

  if (isTodayActivityPending) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h2>Today</h2>
      {todayActivities.length === 0 ? (
        <p>No Activity for today</p>
      ) : (
        <section>
          {todayActivities.map((activity) => (
            <>
              {activity.status === 'unconfirmed' && <p>Arriving</p>}
              {activity.status === 'checked-in' && <p>Departing</p>}

              <div>
                <div>
                  <img
                    src={activity.guests.countryFlag}
                    alt={`Flag of ${activity.guests.nationality}`}
                    width={'25px'}
                  />
                </div>
                <p>{activity.guests.fullName}</p>
              </div>
              <p>{activity.numNights} nights</p>
              <button>
                {activity.status === 'checked-in' ? 'CHECK OUT' : 'Check In'}
              </button>
            </>
          ))}
        </section>
      )}
    </>
  );
};

export default TodayActivity;
