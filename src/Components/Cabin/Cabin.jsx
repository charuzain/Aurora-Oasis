/* eslint-disable react/prop-types */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useModal } from '../../hooks/useModal';
import { duplicateCabinApi } from '../../services/apiCabins';
import Modal from '../Modal/Modal';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import { useConfirmDelete } from '../../hooks/UseConfirmDelete';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { IoCopy } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import './Cabin.scss';
import { useEffect, useRef } from 'react';

const Cabin = ({ cabin }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({});
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { showModal, showModalHandler } = useModal();
  const { showDeleteDialog, confirmDeleteHandler } = useConfirmDelete();

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const menuHandler = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPostition = window.innerWidth - rect.x - rect.width;
    const yPosition = rect.y + rect.height + 12;
    setPosition({ x: xPostition, y: yPosition });
    setShowMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

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
        <div className="test">
          <button ref={buttonRef} onClick={menuHandler}>
            <HiOutlineDotsVertical />
          </button>
        </div>
        {showMenu && (
          <div
            className="menu"
            ref={menuRef}
            style={{ top: position.y, right: position.x }}
          >
            <ul className="menu__list">
              <li className="menu__item">
                <button
                  className="menu__button"
                  onClick={() => {
                    closeMenu();
                    duplicateCabin.mutate({
                      name: `Duplicate ${cabin.name}`,
                      image: cabin.image,
                      maxCapacity: cabin.maxCapacity,
                      regularPrice: cabin.regularPrice,
                      discount: cabin.discount,
                    });
                  }}
                >
                  <IoCopy />
                  <span>Duplicate</span>
                </button>
              </li>
              <li className="menu__item">
                <button
                  className="menu__button"
                  onClick={() => {
                    closeMenu();
                    showModalHandler();
                  }}
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
              </li>
              <li className="menu__item">
                <button
                  className="menu__button"
                  onClick={() => {
                    closeMenu();
                    confirmDeleteHandler();
                  }}
                >
                  <MdDelete />
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </div>
        )}
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
