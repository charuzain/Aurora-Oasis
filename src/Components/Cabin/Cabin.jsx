/* eslint-disable react/prop-types */
import { useState } from 'react';
import CabinForm from '../CabinForm/CabinForm';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';

const Cabin = ({ cabin }) => {
  const [showForm, setShowForm] = useState(false);
  const editClickHandler = () => {
    setShowForm(!showForm);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success('Cabin deleted successfully');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error('Error deleting cabin:', error);
    },
  });
  return (
    <>
        <div className="row">
          <img src={cabin.image} alt={cabin.name} />
          <p>{cabin.name}</p>
          <p>Fits upto {cabin.maxCapacity} guests</p>
          <p>{cabin.regularPrice}</p>
          <p>{cabin.discount}</p>
          <div>
            <button onClick={editClickHandler}>Edit</button>
            <button
              onClick={() => {
                mutation.mutate(cabin.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        {showForm && <CabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default Cabin;
