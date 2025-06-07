import React, { useState } from 'react';
import {  Button, Alert } from 'react-bootstrap';
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Card , Image} from 'react-bootstrap';
import { User } from '../utils/DataModel';
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Month: '',
    Day: '',
    Year: '',
    Password: ''
  })
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Remove all whitespace from Firstname and Lastname
    const cleanFirst = formData.Firstname.replace(/\s/g, '');
    const cleanLast = formData.Lastname.replace(/\s/g, '');
 
    const username = `${cleanFirst}${cleanLast}`;
    const newUser = new User(
      username,
      formData.Firstname,
      formData.Lastname,
      formData.Email2,
      formData.Month,
      formData.Day,
      formData.Year,
      formData.Password2  ,
      '','', '','',  '','',  '',''  ,''    
    );
 

    const users = getFromSession('users') || [];
    users.push(newUser);
    saveToSession('users', users);    

    const user = users.find(
      (u) => u.username === username
    );
    saveToSession('currentUser', newUser);    
    setError('');
    navigate('/Profiledetails', { state: { message: 'User registered successfully!' } });

    
  };
  return (
    <div className="gradient-bg min-vh-100">

      {/* Top Blue Bar */}


      {/* Main Content */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} className="pe-5">
            <h3>Connect with friends and the world around you on Facebook.</h3>
            <p><strong>See photos and updates</strong> from friends in News Feed.</p>
            <p><strong>Share what’s new</strong> in your life on your Timeline.</p>
            <p><strong>Find more</strong> of what you’re looking for with Facebook Search.</p>

            
      <Image
                 src={`${process.env.PUBLIC_URL}/img/favpng_6085ac1e6d4963af33a07d9bcce5750d.png`}
                 rounded
                 fluid
                 alt="Profile"
              />
          </Col>

          <Col md={5}>
            <Card>
              <Card.Body>
                <h4 className="mb-3">Sign Up</h4>
                <p>It’s free and always will be.</p>
                <Form  onSubmit={handleSubmit}>
                  <Row>
                    <Col><Form.Control type="text" required name="Firstname" value={formData.Firstname} placeholder="First name" onChange={(e) => setFormData({ ...formData, Firstname: e.target.value })}/></Col>
                    <Col><Form.Control type="text"  name="Lastname"  value={formData.Lastname} placeholder="Last name" onChange={(e) => setFormData({ ...formData, Lastname: e.target.value })} /></Col>
                  </Row>
                  <Form.Control className="mt-2"name="Email"  value={formData.Email2} type="email" required placeholder="Email" onChange={(e) => setFormData({ ...formData, Email2: e.target.value })} />
                  <Form.Control className="mt-2" name="Password"  value={formData.Password2}  type="password" required placeholder="Password" onChange={(e) => setFormData({ ...formData, Password2: e.target.value })} />
                  
                  <Form.Label className="mt-3 mb-1">Birthday</Form.Label>
                  <Row>
                    <Col>
                      <Form.Select value={formData.Month} onChange={(e) => setFormData({ ...formData, Month: e.target.value })}>
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
                          <option key={index} value={month}>{month}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select value={formData.Day} onChange={(e) => setFormData({ ...formData, Day: e.target.value })}>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select value={formData.Year} onChange={(e) => setFormData({ ...formData, Year: e.target.value })}>
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <div className="mt-3">
                    <Form.Check inline type="radio" label="Female" name="gender" />
                    <Form.Check inline type="radio" label="Male" name="gender" />
                  </div>

                  <Button className="w-100 mt-3" type="submit" variant="success">Create Account</Button>
                </Form>

                <div className="mt-3 text-center">
                  <a href="#">Create a Page</a> for a celebrity, band or business.
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;