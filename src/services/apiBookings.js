import supabase from './dbConnection';
import { NUM_PER_PAGE } from '../utils/constants';

export const fetchAllBookings = async (filter, sortQuery, pageNum) => {
  const [sortField, order] = sortQuery.split('-');
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
  console.log("-==")
  console.log("booking")
  return { bookings, count };
};

export const fetchBookingById = async (id) => {
  let { data: booking, error } = await supabase
    .from('bookings')
    .select('* , cabins(name , image) , guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Booking with id ${id} cant be fetched`);
  }
  console.log('booking ia', booking);
  console.log(error);

  return booking;
};

export const updateCheckIn = async (newValue) => {
  const { id, ...updatedValue } = newValue;
  console.log('---------');
  console.log(id, updatedValue);
  const { data, error } = await supabase
    .from('bookings')
    .update({ ...updatedValue })
    .eq('id', id)
    .select();

  console.log(data);

  if (error) {
    console.log(error);
    throw new Error('Problem checkin');
  }
  return data;
};
