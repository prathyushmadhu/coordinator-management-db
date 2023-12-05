
import GetVolunteers from './getvolunteers';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import GetEvents from './GetEvents';
import { SupabaseProvider, useSupabase } from './SupabaseContext'


function App() {
  return (
    <SupabaseProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/volunteer" element={<GetVolunteers />} />
        <Route path="/coordinator" element={<GetEvents />} />
        
      </Routes>
    </Router>
    </SupabaseProvider>
  );
}

export default App;