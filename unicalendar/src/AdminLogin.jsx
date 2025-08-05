import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Check admin credentials
    if (username === 'Admin' && password === 'password') {
      // Store admin session in localStorage
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-dashboard');
    } else {
      setErrorMessage('Invalid admin credentials');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      {/* The title and subtitle */}
      <h1>UniCalendar</h1>
      <h5>Administrator Login</h5>

      {/* The Admin Login form */}
      <h3>Admin Login</h3>
      <form onSubmit={handleAdminLogin}>
        {/* Error message display */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        {/* Username entry */}
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Password entry */}
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Login Button */}
        <button type="submit" style={{ padding: '8px 16px', marginRight: '10px' }}>
          Admin Login
        </button>
        
        {/* Back to regular login */}
        <button 
          type="button" 
          onClick={() => navigate('/login')}
          style={{ 
            padding: '8px 16px', 
            background: '#666', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
