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
import './ProfilePage.css';

const ProfilePage = () => {

  const users = getFromSession('userst') || [];
  const navigate = useNavigate();
  var { FriendId } = useParams();
  const [friends, setFriends] = useState(null);
  var [isOwnProfile, setIsOwnProfile] = useState(false);
  const posts = getFromSession('postst') || [];

  const [user, setUser] = useState(null);
  const [IsFriend, setIsFriend] = useState(null);
  const location = useLocation();
  const message = location.state?.message;
  const basename = '/xpressnetwork';

  useEffect(() => {
    const friends = getFromSession("friends") || [];
    setFriends(friends);
    const storedUsers = getFromSession('userst') || [];


      
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


  const profile = {
    username: `${user.Firstname} ${user.Lastname}`,
    handle: `@${user.username}`,
    location: `${user.Hometown}`,
    bio: `${user.AboutMe}`,
    followers: 475,
    following: 151,
    tweets: 224,
    likes: 8,
    lists: 1,
    profilePic:  `${process.env.PUBLIC_URL}/img/${user.ProfilePic}`,    
    coverPic: `${process.env.PUBLIC_URL}/img/${user.BgPic}`, 
    links: [
     
    ],
  };

  const tweets = [
    {
      text: "Early #90s #Microsoft #Windows desktops: a very cool custom Win 3.1 theme called Lipstick.",
      img: "/img/tweet1.png",
      hashtags: "#tech #geek #computing",
    },
    {
      text: "A massively nerdy history of Twitter's default profile pics...",
      img: "/img/tweet2.png",
      hashtags: "#geek #socialmedia #history",
    }
  ];

  return (
    <div className="profile-page">
      {/* Cover Image */}
      <div className="cover-photo" style={{ backgroundImage: `url(${profile.coverPic})` }} />

      {/* Profile and Info */}
      <div className="container">
        <div className="left-column">
          <div className="profile-box">
            <img src={profile.profilePic} className="avatar" alt="Profile" />
            <h3>{profile.username}</h3>
            <p className="text-muted">{profile.handle}</p>
            <p>{profile.bio}</p>
            {profile.links.map(link => (
              <p key={link.label}><a href={link.url}>{link.url}</a></p>
            ))}
            <p><i className="text-muted">{profile.location}</i></p>
          </div>
          <div className="photo-grid">
            <h6>Photos and videos</h6>
            <img src="/img/tweet1.png" alt="img" />
            <img src="/img/tweet2.png" alt="img" />
          </div>
        </div>

        <div className="center-column">
          <div className="stats-bar">
            <div><a href="#"><strong>{profile.tweets}</strong></a><div className="label">Tweets</div></div>
            <div><a href="#"><strong>{profile.following}</strong></a><div className="label">Following</div></div>
            <div><a href="#"><strong>{profile.followers}</strong></a><div className="label">Followers</div></div>
            <div><a href="#"><strong>{profile.likes}</strong></a><div className="label">Favourites</div></div>
            <div><a href="#"><strong>{profile.lists}</strong></a><div className="label">Lists</div></div>
         </div>
          <div className="tweets">

          {[...posts]
              .filter(post => post.username === user?.username) 
              .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)) // ascending
              .map((post, index) => {
                const matchedUser = users.find((u) => u.username === post.username);               
                const profilePic = matchedUser?.ProfilePic || 'default.jpg';
                const usernameandlastname = `${matchedUser?.Firstname || ''} ${matchedUser?.Lastname || ''}`.trim();
                return (
                <div className="tweet-card">
                  <strong>{post.username}</strong> <span className="text-muted">{profile.handle}</span>
                  <p>{post.content}</p>
                  <p className="hashtags"> #tech #geek #computing</p>
                  {post.image && post.image.length > 0 && (
                        <Image src={`${process.env.PUBLIC_URL}/img/${post.image}`} fluid />
                      )}
                  <div className="mt-2 text-muted" style={{ fontSize: '0.9rem' }}>
                          Like · Comment · Share · Retweet
                  </div>
                </div>

              
                 );
            })}

          </div>
        </div>

        <div className="right-column">
          <div className="follow-box">
            <h6>Who to follow</h6>
            <ul className="list-unstyled">
              <li>TheNoisySongbird <button>Follow</button></li>
              <li>SophieDiddles <button>Follow</button></li>
              <li>darksidedeeb <button>Follow</button></li>
            </ul>
          </div>
          <div className="trends-box">
            <h6>Trends</h6>
            <ul>
              <li>#PlayHeroes</li>
              <li>#BeatlesRecipes</li>
              <li>#GameOfThrones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
