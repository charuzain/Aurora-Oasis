import { useState } from 'react';

export const useConfirmDelete = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const confirmDeleteHandler = () => {
    setShowDeleteDialog((prev) => !prev);
  };

  return { showDeleteDialog, confirmDeleteHandler };
};
