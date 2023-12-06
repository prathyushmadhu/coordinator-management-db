
import GetVolunteers from './getvolunteers';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import GetEvents from './GetEvents';
import { SupabaseProvider, useSupabase } from './SupabaseContext'
import Signin from './Signin';
import { UserProvider } from './UserContext';
import EventEdit from './EditEvent';
import AddEvent from './AddEvent';
import VolunteerPage from './VolunteerFirstScreen';
import AllEvents from './AllEvents';
import VolunteerChangeView from './VolunteerChangeView';
import JoinEvent from './JoinEvent';


function App() {
  return (
    <SupabaseProvider>
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/signup" element={<Login />} />
        <Route path="/events/:eventId" element={<GetVolunteers />} />
        <Route path="/getevents" element={<GetEvents />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/events/:eventId/edit" element={<EventEdit />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/volunteer/events" element={<VolunteerPage />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/view/:eventId" element={<VolunteerChangeView />} />
        <Route path="/join/:eventId" element={<JoinEvent />} />









        
      </Routes>
    </Router>
    </UserProvider>
    </SupabaseProvider>
  );
}

export default App;