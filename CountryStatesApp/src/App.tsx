import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AddCountry from './components/AddCountry';
import AddState from './components/AddState';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import {AuthProvider, useAuth} from './components/AuthContext';
import AuthenticatedRoutes from './components/AuthenticatedRoutes';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ backgroundColor: 'tan', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            {/* Protect these routes */}
            <Route element={<AuthenticatedRoutes />}>
              <Route path="/AddCountry" element={<AddCountry />} />
              <Route path="/AddState" element={<AddState />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;