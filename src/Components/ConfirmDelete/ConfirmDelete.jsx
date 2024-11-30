import { useDeleteCabinQuery } from '../../hooks/deleteCabinQuery';

const ConfirmDelete = ({ id, confirmDeleteHandler }) => {
  const mutation = useDeleteCabinQuery();

  const ModalClickHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="overlay" onClick={confirmDeleteHandler}>
      <div className="modal" onClick={ModalClickHandler}>
        <div>
          <button onClick={confirmDeleteHandler}>Close</button>
        </div>
        <h1>Are you sure you want to delete the cabin</h1>
        <p>This action cant be undone</p>
        <div>
          <button onClick={confirmDeleteHandler}>Cancel</button>
          <button
            onClick={() => {
              mutation.mutate(id);
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
