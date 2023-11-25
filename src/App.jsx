import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("<link>", "<api key>");

function App() {
  const [volunteers, setvolunteers] = useState([]);

  useEffect(() => {
    getvolunteers();
  }, []);

  async function getvolunteers() {
    const { data } = await supabase.from("volunteers").select();
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

export default App;