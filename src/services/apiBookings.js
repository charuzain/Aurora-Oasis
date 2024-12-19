import supabase from './dbConnection';
import { NUM_PER_PAGE } from '../utils/constants';
import { todayDate } from '../utils/helpers';

export const fetchAllBookings = async (filter, sortQuery, pageNum) => {
  const [sortField, order] = sortQuery.split('-');
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

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
  if (error) {
    throw new Error('Bookings cant be fetched');
  }
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
  return booking;
};

export const updateCheckIn = async (newValue) => {
  const { id, ...updatedValue } = newValue;
  const { data, error } = await supabase
    .from('bookings')
    .update({ ...updatedValue })
    .eq('id', id)
    .select();
  if (error) {
    console.log(error);
    throw new Error('Problem checkin');
  }
  return data;
};

export const deleteBooking = async (id) => {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('Booking could not be deleted');
  }
  return data;
};

export const GetBookingsAfterDate = async (date) => {
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



export const getTodayActivity = async () => {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0); 
  const today = currentDate.toISOString(); 
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, email,countryFlag,nationality)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${today}),and(status.eq.checked-in,endDate.eq.${today})`
    )
    .order('created_at');

  if (error) {
    console.log(error);
    throw new Error('Error fetching today activities');
  }

  console.log(data);

  return data;
};




export const today = async() => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)')
    .or(
      `and(startDate.eq.${today}),and(endDate.eq.${today})`).order("created_at")
  
  if (error) {
    console.log(error);
    throw new Error('Error fetching today activities');
  }

  console.log(data);

  return data;
}