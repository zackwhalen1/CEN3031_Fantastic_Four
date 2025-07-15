import CalendarView from './CalendarView';

import SignUp from './SignUp.jsx';

import Login from './Login.jsx';

import Logout from './logout.jsx';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './AuthContext';

function App() {
  const { currentUser } = useAuth();

  return (

    <BrowserRouter>
      {currentUser && <Logout />}

      <Routes>
         <Route 
          path="/" 
          element={
            <div style={{ textAlign: 'center' }}>
              <SignUp />
            </div>
          } 
        />

        <Route 

          path="/login" 

          element={

            <div style={{ textAlign: 'center' }}>

              <Login />

            </div>

          } 

        />

        <Route

          path="/calendar"

          element={
              currentUser ? (
            <div style={{textAlign: 'center'}}>

              <CalendarView />

            </div>
            )
            : <Navigate replace to="/login" />

          }

        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </BrowserRouter>

  );

}


export default App;
