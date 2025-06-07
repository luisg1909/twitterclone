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

const ProfilePage = () => {
  const users = getFromSession('users') || [];
  const navigate = useNavigate();
  var { FriendId } = useParams();
  const [friends, setFriends] = useState(null);
  var [isOwnProfile, setIsOwnProfile] = useState(false);

  const [user, setUser] = useState(null);
  const [IsFriend, setIsFriend] = useState(null);
  const location = useLocation();
  const message = location.state?.message;
  const basename = '/xpressnetwork';

  useEffect(() => {
    const friends = getFromSession("friends") || [];
    setFriends(friends);
    const storedUsers = getFromSession('users') || [];


      
    if (storedUsers.length === 0) {
      
      navigate('/login', { state: { message: 'Please login to use The Facebook' } });
      return;
    } 
      const currentUser = getCurrentUser();

      if (!FriendId || FriendId === currentUser.username) {
        setIsOwnProfile(true);
        setUser(currentUser);
        

      } else {
  

        setIsOwnProfile(false);
        const UserProfile = storedUsers.find((p) => p.username === FriendId);
        setUser(UserProfile);
        
        const FriendProfile = friends.find((f) => f.username === currentUser.username && f.friendId === FriendId);
        setIsFriend(FriendProfile);
      }



      

    
  }, []);
 


  if (!user) return null;

 
  const gotoEdit = (e) => {
   
    navigate('/Profiledetails');

  };

  
  const Removefriend = (e) => {
    const currentUser = getCurrentUser();
    let friends = getFromSession("friends") || [];
  
    // Remove the friend  for the current user
    friends = friends.filter(
      (f) => !(f.username === currentUser.username && f.friendId === FriendId)
    );
    
    saveToSession("friends", friends);
    setFriends(friends);
    setIsFriend(null); // Remove UI "is friend" state
   
    navigate('/friends', { state: { message: 'Friend removed successfully.' } });


  };
  const Addasfriend = (e) => {
    const currentUser = getCurrentUser();


    const newFriend = new Friend(
      currentUser.username,
      FriendId,
       ''    
    );
 

    const friends = getFromSession('friends') || [];
    friends.push(newFriend);
    saveToSession('friends', friends);    

    navigate('/friends', { state: { message: 'Friend added successfully!' } });

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
              <Link  style={{ textDecoration: 'none', color: 'inherit' }} to={`/sendmessage/${FriendId}`}>
              <Card.Text>Send {user.Firstname} a Message</Card.Text>
                      </Link>
            
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
          <Card>
            <Card.Body>
              <h5>
              <strong style={{ textDecoration: 'none', color: '#003399' }}> {user.Firstname} {user.Lastname}</strong>

               </h5>
              <div className="d-flex gap-3 mb-3">
                <span className="text-primary">Wall</span>
                <span>Info</span>
                <span>Photos</span>
                <span>Boxes</span>
              </div>

              <h6>About Me</h6>
              <p>
                “{user.AboutMe} ”
              </p>

              <h6>Work and Education</h6>
              <p><strong>Work:</strong> {user.Work}</p>
              <p><strong>Education:</strong>  {user.Education}</p>

              <h6>Likes and Interests</h6>
              <p> {user.Interests}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column (Ads / Suggestions) */}
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
            {isOwnProfile ? (
                       <div className="grid grid-cols-1 gap-1 p-4 text-center text-sm">
                       <div className="flex flex-col items-center">
                         <MdDynamicFeed size={24} />
                         <span>News Feed</span>
                       </div>
                       <div className="flex flex-col items-center">
                         <FaUser size={24} />
                         <span>Profile</span>
                       </div>
                       <div className="flex flex-col items-center">  
                         <a href={basename + "/#/friends"} style={{ textDecoration: 'none', color: 'inherit' }}>
                         <FaUserFriends size={24} />
                         <span>Friends</span>
                         </a> 
                       </div>
                       <div className="flex flex-col items-center">
                         <FaImages size={24} />
                         <span>Photos</span>
                       </div>
                       <div className="flex flex-col items-center">
                         <FaCalendarAlt size={24} />
                         <span>Events</span>
                       </div>
                       <div className="flex flex-col items-center">
                       <a href={basename + "/#/messages"} style={{ textDecoration: 'none', color: 'inherit' }}>
                       <FaInbox size={24} />
                         <span>Messages</span>
                       </a>                         
                       </div>
                       <div className="flex flex-col items-center">  
                         <FaUserPlus size={24} />
                         <span>Requests</span>
                       </div>
                     </div>     

            ) : (
              <div className="grid grid-cols-1 gap-1 p-4 text-center text-sm">

                      <Link to={`/sendmessage/${FriendId}`}>
                        <Button  variant="primary" className="w-50">
                      Send message
                        </Button>
                      </Link>


           
              </div>
            )}
            </Card.Body>
            <Card.Body className="text-center">

            {isOwnProfile  ? (
              <Button onClick={gotoEdit} variant="success" className="w-50">
              Edit data
              </Button>

            ) : (
              IsFriend ? (

                <Button onClick={Removefriend} variant="danger" className="w-50">
                Remove friend
                </Button>
              ) : (
                <Button onClick={Addasfriend} variant="success" className="w-50">
               Add as a friend
                </Button>
              )

            )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

   
    </Container>
  );
};

export default ProfilePage;
