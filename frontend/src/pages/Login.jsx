import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token, { id: data.userId, role: data.role });
      navigate('/seats');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const pageStyle = {
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formStyle = {
    maxWidth: '400px',
    width: '100%',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#f0a500',
    marginBottom: '25px',
    fontWeight: '700',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0 20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f0a500',
    color: '#333',
    fontWeight: '700',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
