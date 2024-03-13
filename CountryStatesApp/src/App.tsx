import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddCountry from './components/AddCountry';
import AddState from './components/AddState';
import LoginForm from './components/LoginForm';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLoginSuccess = (): void => {
    setIsAuthenticated(true);
    console.log('IsAuthenticated')
  };

  return (
    <Router>
      <div style = {{backgroundColor: 'rgba(210, 180, 140, 0.5)',  minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm onLogin={handleLoginSuccess}/>} />
          <Route path="/AddCountry" element={<AddCountry />} />
          <Route path="/AddState" element={<AddState />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;