import './CabinTable.scss';
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { getCabins, deleteCabin } from '../../services/apiCabins';


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
    // isError,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: fetchCabins,
    
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      alert("Cabin deleted successfully")
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      alert(error)
      console.error('Error deleting cabin:', error);
    },
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
      {cabins.map((cabin) => (
        <div key={cabin.id} className="row">
          <img src={cabin.image} alt={cabin.name} />
          <p>{cabin.name}</p>
          <p>Fits upto {cabin.maxCapacity} guests</p>
          <p>{cabin.regularPrice}</p>
          <p>{cabin.discount}</p>
          <button onClick={() => {
            mutation.mutate(cabin.id)
          }}>Delete</button>
        </div>
      ))}

      {/* <CabinTableHeader />
      <CabinRow/> */}
    </>
  );
};

export default CabinTable;
