import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient("supabaseUrl", "supabaseAnonKey");

function App() {
  const [volunteers, setvolunteers] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getvolunteers() {
    const { data } = await supabase.from("volunteers").select();
    setCountries(data);
  }

  return (
    <ul>
      {volunteers.map((volunteer) => (
        <li key={volunteer.name}>{volunteer.name} - {volunteer.phno}</li>

      ))}
    </ul>
  );
}

export default App;