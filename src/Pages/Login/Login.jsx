import { useState } from 'react';
import { loginApi } from '../../services/apiAuth';
import { useLogin } from '../../hooks/useLogin';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('duck@gmail.com');
  const [password, setPassword] = useState('123456');
  const { login, isLogingIn } = useLogin();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Missing');
      return;
    }
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <h1>Login to your account</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            value={password}
          />
        </div>
        <div>
          <button type="submit" disabled={isLogingIn}>
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
