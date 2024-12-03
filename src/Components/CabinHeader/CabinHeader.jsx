import './CabinHeader.scss';
import { useSearchParams } from 'react-router-dom';
const CabinHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilterParams = (value) => {
    // setSearchParams({ discount: value });
    searchParams.set('discount', value);
    setSearchParams(searchParams);
  };

  const filterButtons = [
    {
      label: 'All',
      queryValue: 'all',
    },
    {
      label: 'No Discount',
      queryValue: 'no-discount',
    },
    {
      label: 'With Discount',
      queryValue: 'with-discount',
    },
  ];

  const filterValue =
    searchParams.get('discount') || filterButtons[0].queryValue;

  const sortHandler = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  const sortValue = searchParams.get('sortBy') || 'name-asc';

  return (
    <div>
      <h1>Cabins</h1>
      <div>
        {filterButtons.map((val) => (
          <button
            key={val.queryValue}
            style={{
              backgroundColor: filterValue === val.queryValue ? 'red' : 'gray',
            }}
            onClick={() => {
              updateFilterParams(val.queryValue);
            }}
          >
            {val.label}
          </button>
        ))}
      </div>
      <select onChange={sortHandler} value={sortValue}>
        <option value="name-asc">Sort by name (A-Z)</option>
        <option value="name-desc">Sort by name (Z-A)</option>
        <option value="regularPrice-desc">Sort by price (High to Low)</option>
        <option value="regularPrice-asc">Sort by price (Low to High)</option>
        <option value="maxCapacity-desc">Sort by capacity (High to Low)</option>
        <option value="maxCapacity-asc">Sort by capacity (Low first)</option>
      </select>
    </div>
  );
};

export default CabinHeader;
