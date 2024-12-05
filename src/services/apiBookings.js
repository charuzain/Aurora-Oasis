import supabase from './dbConnection';
// const NUM_PER_PAGE = 2;
import { NUM_PER_PAGE } from '../utils/constants';

export const fetchAllBookings = async (filter, sortQuery, pageNum) => {
  const [sortField, order] = sortQuery.split('-');
  // console.log(sortField, order);
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });
  console.log('query is ', query);

  if (filter !== 'all') {
    query = query.eq('status', filter);
  }

  if (pageNum) {
    let startFrom = NUM_PER_PAGE * (pageNum - 1);
    query = query.range(startFrom, NUM_PER_PAGE * pageNum - 1);
  }

  const {
    data: bookings,
    count,
    error,
  } = await query.order(sortField, {
    ascending: order === 'asc',
  });
  console.log(count);
  if (error) {
    throw new Error('Bookings cant be fetched');
  }
  return { bookings, count };
};

export const fetchBookingById = async (id) => {
  let { data: booking, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id).single();

  if (error) {
    throw new Error(`Booking with id ${id} cant be fetched`);
  }
  console.log('booking ia', booking);
  console.log(error)

  return booking;
};
