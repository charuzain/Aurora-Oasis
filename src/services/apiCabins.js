import supabase from './dbConnection';

export const getCabins = async () => {
  let { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
};

export const AddNewCabin = async (newCabin) => {
  const imageName = `${Math.random()}-${newCabin.image[0].name}`;
  const imagePath = `https://mdnrxgpsinkkromefdlm.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  //  UPLOAD IMAGE TO STORAGE
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image[0]);
  if (storageError) {
    // if image cant be uplaoded delete the newly added cabin

    await supabase.from('cabins').delete().eq('id', data.id);

    throw new Error('Image cant be uplaoded');
  }

  return data;
};

export const editCabin = async (newCabin, id) => {
  const { data, error } = await supabase
    .from('cabins')
    .update({ newCabin })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be updated');
  }
  return data;
};
