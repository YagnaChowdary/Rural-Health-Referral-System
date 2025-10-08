/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


// frontend/src/App.js
import React from 'react';
import PHCReferralForm from './components/PHCReferralForm';
import HospitalDashboard from './components/HospitalDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PHC Referral Portal</h1>
        <PHCReferralForm />
         <HospitalDashboard /> 
      </header>
    </div>
  );
}

export default App;

// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PHC_Page from './pages/PHC_Page';
import Hospital_Page from './pages/Hospital_Page';
import LoginPage from './pages/Login_Page'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {/* Navigation Links *///}
          // 
          /*
          <nav style={{ padding: '20px' }}>
            <Link to="/" style={{ margin: '10px', color: 'white' }}>PHC Form</Link>
            <Link to="/dashboard" style={{ margin: '10px', color: 'white' }}>Hospital Dashboard</Link>
          </nav>

          {/* Route Definitions *///}*/
          /*<Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PHC_Page />} />
            <Route path="/dashboard" element={<Hospital_Page />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
*/
// frontend/src/App.js
/*import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PHC_Page from './pages/PHC_Page';
import Hospital_Page from './pages/Hospital_Page';
import LoginPage from './pages/Login_Page';
import ProtectedRoute from './components/ProtectedRoute'; // <-- 1. Import
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav style={{ padding: '20px', backgroundColor: '#282c34', width: '100%' }}>
            <Link to="/login" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
              Login
            </Link>
            <Link to="/" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
              PHC Form
            </Link>
            <Link to="/dashboard" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
              Hospital Dashboard
            </Link>
          </nav>

          <div style={{ padding: '20px' }}>
            <Routes>
              {/* Public route *//*}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected routes *//*}
              <Route
                path="/"
                element={
                  <ProtectedRoute> {/* <-- 2. Wrap *//*}
                    <PHC_Page />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute> {/* <-- 3. Wrap *//*}
                    <Hospital_Page />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;*/

// frontend/src/App.js
/*import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PHC_Page from './pages/PHC_Page';
import Hospital_Page from './pages/Hospital_Page';
import LoginPage from './pages/Login_Page';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// We need to create a new component for the navigation to use the hook
const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the token from local storage
    localStorage.removeItem('token');
    // 2. Redirect to the login page
    navigate('/login');
  };

  return (
    <nav style={{ padding: '20px', backgroundColor: '#282c34', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
          PHC Form
        </Link>
        <Link to="/dashboard" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
          Hospital Dashboard
        </Link>
      </div>
      <div>
        {/* If a token exists, show the logout button *//*}
        {localStorage.getItem('token') && (
          <button onClick={handleLogout} style={{ margin: '0 15px', fontSize: '1em', cursor: 'pointer' }}>
            Logout
          </button>
        )}
        {!localStorage.getItem('token') && (
          <Link to="/login" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
/*
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navigation /> {/* Use the new Navigation component *//*}

          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={<ProtectedRoute><PHC_Page /></ProtectedRoute>}
              />
              <Route
                path="/dashboard"
                element={<ProtectedRoute><Hospital_Page /></ProtectedRoute>}
              />
            </Routes>
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;*/

// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PHC_Page from './pages/PHC_Page';
import Hospital_Page from './pages/Hospital_Page';
import LoginPage from './pages/Login_Page';
import ProtectedRoute from './components/ProtectedRoute';
import { getUserRole } from './utils/auth'; // <-- 1. Import
import './App.css';

const Navigation = () => {
  const navigate = useNavigate();
  const userRole = getUserRole(); // <-- 2. Get the user's role
  const isLoggedIn = !!userRole;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '20px', backgroundColor: '#282c34', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        {/* 3. Conditionally render links based on role */}
        {userRole === 'PHC_STAFF' && (
          <Link to="/" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
            PHC Form
          </Link>
        )}
        {userRole === 'DISTRICT_STAFF' && (
          <Link to="/dashboard" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
            Hospital Dashboard
          </Link>
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ margin: '0 15px', fontSize: '1em', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ margin: '15px', color: 'white', fontSize: '1.2em' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

function App() {
  // ... (The App function remains the same as before)
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navigation />
          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute roles={['PHC_STAFF']}>
                    <PHC_Page />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute roles={['DISTRICT_STAFF']}>
                    <Hospital_Page />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;