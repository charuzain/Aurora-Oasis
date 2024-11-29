/* eslint-disable react/prop-types */
import { useState } from 'react';
import CabinForm from '../CabinForm/CabinForm';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {deleteCabin, duplicateCabinApi } from '../../services/apiCabins';

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
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error('Error deleting cabin:', error);
    },
  });

  const duplicateCabin = useMutation({
    mutationFn: duplicateCabinApi,
    onSuccess: () => {
      toast.success('Cabin duplicated successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error('Error duplicating cabin:', error);
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
          <button
            onClick={() => {
              duplicateCabin.mutate({
                name: `Duplicate ${cabin.name}`,
                image: cabin.image,
                maxCapacity: cabin.maxCapacity,
                regularPrice: cabin.regularPrice,
                discount: cabin.discount,
              });
            }}
          >
            Duplicate
          </button>
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
