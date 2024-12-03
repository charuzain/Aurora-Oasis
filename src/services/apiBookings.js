import supabase from './dbConnection';

export const fetchAllBookings = async (filter) => {
  console.log('inside', filter);

  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)');

  if (filter !== 'all') {
    query = query.eq('status', filter);
  }

  const { data: bookings, error } = await query;
  console.log(bookings);
  if (error) {
    throw new Error('Bookings cant be fetched');
  }
  return bookings;
};
