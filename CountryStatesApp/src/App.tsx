import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AddCountry from './components/AddCountry';
import AddState from './components/AddState';
import LoginForm from './components/LoginForm';
import Header from './components/Header';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLoginSuccess = (): void => {
    setIsAuthenticated(true);
    console.log('IsLoggedIn')
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    console.log('IsLoggedOut')
  };

  return (
    <Router>
      <div style={{backgroundColor: 'tan', minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} onLogout={handleLogout}/>} />
          <Route path="/login" element={!isAuthenticated ? <LoginForm onLogin={handleLoginSuccess} /> : <Navigate replace to="/" />} />
          {isAuthenticated ? (
            <>
              <Route path="/AddCountry" element={<AddCountry />} />
              <Route path="/AddState" element={<AddState />} />
            </>
          ) : (
            <Route path="*" element={<Navigate replace to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
