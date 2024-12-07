import supabase from './dbConnection';

export const loginApi = async ({ email, password }) => {
  console.log(email , password)
let { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
});

  if (error) {
    console.log(error);
    throw new Error(error.message)
  }

  console.log(data)
  return data
};
