import CalendarView from './CalendarView';

import Login from './Login.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route 

          path="/" 

          element={

            <div style={{ textAlign: 'center' }}>

              <Login />

            </div>

          } 

        />

        <Route

          path="/calendar"

          element={

            <div style={{textAlign: 'center'}}>

              <CalendarView />

            </div>

          }

        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;
