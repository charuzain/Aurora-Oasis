import { useSearchParams } from 'react-router-dom';

const BookingHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilterParams = (value) => {
    searchParams.set('page', 1)
    searchParams.set('status', value);
    setSearchParams(searchParams);
  };

  const sortHandler = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  const sortValue = searchParams.get('sortBy') || 'startDate-asc';
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
        <select onChange={sortHandler} value={sortValue}>
          <option value="startDate-desc">By Date(Recent First)</option>
          <option value="startDate-asc">By Date(Earlier first)</option>
          <option value="totalPrice-desc">By Value(High first)</option>
          <option value="totalPrice-asc">By Value(low first)</option>
        </select>
      </div>
    </div>
  );
};

export default BookingHeader;
