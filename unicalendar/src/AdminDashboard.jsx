import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  
  // Dummy user data
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Student', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Faculty', joinDate: '2023-08-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Student', joinDate: '2024-02-10' },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Staff', joinDate: '2023-12-05' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'Student', joinDate: '2024-03-01' },
    { id: 6, name: 'Diana Davis', email: 'diana.davis@example.com', role: 'Faculty', joinDate: '2023-09-15' },
    { id: 7, name: 'Erik Miller', email: 'erik.miller@example.com', role: 'Student', joinDate: '2024-01-28' },
    { id: 8, name: 'Fiona Garcia', email: 'fiona.garcia@example.com', role: 'Staff', joinDate: '2023-11-12' }
  ]);

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '15px',
        background: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* User Management Section */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          background: '#4CAF50', 
          color: 'white',
          padding: '15px',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          User Management ({users.length} total users)
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Join Date</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} style={{ 
                borderBottom: '1px solid #eee',
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9'
              }}>
                <td style={{ padding: '12px' }}>{user.id}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{user.name}</td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: 
                      user.role === 'Faculty' ? '#2196F3' :
                      user.role === 'Staff' ? '#FF9800' : '#4CAF50'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{user.joinDate}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#4CAF50'
                  }}>
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Total Students</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {users.filter(user => user.role === 'Student').length}
          </p>
        </div>
        
        <div style={{
          padding: '20px',
          background: '#f3e5f5',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#7b1fa2' }}>Total Faculty</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {users.filter(user => user.role === 'Faculty').length}
          </p>
        </div>
        
        <div style={{
          padding: '20px',
          background: '#fff3e0',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>Total Staff</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {users.filter(user => user.role === 'Staff').length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
