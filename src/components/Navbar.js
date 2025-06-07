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
const AppNavbar = () => {

  const currentUser = getCurrentUser(); // Assume it returns { name, image }
  const navigate = useNavigate();
  const basename = '/xpressnetwork';
  const [user, setUser] = useState(null);
  const [path, setPath] = useState(null);

  const users = getFromSession('users') || [];

  useEffect(() => {
    const storedUsers = getFromSession('users') || [];
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
      saveToSession('users',users);
      saveToSession('currentUser', defaultUser);
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
        <div className="input-group" style={{ maxWidth: '200px' }}>
          <input className="form-control rounded-pill" placeholder="Search Twitter" />
          <span className="input-group-text bg-white border-0">
            <FaSearch />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
