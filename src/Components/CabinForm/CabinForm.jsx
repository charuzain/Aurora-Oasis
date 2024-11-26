import { useForm } from 'react-hook-form';
import './CabinForm.scss';

const CabinForm = () => {
  const { register, handleSubmit } = useForm()
  const submitHandler = data => console.log(data)
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label htmlFor="name">Cabin name</label>
        <input type="text" id="name" {...register('name')} />
      </div>
      <div>
        <label htmlFor="maxCapacity">Maximum capacity</label>
        <input type="number" id="maxCapacity" {...register('maxCapacity')} />
      </div>
      <div>
        <label htmlFor="regularPrice">Regular price</label>
        <input type="number" id="regularPrice" {...register('regularPrice')} />
      </div>
      <div>
        <label htmlFor="discount">Discount</label>
        <input type="number" id="discount" {...register('discount')} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')}></textarea>
      </div>
      <div>
        <label htmlFor="">Cabin photo</label>
        <input type="file" />
      </div>
      <div>
        <button type="reset">Cancel</button>
        <button type="submit">Create New Cabin</button>
      </div>
    </form>
  );
}

export default CabinForm