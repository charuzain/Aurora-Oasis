import { useEffect } from 'react';
import { getCabins } from '../../services/apiCabins';
const Cabins = () => {

  const fetchCabin = async () => {
    const result = await getCabins();
    console.log(result)
}

  useEffect(() => {
    fetchCabin()
  }, []);

  return <div>Cabins</div>;
};

export default Cabins;
