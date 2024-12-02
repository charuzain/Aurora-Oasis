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

  return (
    <div>
      <h1>Cabins</h1>
      <div>
        {filterButtons.map((val) => (
          <button
            key={val.queryValue}
            onClick={() => {
              updateFilterParams(val.queryValue);
            }}
          >
            {val.label}
          </button>
        ))}

        {/* <button
          onClick={() => {
            filterHandler('all');
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            filterHandler('no-discount');
          }}
        >
          No Discount
        </button>
        <button
          onClick={() => {
            filterHandler('with-discount');
          }}
        >
          With Discount
        </button> */}
      </div>
    </div>
  );
};

export default CabinHeader;
