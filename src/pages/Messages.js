import React , { useState } from 'react';
import { Table, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFromSession } from '../utils/SessionStorage';
import { getCurrentUser } from '../utils/Auth';
import { getCurrentPath } from '../utils/Auth';
import {  saveToSession } from '../utils/SessionStorage';
import { Post } from '../utils/DataModel';
import { User } from '../utils/DataModel';
import { useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FaUser, FaUserFriends, FaCalendarAlt, FaImages, FaInbox, FaUserPlus, FaSearch } from "react-icons/fa";
import { MdDynamicFeed } from "react-icons/md";
const MessagesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const [user, setUser] = useState(null);
  const posts = getFromSession('posts') || [];
  const [showAttachImage, setShowAttachImage] = useState(false);
  const [path, setPath] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const basename = '/xpressnetwork';

  const [formData, setFormData] = useState({
    content: '',
    image: ''
  })


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    var newPost = new Post(    
      user.username,
      formData.content,      
      formData.image,   
      new Date(),
      '0'
    );
    posts.push(newPost);

    saveToSession('posts', posts);
    window.location.reload(); 

  };
  const handleFriend = (FriendId) => {
    navigate(`/profile/${FriendId}`); // Navigate to the edit page
  };
  var users = getFromSession("users") || [];
  useEffect(() => {
    const currentUser = getCurrentUser();

    const storedUsers = getFromSession('users') || [];
    setPath(getCurrentPath()); 
    const messages = getFromSession('messages') || [];

    const userMessages = messages.filter(f =>
      (f.username === currentUser.username ) ||  (f.friendId === currentUser.username )
    );
     setUserMessages(userMessages);  

    if (storedUsers.length === 0) {
 

    } else {

      setUser(currentUser); 
      users = getFromSession("users") || [];
      
    }
  }, []);
 




  if (!user) return null;

  


  return (
    <Container fluid className="bg-light p-3">
       {message && (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      )}
      <Row>
        {/* Left Sidebar */}
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
              
              <a href={basename + "/#/profile"}>  <Image src={`${process.env.PUBLIC_URL}/img/${user.ProfilePic}`} roundedCircle width={40} className="me-2" /></a>  
                <span>
                <strong style={{ textDecoration: 'none', color: '#003399' }}> {user.Firstname} {user.Lastname}</strong>
                 </span>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>News Feed</ListGroup.Item>
              

                <ListGroup.Item>Events</ListGroup.Item>
                <ListGroup.Item>Photos</ListGroup.Item>
                
                <a href={basename + "/#/friends"} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListGroup.Item>Friends</ListGroup.Item>
                </a> 

              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Feed */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
            <Row className="justify-content-center">
        {/* Left Info */}
        <Col md={6} className="pe-5">
          <h3>My open chats.</h3>
         
          <p><strong></strong> with all registered Facebook users..</p>
      
             
        </Col>
      </Row>
            </Card.Body>
          </Card>

          {userMessages.length === 0 ? (
        <Alert variant="success" className="mb-4">
          Sorry, no chats found. Start adding by chat with users.
        </Alert>
      ) : (
       
        userMessages.map((message, index) => {
            var matchedUser = users.find((u) => u.username === message.username);
            if(matchedUser.username===user.username) matchedUser = users.find((u) => u.username === message.friendId);
            var profilePic = matchedUser?.ProfilePic || 'default.jpg';
            var usernameandlastname = `${matchedUser?.Firstname || ''} ${matchedUser?.Lastname || ''}`.trim();
          
           
            return (
              <Card className="mb-3" key={index}>
                <Card.Body>
                  <div className="d-flex mb-2">
                  <Link to={`/sendmessage/${matchedUser.username}`}>
                    <Image
                      src={`${process.env.PUBLIC_URL}/img/${profilePic}`}
                      roundedCircle
                      width={40}
                      className="me-2"
                    />
                  </Link>
                  <div>
                          <small className="text-muted">
                            {message.username}
                          </small>
                   </div>
         
                  </div>
                  <p>{message.message}</p>
               
            
                </Card.Body>
              </Card>
            );
          })
    
       ) 
      }
 
          
        

           
        </Col>

        {/* Right Sidebar */}
        <Col md={3}>
          <Card className="mb-3">
            <Card.Header>Requests</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>1 friend request</ListGroup.Item>
              <ListGroup.Item>2 event invites</ListGroup.Item>
              <ListGroup.Item>3 page suggestions</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MessagesPage;