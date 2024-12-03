import { useEffect, useState } from 'react';
import { fetchAllBookings } from '../../services/apiBookings';
import { useQuery } from '@tanstack/react-query';

const BookingTable = () => {
  // const getBookings = async () => {
  //   try {
  //     const result = await fetchAllBookings();
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  const { isPending, data, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchAllBookings,
  });
  if (data) {
      console.log(data);
  }

  return <div>BookingTable</div>;
};

export default BookingTable;
