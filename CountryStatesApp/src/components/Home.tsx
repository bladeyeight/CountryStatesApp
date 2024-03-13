import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Country, State, SetCountriesType} from '../types';
import { Link } from 'react-router-dom';
import Header from './Header'

export async function fetchCountries(setCountries:SetCountriesType): Promise<void> {
  try {
    const response = await axios.get('http://localhost:8000/api/countries/');
    const sortedCountries: Country[] = response.data.sort((a:Country, b:Country) => a.name.localeCompare(b.name));
    setCountries(sortedCountries);
    console.log(sortedCountries);
  } catch (error) {
    console.error("There was an error!", error);
  }
}

const Home:React.FC = () =>  {

  const [countries, setCountries] = useState<Country[]>([]); 
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountryName, setSelectedCountryName] = useState<String>('Here');
  const [selectedStateName, setSelectedStateName] = useState<String>('State List');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  async function fetchStates(countryCode:String, countryName: String) {
    try {
      const response = await axios.get(`http://localhost:8000/api/countries/${countryCode}/states/`);
      const sortedStates = response.data.sort((a:State, b:State) => a.name.localeCompare(b.name));
      setSelectedCountryName(countryName);
      setStates(sortedStates)

    } catch (error) {
      console.error("There was an error!", error);
    }
  }
  useEffect(() => {fetchCountries(setCountries)}, []);

  const handleLogout = () => {
    // Implement logout logic (e.g., clearing authentication token)
    setIsAuthenticated(false);
    // Redirect to home or login page as needed
  };

  
  return (
<>
<Header isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
<div className="d-flex flex-column justify-content-center align-items-center">
<div style={{height: "50px"}}/>
    <div className="image-and-buttons-container d-flex align-items-center" style={{marginLeft: "7px"}}>
    <Link to="/AddCountry" className="btn btn-primary">Add Country</Link>
      <img src="https://i.imgur.com/o1e9atI.jpeg" alt="Country" style={{ height: "200px", borderRadius: "50%", margin: "0 50px"}}/>
    <Link to="/AddState" className="btn btn-warning">Add State</Link>
    </div>
<div style={{height: "90px"}}/>
    <h2 style={{marginLeft:"35px"}}>Select Your Country</h2>
    <div className="dropdown" style={{marginLeft:"35px"}}>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="countryButton" data-bs-toggle="dropdown" aria-expanded="false">
            {selectedCountryName}
        </button>
        <ul id = "countryDropdown" className="dropdown-menu" aria-labelledby="dropdownMenuButton" style = {{backgroundColor: "gray"}}>
        {countries.map(country => (
            <li key={country.code}><button className="dropdown-item" onClick={() => fetchStates(country.code, country.name)}>{country.name}</button></li>
          ))}
        </ul>
    </div>
    <div style={{height: "60px"}}/>
    <div className="dropdown" style={{marginLeft:"35px"}}>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {selectedStateName}
        </button>
        <ul id = "stateDropdown" className="dropdown-menu" aria-labelledby="dropdownMenuButton" style = {{backgroundColor: "gray"}}>
        {states.map(state => (
          <li key={state.code}><button className = "dropdown-item" onClick={() => setSelectedStateName(state.name)}>{state.name}</button></li>
        ))}
        </ul>
    </div>
</div>
</>
  );
}

export default Home;
