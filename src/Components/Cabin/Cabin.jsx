/* eslint-disable react/prop-types */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useModal } from '../../hooks/useModal';
import { duplicateCabinApi } from '../../services/apiCabins';
import Modal from '../Modal/Modal';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import { useConfirmDelete } from '../../hooks/UseConfirmDelete';

const Cabin = ({ cabin }) => {
  const { showModal, showModalHandler } = useModal();
  const { showDeleteDialog, confirmDeleteHandler } = useConfirmDelete();

  const queryClient = useQueryClient();

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
          <button onClick={showModalHandler}>Edit</button>
          <button onClick={confirmDeleteHandler}>Delete</button>
        </div>
      </div>
      {showDeleteDialog && (
        <ConfirmDelete
          id={cabin.id}
          confirmDeleteHandler={confirmDeleteHandler}
        />
      )}
      {showModal && (
        <Modal showModalHandler={showModalHandler} cabinToEdit={cabin} />
      )}
    </>
  );
};

export default Cabin;
