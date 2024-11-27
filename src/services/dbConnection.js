const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;


import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://mdnrxgpsinkkromefdlm.supabase.co';


const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
