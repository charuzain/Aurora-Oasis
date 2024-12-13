import { useState } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import PasswordChangeForm from '../../Components/PasswordChangeForm/PasswordChangeForm';

const UserAccount = () => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const { user } = useCurrentUser();
  const { editUserInfo, isPending } = useUpdateUser();

  const currentUser = user.email;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!fullName) {
      return;
    }
    editUserInfo({ fullName, avatar });
      setFullName('');
      setAvatar(null);
  };

  const nameChangeHandler = (e) => {
    setFullName(e.target.value);
  };

  const avatarChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  return (
    <>
      <h1>Update your account</h1>
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
      <PasswordChangeForm />
    </>
  );
};

export default UserAccount;
