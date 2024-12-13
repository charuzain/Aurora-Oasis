import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../../hooks/useUpdateUser';

const PasswordChangeForm = () => {
  const { editUserInfo, isPending } = useUpdateUser();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const PasswordSubmitHandler = ({ password }) => {
    editUserInfo({ password });
    reset();
  };

  return (
      <section>
        <h2>Update password</h2>
        <form onSubmit={handleSubmit(PasswordSubmitHandler)}>
          <div>
            <label htmlFor="password">New password (min 8 chars)</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have atleast 8 characters',
                },
              })}
              disabled={isPending}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm password </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'confirm password field is required',
                validate: (value) => {
                  const password = getValues('password');
                  return value === password || 'Password should match';
                },
              })}
              disabled={isPending}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <button type="reset" disabled={isPending}>
              Cancel
            </button>
            <button disabled={isPending}>Update Password</button>
          </div>
        </form>
      </section>
  );
};

export default PasswordChangeForm;
