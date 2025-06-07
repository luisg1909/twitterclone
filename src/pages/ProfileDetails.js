import React from 'react';

import { getCurrentUser } from '../utils/Auth';
import { Container, Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import { FaUser, FaUserFriends, FaCalendarAlt, FaImages, FaInbox, FaUserPlus, FaSearch } from "react-icons/fa";
import { MdDynamicFeed } from "react-icons/md";
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(getFromSession('users') || []);
  const [editingUserId, setEditingUserId] = useState(null); // Track which user is being edited
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const message = location.state?.message;

  const user = getCurrentUser();


  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    // Only set once
    setEditingUserId(user.username);
    setFormData({ ...user });
  }, []);
 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUsers = users.map((user) =>
    user.username === editingUserId ? { ...formData } : user
  );
  setUsers(updatedUsers);
  saveToSession('users', updatedUsers); // Save updated users to sessionStorage
  saveToSession('currentUser', formData);
  navigate('/Profile', { state: { message: 'User edited successfully!' } });

  };
  const handleSkip = (e) => {
   
    navigate('/');

  };
  return (
    <Container className="mt-5">
       {message && (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      )}
      <Row className="justify-content-center">
        {/* Left Info */}
        <Col md={6} className="pe-5">
          <h3>Connect with friends and the world around you.</h3>
          <p><strong>Share what's new</strong> about yourself by filling in your profile.</p>
          <p><strong>Customize</strong> your interests, background, and relationships.</p>
          <Image
                 src={`${process.env.PUBLIC_URL}/img/favpng_6085ac1e6d4963af33a07d9bcce5750d.png`}
                 rounded
                 fluid
                 alt="Profile"
              />
             
        </Col>

        {/* Form Card */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4 className="mb-3"> Hi {user.Firstname} ,Edit Profile Info</h4>
              <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-4 text-center">
                  <Form.Label><strong>Select Profile Picture</strong></Form.Label>
                  <div className="mb-2">
                    <img
                      src={`${process.env.PUBLIC_URL}/img/${formData.ProfilePic || '1.jpg'}`}
                      alt="Selected"
                      style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="d-flex justify-content-center gap-3">
                    {['1.jpg', '2.jpg', '3.jpg', '4.jpg'].map((pic) => (
                      <img
                        key={pic}
                        src={`${process.env.PUBLIC_URL}/img/${pic}`}
                        alt={pic}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          border: formData.ProfilePic === pic ? '3px solid #0d6efd' : '2px solid gray',
                          cursor: 'pointer',
                          objectFit: 'cover'
                        }}
                        onClick={() => setFormData(prev => ({ ...prev, ProfilePic: pic }))}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>About Me</Form.Label>
                  <Form.Control as="textarea" rows={2} name="AboutMe" value={formData.AboutMe} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Work</Form.Label>
                  <Form.Control type="text" name="Work" value={formData.Work} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Education</Form.Label>
                  <Form.Control type="text" name="Education" value={formData.Education} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Likes and Interests</Form.Label>
                  <Form.Control type="text" name="Interests" value={formData.Interests} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Networks</Form.Label>
                  <Form.Control type="text" name="Networks" value={formData.Networks} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Hometown</Form.Label>
                  <Form.Control type="text" name="Hometown" value={formData.Hometown} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Relationship</Form.Label>
                  <Form.Control type="text" name="Relationship" value={formData.Relationship} onChange={handleChange} />
                </Form.Group>

                <Button type="submit" variant="success" className="w-50">
                  Save Profile
                </Button>
                <Button onClick={handleSkip} variant="danger" className="w-50">
                  Skip for now
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ProfileDetails;
