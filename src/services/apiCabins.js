import supabase from './dbConnection';

export const getCabins = async () => {

  let { data: cabins, error } = await supabase.from('cabins').select('*');
  return {cabins,error}
  
};

