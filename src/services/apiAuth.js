import supabase from './dbConnection';

export const loginApi = async ({ email, password }) => {
  console.log(email, password);
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  console.log(data);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  //if no session is available it means no user is currently logged in
  if (!data.session) {
    return null;
  }

  const { data: result, error } = await supabase.auth.getUser();
  console.log(result.user);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return result.user;
};

export const logoutUser = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const signUp = async ({ email, password, name }) => {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: '',
      },
    },
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
};
