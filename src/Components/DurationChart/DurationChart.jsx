import React from 'react';
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const DurationChart = ({ bookings, stays }) => {
  const data = [
    { duration: '1 Night', value: 0, color: 'red', numNights: 1 },
    { duration: '2 Nighst', value: 0, color: 'green', numNights: 2 },
    { duration: '3 Nights', value: 0, color: 'magenta', numNights: 3 },
    { duration: '4-5 Nights', value: 0, color: 'white', numNights: 4 },
    { duration: '6-7 Nights', value: 0, color: 'yellow', numNights: 6 },
    { duration: '8-14 Nights', value: 0, color: 'orange', numNights: 8 },
    { duration: '15-21 Nights', value: 0, color: 'aqua', numNights: 15 },
    { duration: '21+ Nights', value: 0, color: 'black', numNights: 21 },
  ];

  const newData = data
    .map((elem) => {
      for (let stay of stays) {
        if (stay.numNights === 1 && elem.numNights === 1) {
          elem.value = elem.value + 1;
        }
        if (stay.numNights === 2 && elem.numNights === 2) {
          elem.value = elem.value + 1;
        }
        if (stay.numNights === 3 && elem.numNights === 3) {
          elem.value = elem.value + 1;
        }
        if (stay.numNights > 3 && stay.numNights <= 5 && elem.numNights === 4) {
          elem.value = elem.value + 1;
        }
        if (stay.numNights > 5 && stay.numNights < 8 && elem.numNights === 6) {
          elem.value = elem.value + 1;
        }
        if (stay.numNights > 8 && stay.numNights < 15 && elem.numNights === 8) {
          elem.value = elem.value + 1;
        }
        if (
          stay.numNights > 15 &&
          stay.numNights < 21 &&
          elem.numNights === 15
        ) {
          elem.value = elem.value + 1;
        }
        if (stay.numNights >= 21 && elem.numNights === 21) {
          elem.value = elem.value + 1;
        }
      }
      return elem;
    })
    .filter((stay) => stay.value !== 0);

  console.log(stays);

  return (
    <div style={{ width: '50%' }}>
      <h2>Stay duration summary</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={newData}
            dataKey="value"
            nameKey="duration"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            cx="40%"
            cy="50%"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Legend
            align="right"
            width="30%"
            verticalAlign="middle"
            iconType="circle"
            iconSize="8"
            layout="vertical"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DurationChart;
