import './CabinTable.scss';
import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import Cabin from '../Cabin/Cabin';
import { useSearchParams } from 'react-router-dom';

const CabinTable = () => {
  const [searchParams] = useSearchParams();

  const fetchCabins = async () => {
    try {
      const result = await getCabins();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  // Queries
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: fetchCabins,
  });

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
