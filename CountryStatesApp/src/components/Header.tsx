import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left-aligned Register*/}
        <Link className="nav-link" to="/register">Register</Link>

        {/* Center-aligned title */}
        <Link className="navbar-brand mx-auto" to="/" style={{ fontSize: "30px", position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Country and State App</Link>

        {/* Right-aligned items - Login/Logout using flexbox for alignment */}
        <div className="d-flex justify-content-end" style={{ width: '100%' }}>
          {!isAuthenticated ? (
            <Link className="nav-link" to="/login">Login</Link>
          ) : (
            <button className="nav-link btn btn-link" onClick={onLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
