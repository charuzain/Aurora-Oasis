import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Value } from 'sass';
import { signUp } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  
  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    mutationKey: ['email', 'password'],
    onSuccess: (data) => {
      console.log(data);
      toast.success('User created succesfully');
      navigate('/');
    },
    onError: () => {
      toast.error('There was an error creating new user');
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, fullName } = data;
    mutate(
      { email, password, fullName },
      {
        onSettled: () => reset(),
      }
    );
  };

  const onErrors = (errors) => console.error(errors);

  if (isPending) {
    return <h1>Creating user</h1>;
  }
  return (
    <>
      <h1>Create a new user</h1>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            {...register('fullName', { required: 'Full name is required' })}
          />
          <p> {errors?.fullName && errors.fullName.message}</p>
        </div>

        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
            })}
          />
          <p> {errors?.email && errors.email.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password (min 8 characters)</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'password is required',
              minLength: {
                value: 8,
                message: 'Password must have atleast 8 characters',
              },
            })}
          />
          <p> {errors?.password && errors.password.message}</p>
        </div>

        <div>
          <label htmlFor="confirmPassword">Repeat password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('repeatPassword', {
              required: 'This field is required',
              validate: (value) => {
                const password = getValues('password');
                return value === password || 'Password should match';
              },
            })}
          />
          <p> {errors?.repeatPassword && errors.repeatPassword.message}</p>
        </div>

        <div>
          <button type="reset">Cancel</button>
          <button>Create new user</button>
        </div>
      </form>
    </>
  );
};

export default Users;
// https://dev.to/m0nm/form-validation-with-useform-hook-1p33
// getValues
// This is a helper function that allow us to get the value of our inputs, so there is no need to useState them.

// https://blog.logrocket.com/react-hook-form-complete-guide/
// The handleSubmit method can handle two functions as arguments. The first function passed as an argument will be invoked along with the registered field values when the form validation is successful. The second function is called with errors when the validation fails:
