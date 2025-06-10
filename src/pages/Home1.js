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
  const posts = getFromSession('postst') || [];

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

    saveToSession('postst', posts);
    window.location.reload(); 

  };

  var users = getFromSession("userst") || [];
  console.log("users",users)

  useEffect(() => {
    const storedUsers = getFromSession('userst') || [];
    setPath(getCurrentPath()); 

    if (storedUsers.length === 0) {
 

    } else {
      const currentUser = getCurrentUser();

      setUser(currentUser); 
      users = getFromSession("userst") || [];
      
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
    <Link to={`/profile/${user.username}`}>
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
      </Link>
      <div className="pt-5 px-3 pb-3">
        <h5 className="mb-0">{user.Firstname || 'Kaley'}</h5>
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
              <Form onSubmit={handleSubmit}>

              <input  name="content" value={formData.content}  className="form-control mb-2" placeholder="What's happening?" onChange={(e) => setFormData({ ...formData, content: e.target.value })}  />
                              
              {showAttachImage && (
                    <Form.Group className="mb-4 text-center">
                      <Form.Label><strong>Select post Picture</strong></Form.Label>
                      <div className="mb-2">
                        {formData.image && (
                          <img
                            src={`${process.env.PUBLIC_URL}/img/${formData.image}`}
                            alt="Selected"
                            style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
                          />
                        )}
                      </div>
                      <div className="d-flex justify-content-center gap-3">
                        {[ '2025-05-26_232223.jpg', '2025-05-26_232236.jpg', '2025-05-26_232330.jpg','2025-05-26_232402.jpg', '2025-05-26_232449.jpg', 'clouds.jpg', '2025-06-07_031734.jpg'].map((pic) => (
                          <img
                            key={pic}
                            src={`${process.env.PUBLIC_URL}/img/${pic}`}
                            alt={pic}
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              border: formData.image === pic ? '3px solid #0d6efd' : '2px solid gray',
                              cursor: 'pointer',
                              objectFit: 'cover'
                            }}
                            onClick={() => setFormData(prev => ({ ...prev, image: pic }))}
                          />
                        ))}
                      </div>
                    </Form.Group>
               )}

                <div className="d-flex justify-content-end gap-2 mt-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => setShowAttachImage((prev) => !prev)}
                  >
                    {showAttachImage ? "Hide Image Picker" : "Attach Image"}
                  </Button>

                  <Button type="submit" className="btn-sm" variant="primary">
                    Tweet
                  </Button>
                </div>
              </Form>
            </div>

            {[...posts]
              .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)) // ascending
              .map((post, index) => {
                const matchedUser = users.find((u) => u.username === post.username);
                const profilePic = matchedUser?.ProfilePic || 'default.jpg';
                const usernameandlastname = `${matchedUser?.Firstname || ''} ${matchedUser?.Lastname || ''}`.trim();
                return (
               <div className="card mb-3 p-3">
                <strong>{usernameandlastname}</strong> <span className="text-muted">@{post.username}</span>
                <p>{post.content}</p>
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
