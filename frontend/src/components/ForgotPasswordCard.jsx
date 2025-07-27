import React, { useState } from 'react';

const ForgotPasswordCard = () => {
  const [mode, setMode] = useState('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const styles = {
    page: {
      background: "linear-gradient(to right, #fceabb, #f8b500)",
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      maxWidth: '400px',
      width: '90%',
      padding: '30px',
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      color: '#000',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(255, 165, 0, 0.5)',
      backdropFilter: 'blur(8px)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#000000ff',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '14px',
      backgroundColor: '#fff',
      color: '#000',
    },
    button: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#e7aa38ff',
      color: '#1a1a1a',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '16px',
      transition: '0.3s',
    },
    message: {
      marginBottom: '15px',
      color: '#FF4500',
      textAlign: 'center',
    },
  };

  const handleSendResetLink = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setMessage('Reset link sent to your email.');
    setMode('reset');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setMessage('Please fill out both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setMessage('Your password has been reset successfully.');
    setMode('email');
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          {mode === 'email' ? 'Forgot Password' : 'Reset Password'}
        </h2>
        {message && <p style={styles.message}>{message}</p>}

        {mode === 'email' && (
          <form onSubmit={handleSendResetLink}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Send Reset Link
            </button>
          </form>
        )}

        {mode === 'reset' && (
          <form onSubmit={handleResetPassword}>
            <label style={styles.label}>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={styles.input}
            />
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordCard;
