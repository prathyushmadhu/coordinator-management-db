import { useEffect, useState } from "react";
import { SupabaseProvider, useSupabase } from './SupabaseContext'


function GetVolunteers() {
    const { supabase } = useSupabase();
  const [volunteers, setvolunteers] = useState([]);

  useEffect(() => {
    getvolunteers();
  }, []);

  async function getvolunteers() {
    const { data } = await supabase.from("volunteers").select().filter('available','=','false');
    setvolunteers(data);
  }

  return (
    <ul>
      {volunteers.map((volunteer) => (
        <li key={volunteer.name}>{volunteer.name} - {volunteer.phno}</li>

      ))}
    </ul>
  );
}

export default GetVolunteers;