import { useForm } from 'react-hook-form';
import { Value } from 'sass';

const Users = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const passwordInput = getValues('password');
  const onSubmit = (data) => {
    
    console.log(data);
  };

  const onErrors = (errors) => console.error(errors);
  return (
    <>
      <h1>Create a new user</h1>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Full name is required' })}
          />
          <p> {errors?.name && errors.name.message}</p>
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
          <button type='reset'>Cancel</button>
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

