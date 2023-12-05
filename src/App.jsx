import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://icdrntneeseblldimwux.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZHJudG5lZXNlYmxsZGltd3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4OTEyNjEsImV4cCI6MjAxNjQ2NzI2MX0.UW7Sy5VpDEbZBHgnOI4KO3SjGaG0s2YEiK3Ydfm-Xoc"
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    <div>
      
     <ul>
      {volunteers.map((volunteer) => (
        <li key={volunteer.name}>{volunteer.name} - {volunteer.phno}</li>

      ))}
    </ul>
    </div>
  );
}

export default App;