const Settings = () => {
  return (
    <>
      <h1>Update hotel settings</h1>
      <form>
        <div>
          <label htmlFor="minNights">Minimum nights/booking</label>
          <input type="number" name="minNights" id="minNights" />
        </div>
        <div>
          <label htmlFor="maxNights">Maximum nights/booking</label>
          <input type="number" name="maxNights" id="maxNights" />
        </div>
        <div>
          <label htmlFor="maxGuests">Maximum guests/booking</label>
          <input type="number" name="maxGuests" id="maxGuests" />
        </div>
        <div>
          <label htmlFor="price">Breakfast price</label>
          <input type="number" name="price" id="price" />
        </div>
      </form>
    </>
  );
};

export default Settings;
