import { useQuery } from "@tanstack/react-query";
import { GetStayAfterDate } from "../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { startDate } from "../utils/helpers";

export const useStayAfterDate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryDays = searchParams.get('last')
    ? Number(searchParams.get('last'))
    : 90;
  const date = startDate(queryDays);
 const {
    isPending: isStaysPending,
    isError: isStaysError,
    data: staysData,
    error: staysError,
  } = useQuery({
    queryKey: ['stays', queryDays],
    queryFn: () => GetStayAfterDate(date),
  });

  return {
    isStaysPending,
    isStaysError,
    staysData,
    staysError,
  };
 
}