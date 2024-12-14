import supabase from './dbConnection';
import { NUM_PER_PAGE } from '../utils/constants';
import { todayDate } from '../utils/helpers';

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
  console.log('-==');
  console.log('booking');
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

export const deleteBooking = async (id) => {
  console.log(id);
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('Booking could not be deleted');
  }
  return data;
};

export const GetBookingsAfterDate = async (date) => {
  console.log(date);
  let { data, error } = await supabase
    .from('bookings')
    .select('*')
    .gte('created_at', date)
    .lte('created_at', todayDate());
  console.log(data);
  if (error) {
    console.log(error);
    throw new Error(`Data cant be fetched`);
  }
  // console.log(bookings)
  return { data, error };
};

export const GetStayAfterDate = async (date) => {
  let { data, error } = await supabase
    .from('bookings')
    .select('*')
    .gte('startDate', date)
    .lte('startDate', todayDate());

  if (error) {
    console.log(error);
    throw new Error(`Bookings cant be fetched`);
  }
  console.log(data);
  const confirmedStay = data.filter((stay) => stay.status !== 'unconfirmed');
  console.log(confirmedStay);
  return { confirmedStay, error };
};
