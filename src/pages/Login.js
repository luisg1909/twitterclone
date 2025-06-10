import React, { useState } from 'react';
import {  Button, Alert } from 'react-bootstrap';
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Card , Image} from 'react-bootstrap';
import { User } from '../utils/DataModel';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    email: ''
  
  })
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Remove all whitespace from Firstname and Lastname

    const newUser = new User(
      formData.username,
      formData.firstname,
      formData.lastname,
      formData.email,
      '',
      '',
      '',
      formData.password  ,
      '','', '','',  '','',  '','default.jpg'  ,'bg.jpg'    
    );
 

    const users = getFromSession('userst') || [];
    users.push(newUser);
    saveToSession('userst', users);    

  
    saveToSession('currentUsert', newUser);    
    setError('');
    navigate('/', { state: { message: 'User registered successfully!' } });

    
  };
  return (
    <div className="login-bg">
      <Container className="pt-4">
        <Row className="justify-content-center">
          <Col md={7}>
            <Card className="p-4 login-card">
            <Image
              src={`${process.env.PUBLIC_URL}/img/twitter_logo.png`}
              width="270"
              height="170"
              fluid
              alt="Twitter"
            />

              <h4>Create a Free Twitter Account</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Label>Username:</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text" required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <span className="ms-2 text-muted">Your URL: http://twitter.com/<strong>USERNAME</strong></span>
                  </div>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Firstname:</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text" required
                      value={formData.firstname}
                      onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Lastname:</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      value={formData.lastname}
                      onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password" required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="6 characters or more (be tricky!)"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="In case you forget something"
                  />
                </Form.Group>

            

                <Form.Check
                  type="checkbox"
                  label="I want the inside scoop—please send me email updates!"
                  checked={formData.scoop}
                  onChange={(e) => setFormData({ ...formData, scoop: e.target.checked })}
                  className="mb-2"
                />

                <small>
                  By clicking on ‘I accept’ below, you confirm that you are over 13 years of age and accept the{' '}
                  <a href="#">Terms of Service</a>.
                </small>

                <Button type="submit" className="mt-3" variant="secondary">
                  I accept. Create my account.
                </Button>
              </Form>
            </Card>
          </Col>

          <Col md={3}>
            <div className="login-side-box p-3 mt-4">
              <h6>Already a member? <br /> Please <a href="#">Sign In!</a></h6>
              <p>Already use Twitter on your phone? Head over here and we’ll get you signed up on the web.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;