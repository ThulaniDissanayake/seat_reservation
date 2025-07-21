const Home = () => {
  const pageStyle = {
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const containerStyle = {
    maxWidth: '600px',
    width: '100%',
    padding: '20px',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    color: '#f0a500',
    fontSize: '2.8rem',
    marginBottom: '15px',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.6',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Seat Reservation System</h1>
        <p style={paragraphStyle}>
          Welcome! Please login or register to book your seat.
        </p>
      </div>
    </div>
  );
};

export default Home;
