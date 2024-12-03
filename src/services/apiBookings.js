import supabase from './dbConnection';

export const fetchAllBookings = async (filter, sortQuery) => {
  console.log('inside', filter, sortQuery);

  const [sortField, order] = sortQuery.split('-');
  console.log(sortField, order);
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)');

  if (filter !== 'all') {
    query = query.eq('status', filter);
  }

  const { data: bookings, error } = await query.order(sortField, {
    ascending: order === 'asc',
  });
  console.log(bookings);
  if (error) {
    throw new Error('Bookings cant be fetched');
  }
  return bookings;
};
