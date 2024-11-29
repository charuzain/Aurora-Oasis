import { useRef } from 'react';
import CabinForm from '../CabinForm/CabinForm';
import './Modal.scss';

const Modal = ({ showModalHandler, cabinToEdit }) => {
  const ModalClickHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="overlay" onClick={showModalHandler}>
      <div className="modal" onClick={ModalClickHandler}>
        <div>
          <button onClick={showModalHandler}>Close</button>
        </div>
        <CabinForm
          showModalHandler={showModalHandler}
          cabinToEdit={cabinToEdit}
        />
      </div>
    </div>
  );
};

export default Modal;
