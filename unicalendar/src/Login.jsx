import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState(''); //Doesn't do anything right now
  const [password, setPassword] = useState(''); //Doesn't do anything right now
  const navigate = useNavigate(); //Object that handles changing web pages

  const handleLogin = (e) => { //Function that changes to the calendar view when the login button is pressed
  e.preventDefault();
  navigate('/calendar');
};

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      {/* The title and subtitle */}
      <h1>UniCalendar</h1>
      <h5>A fantastic calendar for busy students!</h5>

       {/* The Login information*/}
      <h3>Login</h3>
      <form onSubmit={handleLogin}>

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
    </div>
  );
}

export default Login;
