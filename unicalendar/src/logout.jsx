import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login');
    }
    return (
        <div style={{ maxWidth: '300px', margin: "50px auto", textAlign: 'center'}}>
            <button
                onClick={handleLogout}
                style={{ width: "100%", padding: "10px", margin: "12px 0", cursor: "pointer"}}
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
