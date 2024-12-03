import { useSearchParams } from 'react-router-dom';

const BookingHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilterParams = (value) => {
    searchParams.set('status', value);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <h1>Bookings</h1>
      <div>
        <button onClick={() => updateFilterParams('all')}>All</button>
        <button onClick={() => updateFilterParams('checked-out')}>
          Checked Out
        </button>
        <button onClick={() => updateFilterParams('checked-in')}>
          Checked In
        </button>
        <button onClick={() => updateFilterParams('unconfirmed')}>
          Unconfirmed
        </button>
      </div>
      <div>
        <select name="" id="">
          <option value="">By Date</option>
          <option value="">By Date</option>
          <option value="">By Value</option>
          <option value="">By Value</option>
        </select>
      </div>
    </div>
  );
};

export default BookingHeader;
