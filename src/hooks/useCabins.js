import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";

export const useCabin = () => {

  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });
  if (error) {
    console.log(error)
    throw new Error(error)
  }
  return { isPending, cabins , error};
  
}