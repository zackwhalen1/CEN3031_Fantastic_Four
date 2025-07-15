import React, { useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorMessage] = useState("");
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        try {
            await signup(email, password);
            navigate('/calendar');
            // navigate("/login");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }
    return (
        <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
            {/* The Page title and subtitle */}
            <h1>UniCalendar</h1>
            <h5> Create your account below</h5>
            {/* The Sign Up information */}
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                {/* Email entry */}
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type ="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                {/* Password entry */}
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                {/* Submit button */}
                <button type="submit" style={{ padding: "8px 16px"}}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;