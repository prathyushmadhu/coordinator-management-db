import React from 'react';
import './VolunteerPage.css';
import { useSupabase } from './SupabaseContext';
import { useEffect, useState } from "react";
import { useUser } from './UserContext';
import Table from './Table';
import { useNavigate } from 'react-router-dom';


function VolunteerPage() {
    const navigate = useNavigate();
    const {userId} = useUser();
    const {supabase} = useSupabase();
    const [events, setEvents] = useState([]);
    
    const columns = ['name','date','location']; // Specify the keys for your data objects
  const headings = ['Name','Date', 'Location'];
  
    useEffect(() => {
      // Fetch events from Supabase when the component mounts
      fetchEvents();
    }, []);
  
    async function fetchEvents(){
      try {

        const { data, error } = await supabase.from('events').select('eid,name,location,date,volunteershifts!inner(eid,volunteers!inner(vid))').eq('volunteershifts.volunteers.uid',userId);
  
        if (error) {
          console.error('Error fetching events:', error.message);
          return;
        }
  
        // Set the fetched events in the state
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }

    };
    function volEvent(){
        navigate('/allevents');
    }
    async function handleaevent() {
        navigate('/signin');
      }
    
  
    return (
        <div>
        <div>
        <button type="button" onClick={volEvent}>
                Join as Volunteer for another event
              </button>
        </div>
        <div>
          <h2>List of Volunteering Events</h2>
          <Table columns={columns} headings={headings} data={events} className="event-table" linkPath='/view'  />
        </div>
        <div>
    <button type="button" onClick={handleaevent}>
            Logout
          </button>
    </div>
        </div>
    );
  };
  
export default VolunteerPage;