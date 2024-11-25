import { useEffect } from 'react';
import { getCabins } from '../../services/apiCabins';
import CabinHeader from '../../Components/CabinHeader/CabinHeader';
import CabinTable from '../../Components/CabinTable/CabinTable';
import AddCabin from '../../Components/AddCabin/AddCabin';
const Cabins = () => {

//   const fetchCabin = async () => {
//     const result = await getCabins();
//     console.log(result)
// }

//   useEffect(() => {
//     fetchCabin()
//   }, []);

  return <>
    <CabinHeader/>
    <CabinTable />
    <AddCabin/>
  </>;
};

export default Cabins;
