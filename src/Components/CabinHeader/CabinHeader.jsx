import './CabinHeader.scss';
import { useSearchParams } from 'react-router-dom';
const CabinHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('discount'));
  return (
    <div>
      <h1>Cabins</h1>
      <div>
        <button
          onClick={() => {
            setSearchParams({ discount: 'all' });
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            setSearchParams({ discount: 'no-discount' });
          }}
        >
          No Discount
        </button>
        <button
          onClick={() => {
            setSearchParams({ discount: 'with-discount' });
          }}
        >
          With Discount
        </button>
      </div>
    </div>
  );
};

export default CabinHeader;
