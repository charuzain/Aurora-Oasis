import './CabinForm.scss';

const CabinForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="">Cabin name</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">Maximum capacity</label>
        <input type="number" />
      </div>
      <div>
        <label htmlFor="">Regular price</label>
        <input type="number" />
      </div>
      <div>
        <label htmlFor="">Discount</label>
        <input type="number" />
      </div>
      <div>
        <label htmlFor="">Description</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">Cabin photo</label>
        <input type="file" />
      </div>
      <div>
        <button type="reset">Cancel</button>
        <button type='submit'>Create New Cabin</button>
      </div>
    </form>
  );
}

export default CabinForm