import { useEffect, useState } from "react";
import { SupabaseProvider, useSupabase } from './SupabaseContext'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Table from "./Table";
import './table.css';
import { useUser } from "./UserContext";
import { useNavigate } from 'react-router-dom';

function GetEvents(){
    const { supabase } = useSupabase();
    const navigate = useNavigate();
    const {userId} = useUser();
    const columns = ['name', 'date','location']; // Specify the keys for your data objects
  const headings = ['Name','Date', 'Location']; // Specify the headings for the table

  const [events, setevents] = useState([]);

  useEffect(() => {
    getevents();
  }, []);

  async function getevents() {
    console.log(userId);
    const { data } = await supabase.from('events').select('eid,name,location,date,organisations!inner(oid)').eq('organisations.uid',userId);
    
     setevents(data);
  }
  async function addEvent() {
    navigate('/addevent')
  }
  async function backtosignin() {
    navigate('/signin')
  }

  return (
    <div>
    <div>
    <button type="button" onClick={addEvent}>
            Add event
          </button>
    </div>
    <div>
      <h2>List of Events You Added</h2>
      <Table columns={columns} headings={headings} data={events} className="event-table" linkPath='/events'  />
    </div>
    <div>
            <button type="button" onClick={backtosignin} >
                Logout
            </button>
        </div>
    </div>
  );
}

export default GetEvents;