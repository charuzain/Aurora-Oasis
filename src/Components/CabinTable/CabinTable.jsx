import './CabinTable.scss';
import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

const CabinTable = () => {
  const fetchCabins = async () => {
    try {
      const result = await getCabins();
      return result;
    } catch (error) {
      console.log(error)
      throw error
    }
    
  };
  // Queries
  const {
    isPending,
    // isError,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: fetchCabins,
  });
  
  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  console.log(cabins[0]);
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
      <div>
        {cabins.map((cabin) => (
          <div key={cabin.id}>
            <div>
              <img src={cabin.image} alt={cabin.name} width={'95px'} />
            </div>
            <p>{cabin.name}</p>
            <p>{cabin.maxCapacity}</p>
            <p>{cabin.regularPrice}</p>
            <p>{cabin.discount}</p>
          </div>
        ))}
      </div>

      {/* <CabinTableHeader />
      <CabinRow/> */}
    </>
  );
};

export default CabinTable;
