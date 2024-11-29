import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal((prev) => !prev);
  };

  return { showModal, showModalHandler };
};
