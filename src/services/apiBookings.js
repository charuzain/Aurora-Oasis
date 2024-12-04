import supabase from './dbConnection';
const NUM_PER_PAGE = 4;

export const fetchAllBookings = async (filter, sortQuery, pageNum) => {
  console.log('inside', filter, sortQuery);

  const [sortField, order] = sortQuery.split('-');
  // console.log(sortField, order);
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

  if (filter !== 'all') {
    query = query.eq('status', filter);
  }

  if (pageNum) {
    let startFrom = NUM_PER_PAGE * (pageNum - 1) ;
    query = query.range(startFrom, NUM_PER_PAGE * pageNum -1);
  }

  const {data:bookings , count , error} = await query.order(sortField, {
    ascending: order === 'asc',
  });
  console.log(count)
  if (error) {
    throw new Error('Bookings cant be fetched');
  }
  return { bookings, count };
};
