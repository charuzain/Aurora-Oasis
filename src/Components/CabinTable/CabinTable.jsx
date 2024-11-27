import './CabinTable.scss';
import {useQuery} from '@tanstack/react-query';
import { getCabins} from '../../services/apiCabins';
import Cabin from '../Cabin/Cabin';


const CabinTable = () => {
 
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
      {cabins.map((cabin) => <Cabin key={cabin.id} cabin={cabin} />)}
    </>
  );
};

export default CabinTable;
