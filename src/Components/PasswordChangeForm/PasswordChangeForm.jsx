import React, { useState } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const PasswordChangeForm = () => {
  const { user, isLoading, isError } = useCurrentUser();
    const [password, setPassword] = useState('');
 const PasswordSubmitHandler = (e) => {
   e.preventDefault();
 };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };


  return (
    <>
      <section>
        <h2>Update password</h2>
        <form onSubmit={PasswordSubmitHandler}>
          <div>
            <label htmlFor="password">New password (min 8 chars)</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={passwordChangeHandler}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm password </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
          
            />
          </div>
          <div>
            <button type="reset">Cancel</button>
            <button >Update Password</button>
          </div>
        </form>
      </section>

    </>
  );
};

export default PasswordChangeForm;
