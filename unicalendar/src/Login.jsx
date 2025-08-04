import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// NEW: Firestore imports to fetch user role
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // MODIFIED: This function now fetches role after login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const userCred = await login(username, password); // log in via Firebase Auth

      // NEW: Fetch the user's role from Firestore
      const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
      const role = userDoc.exists() ? userDoc.data().role : 'unknown';

      console.log("Logged in as:", role); // For debugging / confirmation

      // SAME: Send user to calendar (you can later change this based on role)
      navigate('/calendar');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h1>UniCalendar</h1>
      <h5>A fantastic calendar for busy students!</h5>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
