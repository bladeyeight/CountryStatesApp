import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {Country} from '../types'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


const AddCountry: React.FC = () => {
  const [countryCode, setCountryCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const country: Country = {
      id: undefined,
      code: countryCode,
      name: countryName,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/countries/', country);
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
            src="https://i.imgur.com/nrt6I5X.jpeg"
            alt="Descriptive Alt Text"
            className="img-country"
            style={{ maxHeight: '200px', borderRadius: '50%' }}
          />
        </Col>
        <Col md="auto">
          <Form onSubmit = {handleSubmit}>
          <Form.Group className="mb-3" controlId="countryCode">
              <Form.Label>Country Code</Form.Label>
              <Form.Control type="text" placeholder="Enter country code" value={countryCode} onChange={e => setCountryCode(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countryName">
              <Form.Label>Country Name</Form.Label>
              <Form.Control type="text" placeholder="Enter country name" value={countryName} onChange={e => setCountryName(e.target.value)} />
            </Form.Group>
            <Link to="/"><Button  variant="danger" type="submit">
              Back
            </Button></Link>
            <Button className ="ms-5" variant="primary" type="submit">
              Add Country
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCountry;
