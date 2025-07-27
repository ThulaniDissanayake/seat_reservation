import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ForgotPasswordCard from './components/ForgotPasswordCard';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Seats from './pages/Seats';
import Reservations from './pages/Reservations';
import AdminSeats from './pages/AdminSeats';
import SeatUsageReport from './components/SeatUsageReport';
import AdminReservations from './pages/AdminReservations';
import ManualAssignSeat from './pages/ManualAssignSeat';
import Navbar from './components/Layout/Navbar';
const InternRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === 'Admin' ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
     
    <AuthProvider>
      <Router>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Intern-only routes */}
          <Route path="/seats" element={
            <InternRoute><Seats /></InternRoute>
          } />
          <Route path="/reservations" element={
            <InternRoute><Reservations /></InternRoute>
          } />

          {/* Admin-only routes */}
          <Route path="/admin/seats" element={<AdminSeats />} />
          <Route path="/admin/reports" element={<SeatUsageReport />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
          <Route path="/admin/manual-assign" element={<ManualAssignSeat />} />


          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

           <Route path="/forgot-password" element={<ForgotPasswordCard />} />

        </Routes>
     
      </Router>
    </AuthProvider>
    
  );
};

export default App;
