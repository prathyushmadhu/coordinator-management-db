import { useEffect, useState } from "react";
import { SupabaseProvider, useSupabase } from './SupabaseContext'
import { useUser } from "./UserContext";
import Table from "./Table";
import { useNavigate, useParams } from 'react-router-dom'; 

function GetVolunteers() {
  const navigate = useNavigate();
  const {userId} = useUser();
  const { eventId } = useParams();
  
  const { supabase } = useSupabase();
  const [volunteers, setvolunteers] = useState([]);
  const columns = ['name','phno']; // Specify the keys for your data objects
  const headings = ['Name','Number']; // Specify the headings for the table


  useEffect(() => {
    getvolunteers();
  }, []);

  async function getvolunteers() {
    const { data } = await supabase.from("volunteers").select('name,phno,volunteershifts!inner(vid,events!inner(eid))').eq('volunteershifts.events.eid',eventId);
    console.log(data);
    setvolunteers(data);
  }
  async function editEvent() {
    navigate('/events/'+eventId+'/edit')
  }
  async function goback() {
    navigate('/getevents')
  }


  return (
    <div>
  
    <div>
      <button type="button" onClick={editEvent}>
            Edit Event
          </button>
    </div>
    <div>
      <h2>List of Volunteers</h2>
      <Table columns={columns} headings={headings} data={volunteers} className="event-table" linkPath='' />
    </div>
    <div>
      <button type="button" onClick={goback}>
            Go Back
          </button>
    </div>
    </div>
  );
}

export default GetVolunteers;