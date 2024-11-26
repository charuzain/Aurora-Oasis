import { useForm } from 'react-hook-form';
import './CabinForm.scss';
import { useMutation } from '@tanstack/react-query';
import { AddNewCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const CabinForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AddNewCabin,
    onSuccess: () => {
      toast.success("New cabin added succesfully !")
      queryClient.invalidateQueries({queryKey:["cabins"]})
    },
    onError: () => {
      toast.error("Encounter an error while addign new cabin")
    }
  })


  const submitHandler = (data) => {
    console.log(data)
    mutation.mutate(data)
    // add cabin to db 
    // form reset
  }

  const error = formState.errors;
  const onErrors = (errors) => {
    
    console.error(errors);
    // toast.error("Encounter an error while adding new cabin")
  }
  return (
    <form onSubmit={handleSubmit(submitHandler, onErrors)}>
      <div>
        <label htmlFor="name">Cabin name</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
          })}
        />
        {error?.name && error.name.message}
      </div>
      <div>
        <label htmlFor="maxCapacity">Maximum capacity</label>
        <input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', { required: 'Max capacity is required' })}
        />
        {error?.maxCapacity && error.maxCapacity.message}
      </div>
      <div>
        <label htmlFor="regularPrice">Regular price</label>
        <input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'Regular price is required',
          })}
        />
        {error?.regularPrice && error.regularPrice.message}
      </div>
      <div>
        <label htmlFor="discount">Discount</label>
        <input
          type="number"
          id="discount"
          {...register('discount', { required: 'Discount is required' })}
        />
        {error?.discount && error.discount.message}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
        ></textarea>
        {error?.description && error.description.message}
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
};

export default CabinForm;
