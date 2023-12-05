import { createClient } from '@supabase/supabase-js';

import React, { createContext, useContext } from 'react';

const SupabaseContext = createContext();

const SupabaseProvider = ({ children }) => {
  const supabase = createClient('url', 'key');

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

const useSupabase = () => {
  return useContext(SupabaseContext);
};

export { SupabaseProvider, useSupabase };