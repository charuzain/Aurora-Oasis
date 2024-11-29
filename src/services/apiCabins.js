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

export const duplicateCabinApi = async (cabin) => {
  const { data, error } = await supabase
    .from('cabins')
    .insert([cabin])
    .select();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }
  console.log('hi');
  console.log(data);
  return data;
};

export const editCabin = async (newCabin) => {
  const supabaseUrl =
    'https://mdnrxgpsinkkromefdlm.supabase.co/storage/v1/object/public/cabin-images';
  const { id, ...newCabinData } = newCabin;
  let imagePath;

  if (
    typeof newCabin.image === 'string' &&
    newCabin.image.startsWith(supabaseUrl)
  ) {
    imagePath = newCabin.image;
  } else if (typeof newCabin.image === 'object' && newCabin.image[0]?.name) {
    const imageName = `${Math.random()}-${newCabin.image[0].name}`;
    imagePath = `${supabaseUrl}/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image[0]);
    if (storageError) {
      throw new Error('Image cant be uplaoded');
    }
  }

  const { data, error } = await supabase
    .from('cabins')
    .update({ ...newCabinData, image: imagePath })
    .eq('id', id)
    .select();
  if (error) {
    throw new Error('Cabin cant be updated');
  }
  return data;
};
