import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome } from 'react-icons/fa'; // 🏠 Home icon

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const baseLinkStyle = {
    marginRight: '20px',
    textDecoration: 'none',
    color: 'white',
    display: 'inline-flex',
    alignItems: 'center',
  };

  const activeLinkStyle = {
    color: '#f0a500',
    fontWeight: 'bold',
  };

  const isAdmin = user?.role === 'Admin';

  return (
    <nav
      style={{
        backgroundColor: '#333',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Left Section */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
        >
          <FaHome style={{ marginRight: '5px' }} />
          Home
        </NavLink>

        {user ? (
          <>
            {!isAdmin ? (
              <>
                <NavLink
                  to="/seats"
                  style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
                >
                  Seats
                </NavLink>
                <NavLink
                  to="/reservations"
                  style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
                >
                  My Reservations
                </NavLink>
              </>
            ) : (
              <>
                <span style={{ ...baseLinkStyle, opacity: 0.4, pointerEvents: 'none' }}>Seats</span>
                <span style={{ ...baseLinkStyle, opacity: 0.4, pointerEvents: 'none' }}>My Reservations</span>
              </>
            )}

            {isAdmin && (
              <>
                <NavLink
                  to="/admin/seats"
                  style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
                >
                  Admin Seats
                </NavLink>
                <NavLink
                  to="/admin/reports"
                  style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
                >
                  Reports
                </NavLink>
                <NavLink
                  to="/admin/reservations"
                  style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
                >
                  All Reservations
                </NavLink>
                <NavLink
                  to="/admin/manual-assign"
                  style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
                >
                  Manual Assign
                </NavLink>
              </>
            )}
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              style={({ isActive }) => (isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle)}
            >
              Register
            </NavLink>
          </>
        )}
      </div>

      {/* Right Section */}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'white', marginRight: '15px' }}>
            Welcome, {user.name} ({user.role})
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f0a500',
              border: 'none',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
