import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookingDetails } from '../../hooks/useBookingDetails';
import { HiMiniArrowLongLeft, HiMiniHomeModern } from 'react-icons/hi2';

const CheckIn = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [breakfastCheck, setBreakfastCheck] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { data: booking, isPending, isError } = useBookingDetails(bookingId);

  if (isPending) {
    return <h1>Loading</h1>;
  }
  // console.log(booking);

  const totalPrice =
    booking.cabinPrice * booking.numNights + booking.extraPrice;
  const breakfastHandler = () => {
    setBreakfastCheck((prev) => !prev);
    if (confirm) {
      setConfirm(false);
    }
  };

  const showBrekfastOption = booking.isPaid && booking.hasBreakfast;
  return (
    <>
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Check in booking #{booking.id}</h1>

        <div>
          .
          <button onClick={() => navigate(-1)}>
            <HiMiniArrowLongLeft />
            <span>Back</span>
          </button>
        </div>
      </section>
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>
            <HiMiniHomeModern />
          </span>
          <p>
            {booking.numNights} nights in cabin {booking.cabins.name}
          </p>
        </div>
        <div>
          <span>
            {booking.startDate} - {booking.endDate}
          </span>
        </div>
      </section>

      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div>
            <img
              src={booking.cabins.image}
              alt={booking.cabins.name}
              style={{ width: '50px' }}
            />
          </div>

          <div>
            <p>Remarks</p>
            <p>{booking.observations}</p>
          </div>
          <div>
            <p>Breakfast Included</p>
            <p>{booking.hasBreakfast ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div>
          <div>
            <p>Full Name</p>
            <p>{booking.guests.fullName}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{booking.guests.email}</p>
          </div>
          <div>
            <p>ID | Country</p>
            <p>
              {booking.guests.nationalId} | {booking.guests.nationality}
            </p>
          </div>
          <div>
            <p>ID </p>
            <p>{booking.guests.nationality}</p>
          </div>
        </div>
      </section>

      <div>
        Total Price ${totalPrice}{' '}
        {booking.isPaid ? 'Paid' : 'Will Pay at property '}
      </div>

      <div>Booked {booking.created_at}</div>
      {/* checkbox */}
      <section>
        {/* If customer has already paid and had breakfast included , dont show the option to include breakfast and check confirm button by default */}
        {!showBrekfastOption && (
          <div>
            <input
              type="checkbox"
              id="breakfast"
              value={breakfastCheck}
              onChange={breakfastHandler}
              checked={breakfastCheck}
            />
            <label htmlFor="breakfast">Want to add breakfast for $60.00?</label>
          </div>
        )}

        <div>
          <input
            type="checkbox"
            id="confirm"
            value={confirm}
            onChange={() => setConfirm((prev) => !prev)}
            disabled={confirm}
            checked={booking.isPaid || confirm}
          />
          <label htmlFor="confirm">
            I confirm that {booking.guests.fullName} has paid the total amount
            of $
            {breakfastCheck
              ? `${totalPrice + 60} ($${totalPrice} + $ 60)`
              : 1000}
          </label>
        </div>
      </section>
      {/* Buttons */}
      <section>
        <button
          onClick={() => navigate(`/checkin/${booking.id}`)}
          disabled={!confirm}
        >
          Check In booking #{booking.id}
        </button>
        <button onClick={() => navigate(-1)}>Back</button>
      </section>
    </>
  );
};

export default CheckIn;
