import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid justify-content-between">
        {/* Left-aligned items */}
        {!isAuthenticated && (
          <Link className="nav-link" to="/register">Register</Link>
        )}

        {/* Center-aligned title */}
        <Link className="navbar-brand mx-auto" to="/" style={{fontSize: "30px"}}>Country and State App</Link>

        {/* Right-aligned items */}
        {!isAuthenticated ? (
          <Link className="nav-link" to="/login">Login</Link>
        ) : (
          <button className="nav-link btn btn-link" onClick={onLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Header;
