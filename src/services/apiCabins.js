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
  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }
  return data;
};
