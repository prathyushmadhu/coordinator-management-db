
import './index.css'
import { useState, useEffect } from 'react'
import { SupabaseProvider, useSupabase } from './SupabaseContext'
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
    const navigate = useNavigate();
    const { supabase } = useSupabase();
    const [eventname, seteventname] = useState('');
    const [date, setdate] = useState('');
    const [location, setlocation] = useState('');
    const {userId} = useUser();
  
    async function find_oid(){
        const { data } = await supabase.from("organisations").select('oid,name').eq('uid',userId);
        console.log(data);
        console.log('oid :',data[0].oid);
        return {
            oid : data[0].oid
        }
    }
    const handleaddevent = async () => {
      try {
        const {oid} = await find_oid();
        
        const { data, error } = await supabase.from('events').insert({ name: eventname,date: date,location:location,oid:oid});
       
        console.log(data);
        navigate('/getevents')
        
      } catch (error) {
        console.error('Error during adding event:', error.message);
      }
    };
  
    return (
      <div>
        <h2>Add Event</h2>
        <form>
          <label>eventname:</label>
          <input type="text" value={eventname} onChange={(e) => seteventname(e.target.value)} />
          <br />
          <label>date:</label>
          <input type="date" value={date} onChange={(e) => setdate(e.target.value)} />
          <br />
          <label>Location : </label>
          <input type="text" value={location} onChange={(e) => setlocation(e.target.value)} />
          <br />
        <br />
          <button type="button" onClick={handleaddevent}>
            Add
          </button>
        </form>
      </div>
    );
  };
  
  
export default AddEvent;