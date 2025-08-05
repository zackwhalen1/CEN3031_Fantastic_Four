import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const [username, setUsername] = useState(''); //Doesn't do anything right now
  const [password, setPassword] = useState(''); //Doesn't do anything right now
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); //Object that handles changing web pages
  const { login } = useAuth();

  const handleLogin = (e) => { //Function that changes to the calendar view when the login button is pressed
  e.preventDefault();
  setErrorMessage('');
  login(username, password)
    .then(() => { navigate('/calendar'); })
    .catch(error => setErrorMessage(error.message));
};

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      {/* The title and subtitle */}
      <h1>UniCalendar</h1>
      <h5>A fantastic calendar for busy students!</h5>

       {/* The Login information*/}
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        {/* Error message display */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {/* Username entry */}
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Password entry */}
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* The submit button*/}
        <button type="submit" style={{ padding: '8px 16px' }}>
          Login
        </button>

      </form>
      
      {/* Administrator Login Button */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => navigate('/admin-login')}
          style={{ 
            padding: '8px 16px',
            background: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Administrator Login
        </button>
      </div>
    </div>
  );
}

export default Login;
