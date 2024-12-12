import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogout =  () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      //remove all the queries before logging out to remove users  from cache
      queryClient.removeQueries();
      navigate('/login');
    },
    onError: () => {
      toast.error('Logout failed. Please try again.');
    },
  });

  return {logout , isPending}
};
