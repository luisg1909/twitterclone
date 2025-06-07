import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Home from './pages/Home1';
import Friends from './pages/Friends';
import UserManagement from './pages/UserManagement';
import ProfilePage from './pages/ProfilePage';
import SendmessagePage from './pages/Message';
import MessagesPage from './pages/Messages';
import PostDetail from './pages/PostDetail';
import ProfileDetails from './pages/ProfileDetails';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PostPage from './components/Post';
import EditPost from './pages/EditPost';
import UserTable from './components/UserTable'; // Import UserTable

const App = () => {
  return (
    <Router >
      <div>
        <AppNavbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            {/* Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/profile/:FriendId" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/Profiledetails" element={<ProfileDetails />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/postcreate" element={<PostPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/edit/:postId" element={<EditPost />} />
            <Route path="/usertable" element={<UserTable />} />
            <Route path="/sendmessage/:FriendId" element={<SendmessagePage />} />

            
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;