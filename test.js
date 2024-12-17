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

const bookings = [
  {
    numGuests: 3,
    numNights: 2,
  },
  {
    numGuests: 3,
    numNights: 1,
  },
  {
    numGuests: 3,
    numNights: 21,
  },
  {
    numGuests: 3,
    numNights: 12,
  },
  {
    numGuests: 3,
    numNights: 3,
  },
  {
    numGuests: 3,
    numNights: 2,
  },
  {
    numGuests: 3,
    numNights: 5,
  },
  {
    numGuests: 3,
    numNights: 3,
  },
  {
    numGuests: 3,
    numNights: 2,
  },
  {
    numGuests: 3,
    numNights: 2,
  },
];

const newData = data.map((elem) => {
  for (let booking of bookings) {
    if (booking.numNights === 1 && elem.numNights === 1) {
      elem.value = elem.value + 1;
    }
    if (booking.numNights === 2 && elem.numNights === 2) {
      elem.value = elem.value + 1;
    }
    if (booking.numNights === 3 && elem.numNights === 3) {
      elem.value = elem.value + 1;
    }
    if (
      booking.numNights > 3 &&
      booking.numNights <= 5 &&
      elem.numNights === 4
    ) {
      elem.value = elem.value + 1;
    }
    if (
      booking.numNights > 5 &&
      booking.numNights < 8 &&
      elem.numNights === 6
    ) {
      elem.value = elem.value + 1;
    }
    if (
      booking.numNights > 8 &&
      booking.numNights < 15 &&
      elem.numNights === 8
    ) {
      elem.value = elem.value + 1;
    }
    if (
      booking.numNights > 15 &&
      booking.numNights < 21 &&
      elem.numNights === 15
    ) {
      elem.value = elem.value + 1;
    }
    if (booking.numNights >= 21 && elem.numNights === 21) {
      elem.value = elem.value + 1;
    }
  }
  return elem
});

console.log(newData);
