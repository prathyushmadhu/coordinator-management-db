import VolFirstScreen from './vol_first_scrn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import GetEvents from './GetEvents';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/volunteer" element={<VolFirstScreen />} />
        <Route path="/coordinator" element={<GetEvents />} />
        
      </Routes>
    </Router>
  );
}

export default App;