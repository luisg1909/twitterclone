import AppNavbar from  '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
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

const Home = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const [user, setUser] = useState(null);
  const posts = getFromSession('posts') || [];

  const [showAttachImage, setShowAttachImage] = useState(false);
  const [path, setPath] = useState(null);
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

  var users = getFromSession("users") || [];
  console.log("users",users)

  useEffect(() => {
    const storedUsers = getFromSession('users') || [];
    setPath(getCurrentPath()); 

    if (storedUsers.length === 0) {
 

    } else {
      const currentUser = getCurrentUser();

      setUser(currentUser); 
      users = getFromSession("users") || [];
      
    }
  }, []);


  if (!user) return null;
  return (
    <div>
     {message && (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      )}

      <div className="container mt-4">
        <div className="row">

          {/* LEFT SIDEBAR */}
          <div className="col-md-3">
  <div className="card p-0 position-relative">
    {/* Background Image */}
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/${user.BgPic})`,
        height: '100px',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
      }}
    ></div>

    {/* Avatar overlapping bottom-left */}
    <div style={{ position: 'relative' }}>
      <img
        src={`${process.env.PUBLIC_URL}/img/${user.ProfilePic}`}
        className="rounded-circle border border-white"
        alt="avatar"
        style={{
          width: '70px',
          height: '70px',
          position: 'absolute',
          top: '-35px',
          left: '15px',
        }}
      />
      <div className="pt-5 px-3 pb-3">
        <h5 className="mb-0">{user.name || 'Kaley'}</h5>
        <p className="text-muted mb-2">@{user.username || 'yang_bo_dudnik'}</p>
        <div className="d-flex justify-content-around text-center border-top pt-2">
          <div><strong>24.8K</strong><br />Tweets</div>
          <div><strong>519</strong><br />Following</div>
          <div><strong>1,073</strong><br />Followers</div>
        </div>
      </div>
    </div>
  </div>
</div>


          {/* FEED */}
          <div className="col-md-6">
            <div className="card mb-3 p-3">
              <input className="form-control mb-2" placeholder="What's happening?" />
              <button className="btn btn-primary btn-sm float-right">Tweet</button>
            </div>

            <div className="card mb-3 p-3">
              <strong>Hannah</strong> <span className="text-muted">@gwendalsflow</span>
              <p>You know what's underrated? The Tarzan soundtrack. Everything Phil Collins does slaps</p>
            </div>

            <div className="card mb-3 p-3">
              <strong>Sanika</strong> <span className="text-muted">@Sanika1020</span>
              <p>Why did that make me think of this 💀💀</p>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/ZJfhI0d-B9c" allowFullScreen></iframe>
              </div>
            </div>

            <div className="card mb-3 p-3">
              <strong>@_bakugowo</strong>
              <p>he's an airhead your honor</p>
              <img src={`${process.env.PUBLIC_URL}/img/${user.ProfilePic}`}  className="img-fluid" alt="manga" />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-md-3">
            <div className="card p-3 mb-3">
              <h6>Sneak a peek at the new Twitter</h6>
              <p className="small">Bookmarks, dark mode, data saver, and more — see all the new features coming to the web.</p>
              <button className="btn btn-outline-primary btn-sm">Take a look</button>
            </div>

            <div className="card p-3">
              <h6>Who to follow</h6>
              <ul className="list-unstyled small">
                <li><strong>Marc J. Spears</strong> <button className="btn btn-sm btn-outline-primary float-right">Follow</button></li>
                <li><strong>Yahoo Sports NBA</strong> <button className="btn btn-sm btn-outline-primary float-right">Follow</button></li>
                <li><strong>Bleacher Report</strong> <button className="btn btn-sm btn-outline-primary float-right">Follow</button></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
