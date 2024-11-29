import CabinForm from '../CabinForm/CabinForm';
import './Modal.scss';

const Modal = ({ showModalHandler, cabinToEdit }) => {
  return (
    <div className="overlay">
      <div className="modal">
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
