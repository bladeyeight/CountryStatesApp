import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import {State, Country} from '../types'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { fetchCountries } from './Home';


const AddState: React.FC = () => {
  const [stateCode, setStateCode] = useState('');
  const [stateName, setStateName] = useState('');
  const [countryId, setCountryId] = useState<number | ''>('');
  const [countries, setCountries] = useState<Country[]>([]); 
  const [selectedCountryName, setSelectedCountryName] = useState<String>('select state country');

  useEffect(() => {fetchCountries(setCountries)}, []);

  function selectCountry(country:Country) {
    setSelectedCountryName(country.name);
    setCountryId(country.id!);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!countryId) {
      alert('CountryId is required')
      return;
    }
    
    const state: State = {
      code: stateCode,
      name: stateName,
      countryId: countryId
    };

    try {
      const response = await axios.post('http://localhost:8000/api/states/', state);
      console.log('Response:', response.data);
      navigate('/')
    } catch (error) {
      console.error('There was an error posting the data', error);
    }
  };

  return (
    <Container style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center' 
    }}>
      <Row className="justify-content-md-center align-items-center">
        <Col md="auto">
          <img
            src="https://i.imgur.com/KnX46Rh.jpeg"
            alt="Descriptive Alt Text"
            className="img-state"
            style={{ height: "400px", borderRadius: '50%' }}
          />
        </Col>
        <Col md="auto">
          <Form onSubmit = {handleSubmit}>
          <Form.Group className="mb-3" controlId="stateCode">
              <Form.Label>State Code</Form.Label>
              <Form.Control type="text" placeholder="Enter state code" value={stateCode} onChange={e => setStateCode(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="stateName">
              <Form.Label>State Name</Form.Label>
              <Form.Control type="text" placeholder="Enter state name" value={stateName} onChange={e => setStateName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countryId">
              <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {selectedCountryName}
              </Dropdown.Toggle>
                  <Dropdown.Menu style = {{backgroundColor: "gray"}}>
                  {countries.map(country => (
                  <Dropdown.Item key ={country.code} onClick={() => selectCountry(country)}>{country.name}</Dropdown.Item>
                  ))}
              </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Link to="/"><Button  variant="danger" type="submit">
              Back
            </Button></Link>
            <Button className="ms-5" variant="primary" type="submit">
              Add State
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddState;
