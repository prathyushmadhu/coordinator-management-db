import { useEffect, useState } from "react";
import { SupabaseProvider, useSupabase } from './SupabaseContext'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Table from "./Table";
import './table.css';
import { useUser } from "./UserContext";
import { useNavigate } from 'react-router-dom';

function AllEvents(){
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
    const { data } = await supabase.from('events').select();
    
     setevents(data);
  }

  async function back() {
    navigate('/');
  }
 
  return (
    <div>
    <div>
      <h2>List of Events To Volunteer</h2>
      <Table columns={columns} headings={headings} data={events} className="event-table" linkPath='/join'  />
    </div>
    <div>
        <button type="button" onClick={back}>
                Back
              </button>
        </div>
    
    </div>
  );
}

export default AllEvents;