import { useNavigate } from 'react-router-dom';
import { useDeleteCabinQuery } from '../../hooks/deleteCabinQuery';

const ConfirmDelete = ({ id,name, confirmDeleteHandler, onClickDelete }) => {
  // const mutation = useDeleteCabinQuery();

  const navigate = useNavigate()
  const ModalClickHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="overlay" onClick={confirmDeleteHandler}>
      <div className="modal" onClick={ModalClickHandler}>
        <div>
          <button onClick={confirmDeleteHandler}>Close</button>
        </div>
        <h1>Are you sure you want to delete the {name}</h1>
        <p>This action cant be undone</p>
        <div>
          <button onClick={confirmDeleteHandler}>Cancel</button>
          <button
            onClick={() => {
              onClickDelete(id);
              // navigate('/')
              
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
