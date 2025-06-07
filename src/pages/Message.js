import React from 'react';

import { getCurrentUser } from '../utils/Auth';
import { Container, Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import { FaUser, FaUserFriends, FaCalendarAlt, FaImages, FaInbox, FaUserPlus, FaSearch } from "react-icons/fa";
import { MdDynamicFeed } from "react-icons/md";
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { Form, Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Friend } from '../utils/DataModel';
import { useLocation} from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Message } from '../utils/DataModel';
import './Chat.css';

const SendmessagePage = () => {
  const users = getFromSession('users') || [];
  const navigate = useNavigate();
  var { FriendId } = useParams();
  const [friends, setFriends] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [error, setError] = useState(null);
  const [friendid, setFriendid] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [IsFriend, setIsFriend] = useState(null);
  const location = useLocation();
  const message = location.state?.message;
  useEffect(() => {
    const friends = getFromSession("friends") || [];
    setFriends(friends);
    setFriendid(FriendId);

    const storedUsers = getFromSession('users') || [];
    const currentUser = getCurrentUser();
    setCurrentUser(currentUser);

    const messages = getFromSession('messages') || [];
 

    const userMessages = messages.filter(f =>
      (f.username === currentUser.username && f.friendId === FriendId) ||
      (f.username === FriendId && f.friendId === currentUser.username)
    );
   
     setUserMessages(userMessages);  

      
    if (storedUsers.length === 0) {
      
      navigate('/login', { state: { message: 'Please login to use The Facebook' } });
      return;
    } 

      if (!FriendId || FriendId === currentUser.username) {
       
        setUser(currentUser);
        

      } else {
  

      
        const UserProfile = storedUsers.find((p) => p.username === FriendId);
        setUser(UserProfile);
        
        const FriendProfile = friends.find((f) => f.username === currentUser.username && f.friendId === FriendId);
        setIsFriend(FriendProfile);
      }



      

    
  }, []);
 
  const [formData, setFormData] = useState({
    message: '',
    username: '',
    friendid: ''
   
  })

  if (!user) return null;

 
  const gotoEdit = (e) => {
   
    navigate('/Profiledetails');

  };

  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User handleLogin!")
    
 
    const currentUser = getCurrentUser();


    const newMessage = new Message(
      currentUser.username,
      FriendId,
      formData.message,
    );
 

    const messages = getFromSession('messages') || [];
    messages.push(newMessage);
    saveToSession('messages', messages);    

    window.location.reload(); 

  };

  return (
    <Container fluid className="bg-light p-3">


      <Row className="mt-4">
      {message && (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      )}

  
        <Col md={3}>
          <Card>
            <Card.Body>
              <Image
                 src={`${process.env.PUBLIC_URL}/img/${user.ProfilePic}`}
                 rounded
                 fluid
                 alt="Profile"
              />
              <Card.Text className="mt-3">View Photos of {user.Firstname} (17)</Card.Text>
             
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Networks: {user.Networks}</ListGroup.Item>
              <ListGroup.Item>Birthday: {user.Month} {user.Day},  {user.Year}</ListGroup.Item>
              <ListGroup.Item>Hometown:  {user.Hometown}</ListGroup.Item>
              <ListGroup.Item>Relationship: {user.Relationship}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={6}>
        <Container className="chat-container mt-4">
              {userMessages.map((message, idx) =>{

              return (
                <Card>
                {message.friendId === friendid ? (
                     <div  className={`chat-bubble right`}>
                 
                     <span>{message.message}</span>
                   
                     <div className="chat-avatar">
                       <Image
                         src={`${process.env.PUBLIC_URL}/img/${currentUser.ProfilePic}`}
                         roundedCircle
                         width={30}
                         height={30}
                         alt="avatar"
                       />
                     </div>
                   </div>  
                  
                  ) : (  
                    <div  className={`chat-bubble left`}>
                 
                    <span>{message.message}</span>
                  
                    <div className="chat-avatar">
                      <Image
                        src={`${process.env.PUBLIC_URL}/img/${user.ProfilePic}`}
                        roundedCircle
                        width={30}
                        height={30}
                        alt="avatar"
                      />
                    </div>
                  </div>  
                 )}

                </Card>
                );
              }) }
      </Container>
          <Card>
          <Card.Body>
               
               <h4 className="mb-3">Write message</h4>
               <p></p>
               <Form  onSubmit={handleSubmit}>
               <Form.Group className="mb-3">
              
                 <Form.Control as="textarea" rows={2} name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
               </Form.Group>
               <Col>
                 <Button className="w-100 mt-3" type="submit" variant="success" >Send</Button>
                 </Col>
                 <Col>
                 {error && <Alert variant="danger">{error}</Alert>}
                 </Col>
              
               </Form>
              </Card.Body>
          </Card>
        </Col>

        {/* Right Column (Ads / Suggestions) */}
        <Col md={3}>

        </Col>
      </Row>

   
    </Container>
  );
};

export default SendmessagePage;
