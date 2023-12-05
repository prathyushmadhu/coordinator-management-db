import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Table from "./Table";
import './table.css';

function GetEvents(){
    const id = 101;
    const columns = ['name', 'date','location','oid','uid']; // Specify the keys for your data objects
  const headings = ['Name','Date', 'Location','OrgID','UserID']; // Specify the headings for the table

  const [events, setevents] = useState([]);

  useEffect(() => {
    getevents();
  }, []);

  async function getevents() {
    const { data } = await supabase.from("events").select('name,date,location,oid,organisations(oid)');
    


    
    setevents(data);
  }

  return (
    <div>
      <h2>List of Events</h2>
      <Table columns={columns} headings={headings} data={events} className="event-table" />
    </div>
  );
}

export default GetEvents;