// File: src/Navbar.jsx
import React from 'react';
import { FaUser, FaUserFriends, FaCalendarAlt, FaImages, FaInbox, FaUserPlus, FaSearch } from "react-icons/fa";
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import { getCurrentUser, logout } from '../utils/Auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { getFromSession } from '../utils/SessionStorage';
import {  saveToSession } from '../utils/SessionStorage';
import { Post } from '../utils/DataModel';
import {  Row, Col, Form, Card} from 'react-bootstrap';
import {  Button, Alert } from 'react-bootstrap';
import { getCurrentPath } from '../utils/Auth';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

  const currentUser = getCurrentUser(); // Assume it returns { name, image }
  const navigate = useNavigate();
  const basename = '/xpressnetwork';
  const [user, setUser] = useState(null);
  const [path, setPath] = useState(null);

  const users = getFromSession('userst') || [];
  const posts = getFromSession('postst') || [];

  useEffect(() => {
    const storedUsers = getFromSession('userst') || [];
    setPath(getCurrentPath()); 

console.log("current users login: ",storedUsers)
    if (storedUsers.length === 0) {
  
      const defaultUser = {
        username: "GabyPezzaro",
        Firstname: "Gaby",
        Lastname: "Pezzaro",
        Email: "Pezzaro@Twitter.com",
        Month: "Abr",
        Day: "14",
        Year: "1993",
        password: "123",
        ProfilePic: "2025-06-07_021351.jpg",
        BgPic: "2025-06-07_031734.jpg",
        AboutMe: "I like movies,novel and philosophy",
        Work: "Twitter",
        Education: "Phillips Exeter Academy",
        Interests: "writer",
        Networks: "Facebook",
        Hometown: "Dobbs Ferry, New York",
        Relationship: "Single"
      };
  
      users.push(defaultUser);

      const defaultUser2 = {
        username: "P.Maxi",
        Firstname: "Maxi",
        Lastname: "Stan",
        Email: "P.Maxi@Twitter.com",
        Month: "Dec",
        Day: "14",
        Year: "1988",
        password: "123",
        ProfilePic: "2025-06-07_064714.jpg",
        BgPic: "2025-05-26_232422.jpg",
        AboutMe: "I like to resolver puzzles, diving in ocean and park runner",
        Work: "Facebook",
        Education: "Harvard University",
        Interests: "cat lover",
        Networks: "Twitter",
        Hometown: "Georgia",
        Relationship: "Single"
      };
      users.push(defaultUser2);

      const defaultUser3 = {
        username: "Jack.Dorsey",
        Firstname: "Jack ",
        Lastname: "Dorsey",
        Email: "Pezzaro@thefacebook.com",
        Month: "Abr",
        Day: "14",
        Year: "1976",
        password: "123",
        ProfilePic: "2025-06-07_064912.jpg",
        BgPic: "2025-06-07_065145.jpg",
        AboutMe: "I like movies,novel and philosophy",
        Work: "Facebook",
        Education: "Phillips Exeter Academy",
        Interests: "Programming,front end",
        Networks: "Twitter",
        Hometown: "Dobbs Ferry, New York",
        Relationship: "Single"
      };
      users.push(defaultUser3);

      
      var newPost = new Post(    
        'P.Maxi',
        'You know whats underrated? The Tarzan soundtrack. Everything Phil Collins does slaps',
        '2025-06-07_065554.jpg',
        new Date(),
        '0'
      );
       posts.push(newPost);
      

        newPost = new Post(    
         'GabyPezzaro',
         'Early #90s #Microsoft #Windows desktops: a very cool custom Win 3.1 theme called Lipstick.',
         '',
         '2025-06-07T02:33:22.444Z',
         '0'
       );
       posts.push(newPost);
       
       newPost = new Post(    
        'GabyPezzaro',
        'A massively nerdy history of Twitters default profile pics...',
        '',
        '2025-06-06T04:11:22.444Z',
        '0'
      );
      posts.push(newPost);

       newPost = new Post(    
        'Jack.Dorsey',
        'Welcome to twitter',
        '2025-06-07_065445.jpg',
        '2025-06-06T18:21:22.444Z',
        '0'
      );
      posts.push(newPost);

      saveToSession('postst', posts);


      saveToSession('userst',users);
      saveToSession('currentUsert', defaultUser);
      setUser(defaultUser);
    } else {
      const currentUser = getCurrentUser();
      setUser(currentUser); 
     
   
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 sticky-top">
      <div className="d-flex align-items-center w-100 justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <a className="nav-link text-primary d-flex align-items-center" href="#">
            <FaUser className="me-1" /> Home
          </a>
          <a className="nav-link text-dark d-flex align-items-center" href="#">
            <FaCalendarAlt className="me-1" /> Moments
          </a>
          <a className="nav-link text-dark d-flex align-items-center" href="#">
            <FaInbox className="me-1" /> Notifications
          </a>
          <a className="nav-link text-dark d-flex align-items-center" href="#">
            <FaUserPlus className="me-1" /> Messages
          </a>
        </div>
        <FaUserFriends className="text-primary fs-4" />
        <div className="d-flex align-items-center gap-3">
            {/* Search bar */}
            <div className="input-group" style={{ maxWidth: '200px' }}>
              <input className="form-control rounded-pill" placeholder="Search Twitter" />
              <span className="input-group-text bg-white border-0">
                <FaSearch />
              </span>
            </div>

            {/* Profile avatar */}
            {user && (
                   <Link to={`/profile/${user.username}`}>
                    <img
                    src={`${process.env.PUBLIC_URL}/img/${user.ProfilePic}`}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                  />
                    </Link>
            
            )}

            {/* Tweet button */}
            <button className="btn btn-primary d-flex align-items-center">
              <FaImages className="me-2" /> Tweet
            </button>
          </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
