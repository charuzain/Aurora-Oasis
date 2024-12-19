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
  console.log('request logout');
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const signUp = async ({ email, password, fullName }) => {
  const { data: savedSessionData } = await supabase.auth.getSession();
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  //If there was a previously authenticated user, restore their session
  // This action should be placed right after signUp, otherwise the authError will stop the restore
  if (savedSessionData) {
    await supabase.auth.setSession(savedSessionData.session);
  }

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
};

export const updateUser = async ({ fullName, avatar, password }) => {
  console.log(password);
  let updatedData;
  // if password or full name update the user
  if (password) {
    console.log(password);
    updatedData = { password };
  }
  if (fullName) {
    // Supabase uses data for updating user metadata.
    updatedData = {
      data: {
        fullName,
      },
    };
  }

  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  console.log(data);

  // if no image return
  if (!avatar) {
    return data;
  }
  // if image , create file name , upload the image to storage
  let avatarName = `avatar-${data.user.id}-${Math.random()}`;

  const { data: uploadData, error: upLoadError } = await supabase.storage
    .from('avatars')
    .upload(avatarName, avatar);

  if (upLoadError) {
    console.log(upLoadError);
    throw new Error(upLoadError.message);
  }

  let filePath = `https://mdnrxgpsinkkromefdlm.supabase.co/storage/v1/object/public/avatars/${avatarName}`;

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: filePath,
      },
    });

  if (updateError) {
    console.log(error);
    throw new Error(updateError.message);
  }
  return updateUser;
};
