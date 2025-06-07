import React from 'react';

import { getCurrentUser } from '../utils/Auth';
import { Container, Row, Col, Card, Image, ListGroup, Form, Button  } from 'react-bootstrap';
import { FaUser, FaUserFriends, FaCalendarAlt, FaImages, FaInbox, FaUserPlus, FaSearch } from "react-icons/fa";
import { MdDynamicFeed } from "react-icons/md";
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';



const Friends = () => {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [userstheface, setUserstheface] = useState(null);

  var users = getFromSession("users") || [];
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    var friends = getFromSession("friends") || [];
   
    setFriends(friends); 
    const currentUser = getCurrentUser();          
    setUser(currentUser); 
    const userFriends = friends.filter(f => f.username === currentUser.username);
    setUserFriends(userFriends);
    users = getFromSession("users") || [];
    setUserstheface(users);

      
  }, []);


  return (
    <Container className="mt-4">
     {message && (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      )}
      <Row className="mb-3">
        <Col><h5>My Friends</h5></Col>
        <Col className="text-end">
          <Form.Control size="sm" type="text" placeholder="Start Typing a Name" style={{ width: '200px', display: 'inline-block' }} />
        </Col>
      </Row>

        
      <Row>
      {userFriends.length === 0 ? (
        <Alert variant="success" className="mb-4">
          Sorry, no friends found. Start adding by sending invites.
        </Alert>
      ) : (
        userFriends.map((friend, idx) => {
          const matchedUser = users.find((u) => u.username === friend.friendId);
          const profilePic = matchedUser?.ProfilePic || 'default.jpg';
          const usernameandlastname = `${matchedUser?.Firstname || ''} ${matchedUser?.Lastname || ''}`.trim();

          return (
            <Col key={idx} md={3} sm={4} xs={6} className="mb-4">
              <Card>
                <Link to={`/profile/${friend.friendId}`}>
                  <Image
                    src={`${process.env.PUBLIC_URL}/img/${profilePic}`}
                    style={{ width: "50%", height: "150px", objectFit: "cover" }}
                    roundedCircle
                  />
                  <Card.Body className="p-2">
                    <Card.Title style={{ fontSize: '0.95rem', marginBottom: '0' }}>
                      {usernameandlastname}
                    </Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })
      )}
    </Row>

    <Row className="justify-content-center">
        {/* Left Info */}
        <Col md={6} className="pe-5">
          <h3>Connect with friends and the world around you.</h3>
         
          <p><strong></strong>Connect with all registered Facebook users..</p>
          <Image
                 src={`${process.env.PUBLIC_URL}/img/favpng_6085ac1e6d4963af33a07d9bcce5750d.png`}
                 rounded
                 fluid
                 alt="Profile"
              />
             
        </Col>
      </Row>

      <Row>
      {userstheface ? (
             userstheface.map((friend, idx) => {
              const usernameandlastname = `${friend?.Firstname || ''} ${friend?.Lastname || ''}`.trim();
              const profilePic = friend?.ProfilePic || 'default.jpg';
    
              return (
                <Col key={idx} md={3} sm={4} xs={6} className="mb-4">
                  <Card>
                    <Link to={`/profile/${friend.username}`}>
                      <Image
                        src={`${process.env.PUBLIC_URL}/img/${friend.ProfilePic}`}
                        style={{ width: "50%", height: "150px", objectFit: "cover" }}
                        roundedCircle
                      />
                      <Card.Body className="p-2">
                        <Card.Title style={{ fontSize: '0.95rem', marginBottom: '0' }}>
                          {usernameandlastname}
                        </Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              );
            })  
      ) : (
        <Alert variant="success" className="mb-4">
        Sorry, no friends registered found.
      </Alert>
        )}
    </Row>

    </Container>
  );
};

export default Friends;