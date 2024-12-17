import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useSearchParams } from 'react-router-dom';
import { subDays, format, isSameDay, eachDayOfInterval } from 'date-fns';


const SalesChart = ({ bookings }) => {
  const [searchParams] = useSearchParams();
  const days = Number(searchParams.get('last')) || 7;

  const startDate = subDays(new Date(), days - 1);

  const dateInterval = eachDayOfInterval({
    start: startDate,
    end: new Date(),
  });

  const data = dateInterval.map((elem) => ({
    label: format(elem, 'MMM dd'),
    totalSales: bookings
      .filter((booking) => isSameDay(elem, new Date(booking.created_at)))
      .reduce((a, c) => a + c.totalPrice, 0),
    extraSales: bookings
      .filter((booking) => isSameDay(elem, new Date(booking.created_at)))
      .reduce((a, c) => a + c.extraPrice, 0),
  }));

  // MM months in numercial
  // MMM Dec
  // MMMM December
  return (
    <>
      <h2>Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="red" />
          <XAxis
            dataKey="label"
            tick={{ fill: 'pink' }}
            tickLine={{ stroke: 'blue' }}
            // stroke="pink"
          />
          <YAxis unit={'$'} stroke="black" />
          <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke="#8884d8"
            fill="#8884d8"
            strokeWidth={2}
            name="Total Sale"
            unit={'$'}
          />
          <Area
            dataKey="extraSales"
            type="monotone"
            stroke="#a41765"
            fill="#d42a74"
            strokeWidth={2}
            name="Total Sale"
            unit={'$'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default SalesChart;
