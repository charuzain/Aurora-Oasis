import { useSearchParams } from 'react-router-dom';
import { useCabin } from '../../hooks/useCabins';
import './CabinTable.scss';
import Cabin from '../Cabin/Cabin';

const CabinTable = () => {
  const [searchParams] = useSearchParams();
  const { isPending, cabins , error} = useCabin()

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const filter = searchParams.get('discount');

  let filteredValue = cabins;
  if (filter === 'all') {
    filteredValue = cabins;
  }
  if (filter === 'with-discount') {
    filteredValue = cabins.filter((cabin) => cabin.discount > 0);
  }

  if (filter === 'no-discount') {
    filteredValue = cabins.filter((cabin) => cabin.discount === 0);
  }

  const sortQuery = searchParams.get('sortBy') || 'name-asc';
  const [field, order] = sortQuery.split('-');
  const sortedCabin = filteredValue.sort((a, b) => {
    if (typeof a[field] === 'string') {
      return order === 'asc'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    } else {
      if (order === 'desc') {
        return b[field] - a[field];
      } else {
        return a[field] - b[field];
      }
    }
  });
  return (
    <>
      <div className="header">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </div>
      {sortedCabin.map((cabin) => (
        <Cabin key={cabin.id} cabin={cabin} />
      ))}
    </>
  );
};

export default CabinTable;
