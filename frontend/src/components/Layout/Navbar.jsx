import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navStyle = {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontFamily: 'Arial, sans-serif',
  };

  const linkStyle = {
    color: '#f0a500',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    backgroundColor: '#f0a500',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#333',
  };

  const separator = (
    <span style={{ color: '#999', userSelect: 'none' }}>|</span>
  );

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link> {separator}
      {token ? (
        <>
          <Link to="/seats" style={linkStyle}>Seats</Link> {separator}
          <Link to="/reservations" style={linkStyle}>My Reservations</Link> {separator}

          {user?.role === 'Admin' && (
            <>
              <Link to="/admin/seats" style={linkStyle}>Admin Seats</Link> {separator}
              <Link to="/admin/manual-assign" style={linkStyle}>Manual Assign</Link> {separator}
            </>
          )}

          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={linkStyle}>Login</Link> {separator}
          <Link to="/register" style={linkStyle}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
