// vol_first_scrn.jsx

import React from 'react';
import './VolunteerPage.css';
import { supabase } from "./supabase";
import { useEffect, useState } from "react";

const VolunteerPage = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      // Fetch events from Supabase when the component mounts
      fetchEvents();
    }, []);
  
    const fetchEvents = async () => {
      try {

        const { data, error } = await supabase.from('events').select();
  
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
  
    return (
      <div className="volunteer-page">
        <button className="join-button">Join</button>
        <table className="events-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Date</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {/* Map through the events data and render rows */}
            {events.map((event) => (
              <tr key={event.eid}>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
        <button className="delete-button">Delete</button>
      </div>
    );
  };
  
export default VolunteerPage;