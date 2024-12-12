import { useState } from 'react';
import { updateUser } from '../../services/apiAuth';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import PasswordChangeForm from '../../Components/PasswordChangeForm/PasswordChangeForm';

const UserAccount = () => {
  const { user, isLoading, isError } = useCurrentUser();
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState(null);




  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      // queryClient.setQueryData(['users'], user);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('user updated');
    },
    onError: () => {
      toast.error('cant update user');
    },
  });

  const currentUser = user.email;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!fullName) {
      return;
    }
    mutate({ fullName, avatar });
  };

 
  const nameChangeHandler = (e) => {
    // console.log(e.target);
    setFullName(e.target.value);
  };

  const avatarChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  
  return (
    <>
      <h1>Update your account</h1>
      {/* form1 */}
      <section>
        <h2>Update user data</h2>
        <form onSubmit={formSubmitHandler}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={currentUser}
              disabled
            />
          </div>

          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={fullName}
              onChange={nameChangeHandler}
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="image">Avatar Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={avatarChangeHandler}
              accept="image/*"
            />
          </div>

          <div>
            <button type="reset">Cancel</button>
            <button disabled={isPending}>Update Account</button>
          </div>
        </form>
      </section>
      {/* form2 */}
      <PasswordChangeForm/>

    </>
  );
};

export default UserAccount;
