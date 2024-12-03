import supabase from './dbConnection';

export const fetchAllBookings = async () => {
  const { data: bookings, error } = await supabase.from('bookings').select('*, cabins(name), guests(fullName, email)');
  console.log(bookings);
  if (error) {
    throw new Error('Bookings cant be fetched');
  }
  return bookings
};
