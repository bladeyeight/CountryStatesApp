import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddCountry from './components/AddCountry';
import AddState from './components/AddState';


const App: React.FC = () => {
  return (
    <Router>
      <div style = {{backgroundColor: 'tan',  minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddCountry" element={<AddCountry />} />
          <Route path="/AddState" element={<AddState />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;