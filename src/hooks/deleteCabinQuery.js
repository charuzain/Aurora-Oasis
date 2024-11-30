import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin } from '../services/apiCabins';

export const useDeleteCabinQuery = () => {
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

  return mutation;
};
