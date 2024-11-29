import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';

const AddCabin = () => {
  const { showModal, showModalHandler } = useModal();

  return (
    <div>
      <button onClick={showModalHandler}>AddCabin</button>
      {showModal && <Modal showModalHandler={showModalHandler} />}
    </div>
  );
};

export default AddCabin;
