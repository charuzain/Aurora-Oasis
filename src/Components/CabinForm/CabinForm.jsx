import { useForm } from 'react-hook-form';
import './CabinForm.scss';
import { useMutation } from '@tanstack/react-query';
import { AddNewCabin, editCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const CabinForm = ({ cabinToEdit = {} }) => {
  const isEditState = Boolean(cabinToEdit.id);

  const { register, handleSubmit, formState, reset, getValues } = useForm({
    defaultValues: isEditState ? cabinToEdit : {},
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: isEditState ? editCabin : AddNewCabin,
    onSuccess: () => {
      toast.success(isEditState ? 'Cabin updated succesfully' : 'New cabin added succesfully !');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const submitHandler = (data) => {
    const payload = isEditState ? { ...data, id: cabinToEdit.id } : data;

    mutation.mutate(payload);
  };

  const error = formState.errors;
  const onErrors = (errors) => {
    console.error(errors);
  };

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
          {...register('maxCapacity', {
            required: 'Max capacity is required',
          })}
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
          {...register('discount', {
            required: 'Discount is required',
            validate: (value) => {
              value <= getValues().regularPrice ||
                'Discount cant be greater than regular price';
            },
          })}
        />
        {error?.discount && <p>{error.discount.message}</p>}
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
        <label htmlFor="image">Cabin photo</label>
        <input
          type="file"
          accept="image/*"
          id="image"
          // if editing mode image is optional
          {...register('image', {
            required: isEditState ? false : 'Image is required',
          })}
        />
        {error?.image && <p>{error.image.message}</p>}
      </div>
      <div>

        <button type="reset">Cancel</button>
        <button type="submit" disabled={mutation.isPending}>
          {isEditState ? 'Edit Cabin' : 'Create New Cabin'}
        </button>
      </div>
    </form>
  );
};

export default CabinForm;
