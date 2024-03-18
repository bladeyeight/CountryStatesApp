import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from './AuthContext'
import axios from 'axios';

const LoginForm: React.FC = () => {

    const {login} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });
            console.log('LoginResponse', response);
            const { token } = response.data;
            login(token);
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Login failed:', error.response?.data);
            } else {
                console.log('Unexpected error:', error);
            }
            alert('Login failed!');
        }
    };

    return (
        <Container style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <img
                src="https://i.imgur.com/nmAiaPF.png"
                alt="Descriptive Alt Text"
                className="img-fluid"
                style={{ maxHeight: '200px', borderRadius: '50%', marginBottom: '20px' }} // Adjust marginBottom as needed for spacing
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Link to="/">
                    <Button variant="danger">
                      Back
                    </Button>
                  </Link>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      );
};

export default LoginForm;
