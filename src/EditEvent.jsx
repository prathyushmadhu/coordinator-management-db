import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSupabase } from './SupabaseContext';
function EventEdit (){
    
  const navigate = useNavigate();
    const {supabase} = useSupabase();
  const { eventId } = useParams();
  const [event, setEvent] = useState({
    name: '',
    date: '',
    location: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Fetch event data based on eventId
        const { data, error } = await supabase
          .from('events')
          .select('name, date, location')
          .eq('eid', eventId)
          .single();

        if (error) {
          throw error;
        }

        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleInputChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Validate date format (simple validation for demonstration)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
        setError('Invalid date format. Please use YYYY-MM-DD.');
        return;
      }

      // Save changes back to Supabase
      const { data, error } = await supabase
        .from('events')
        .update({
          name: event.name,
          date: event.date,
          location: event.location,
        })
        .eq('eid', eventId);

      if (error) {
        throw error;
      }

      console.log('Event saved successfully:', data);
      navigate("/getevents")
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };
  async function deleteEvent() {
    await supabase
        .from('volunteershift')
        .delete()
        .eq('eid', eventId);

        await supabase
        .from('events')
        .delete()
        .eq('eid', eventId);
        navigate('/getevents');

  };

  return (
    <div>
            <div>
      <button type="button" onClick={deleteEvent}>
            Delete Event
          </button>
    </div>
      <h1>Edit Event</h1>
      <form>
        <label>
          Event Name:
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EventEdit;
