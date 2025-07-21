import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Seats from './pages/Seats';
import Reservations from './pages/Reservations';
import AdminSeats from './pages/AdminSeats';
import SeatUsageReport from './components/SeatUsageReport';  // <-- Import the report component
import AdminReservations from './pages/AdminReservations';
import ManualAssignSeat from './pages/ManualAssignSeat';


const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seats" element={<Seats />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/admin/seats" element={<AdminSeats />} />
        <Route path="/admin/reports" element={<SeatUsageReport />} />  {/* <-- New route */}
        <Route path="/admin/reservations" element={<AdminReservations />} />
        <Route path="/admin/manual-assign" element={<ManualAssignSeat />} />

      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
