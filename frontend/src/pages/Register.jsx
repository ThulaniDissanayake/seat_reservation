import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Intern');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password, role });
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  // Styles
  const pageStyle = {
    background: 'linear-gradient(to right, #fceabb, #f8b500)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    color: '#333',
  };

  const formStyle = {
    maxWidth: '400px',
    width: '100%',
    padding: '40px 30px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // semi-transparent white
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    animation: 'fadeIn 0.6s ease forwards',
    boxSizing: 'border-box',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#d35400',
    marginBottom: '30px',
    fontWeight: '700',
    fontSize: '2rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0 20px',
    borderRadius: '8px',
    border: '1.5px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  };

  const inputFocusStyle = {
    borderColor: '#f0a500',
    outline: 'none',
    boxShadow: '0 0 8px rgba(240, 165, 0, 0.5)',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#f0a500',
    color: '#333',
    fontWeight: '700',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#d67c00',
    transform: 'scale(1.03)',
  };

  const roleNoteStyle = {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '-15px',
    marginBottom: '20px',
    fontStyle: 'italic',
  };

  // Animation keyframes (inject via style tag)
  const fadeInKeyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  // To handle focus style dynamically
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div style={pageStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={headingStyle}>Register</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              ...inputStyle,
              ...(focusedInput === 'name' ? inputFocusStyle : {}),
            }}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              ...inputStyle,
              ...(focusedInput === 'email' ? inputFocusStyle : {}),
            }}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              ...inputStyle,
              ...(focusedInput === 'password' ? inputFocusStyle : {}),
            }}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              ...inputStyle,
              ...(focusedInput === 'role' ? inputFocusStyle : {}),
            }}
            onFocus={() => setFocusedInput('role')}
            onBlur={() => setFocusedInput(null)}
          >
            <option value="Intern">Intern</option>
            <option value="Admin">Admin</option>
          </select>

          <div style={roleNoteStyle}>
            * Select your role. Admins have additional permissions.
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
              e.currentTarget.style.transform = buttonHoverStyle.transform;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
              e.currentTarget.style.transform = 'none';
            }}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
