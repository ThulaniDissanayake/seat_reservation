import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const pageStyle = {
    background: 'linear-gradient(to right, #fceabb, #f8b500)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const contentWrapperStyle = {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '60px',
    paddingBottom: '40px',
  };

  const containerStyle = {
    maxWidth: '500px',
    width: '100%',
    padding: '40px 30px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '20px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    marginTop: '-40px',
  };

  const headingStyle = {
    color: '#d35400',
    fontSize: '2.8rem',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const subheadingStyle = {
    color: '#2c3e50',
    fontSize: '1.4rem',
    marginBottom: '20px',
    fontWeight: '500',
  };

  const paragraphStyle = {
    fontSize: '1.1rem',
    color: '#444',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '12px 20px',
    fontSize: '1rem',
    margin: '10px 0',
    border: 'none',
    borderRadius: '10px',
    width: '100%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f39c12',
    color: '#fff',
  };

  const registerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2c3e50',
    color: '#fff',
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = 'scale(1.03)';
    e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = 'none';
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '15px 0',
    fontSize: '0.9rem',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(8px)',
  };

  return (
    <div style={pageStyle}>
      <div style={contentWrapperStyle}>
        <div style={containerStyle}>
          <h1 style={headingStyle}>InternDesk</h1>
          <h4 style={subheadingStyle}>Seat Reservation System</h4>
          <p style={paragraphStyle}>
            Reserve your seat with ease. Login or register to continue.
          </p>

          <button
            style={loginButtonStyle}
            onClick={() => navigate('/login')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaSignInAlt />
            Login to System
          </button>

          <button
            style={registerButtonStyle}
            onClick={() => navigate('/register')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaUserPlus />
            Register New Account
          </button>
        </div>
      </div>

      <footer style={footerStyle}>
        &copy; {new Date().getFullYear()} Seat Reservation System | All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
