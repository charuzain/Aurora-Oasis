import { useCheckIn } from '../../hooks/useCheckIn';
import { useTodayActivity } from '../../hooks/useTodayActivity';
import { Link } from 'react-router-dom';

const TodayActivity = () => {
  const { todayActivities, isTodayActivityPending } = useTodayActivity();
  const mutation = useCheckIn();

  if (isTodayActivityPending) {
    return <p>Loading...</p>;
  }

  console.log(todayActivities);
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
              {activity.status === 'checked-in' && (
                <button
                  onClick={() => {
                    mutation.mutate({
                      id: activity.id,
                      status: 'checked-out',
                    });
                  }}
                >
                  CHECK OUT
                </button>
              )}

              {activity.status === 'unconfirmed' && (
                <Link to={`/checkin/${activity.id}`}>Check In</Link>
              )}
            </>
          ))}
        </section>
      )}
    </>
  );
};

export default TodayActivity;
