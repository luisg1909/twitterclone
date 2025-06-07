
import React, { useState, useEffect } from 'react';
// Import Link from react-router-dom
import { useParams, Link } from 'react-router-dom';
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { getCurrentUser } from '../utils/Auth';
import { Form, Button, Card } from 'react-bootstrap';


const PostDetail = () => {
  const { postId } = useParams();
  const posts = getFromSession('posts') || [];
  const currentUser = getCurrentUser();

  const post = posts.find((p) => p.id === Number(postId)) || null;


  const [comments, setComments] = useState(post ? post.comments || [] : []);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {

    const currentPosts = getFromSession('posts') || [];
    const targetPost = currentPosts.find((p) => p.id === Number(postId));

    if (targetPost) {
      if (JSON.stringify(targetPost.comments) !== JSON.stringify(comments)) {
        targetPost.comments = comments; // Update comments in the specific post
        saveToSession('posts', currentPosts); // Save the entire updated posts array
      }
    }
  }, [comments, postId]); 

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const localCurrentUser = getCurrentUser();
    if (!localCurrentUser) {
        alert("You must be logged in to comment.");
        return;
    }

    const comment = {

      id: Date.now(), 
      user: {
        username: localCurrentUser.username,
        avatar: localCurrentUser.avatar || 'https://via.placeholder.com/50',
      },
      text: newComment,
      date: new Date().toISOString(), // Store date as ISO string for consistency
    };


    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setNewComment('');

    // Update user points
    const users = getFromSession('users') || [];
    const userIndex = users.findIndex((u) => u.username === localCurrentUser.username);

    if (userIndex !== -1) {
      
      const updatedUser = {
          ...users[userIndex],
          points: (parseInt(users[userIndex].points, 10) || 0) + 1
      };
      
      const updatedUsers = [
          ...users.slice(0, userIndex),
          updatedUser,
          ...users.slice(userIndex + 1)
      ];
     
      saveToSession('users', updatedUsers); // Save updated users array
    } else {
      
    }


     const currentPosts = getFromSession('posts') || [];
     const targetPostIndex = currentPosts.findIndex((p) => p.id === Number(postId));
     if (targetPostIndex !== -1) {
         const updatedPost = {
             ...currentPosts[targetPostIndex],
             comments: updatedComments // Use the already updated comments array
         };
         const finalPosts = [
             ...currentPosts.slice(0, targetPostIndex),
             updatedPost,
             ...currentPosts.slice(targetPostIndex + 1)
         ];
         saveToSession('posts', finalPosts);
     }
  };

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '20px' }}>
      {/* --- Back Arrow and Title --- */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <Link
          to="/" // Link to your home page route
          style={{
            marginRight: '15px', // Space between arrow and title
            fontSize: '1.8em',   // Make arrow larger
            color: '#0d6efd',   // Use primary color or adjust as needed
            textDecoration: 'none', 
            lineHeight: '1'      
          }}
          title="Back to Home" 
        >
          ← {/* HTML entity for left arrow */}
          {}
        </Link>
        <h1>{post.title}</h1>
      </div>
      {}

      <p><strong>Author:</strong> {post.author}</p>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt={post.title} style={{ maxWidth: '100%', marginBottom: '15px' }} />} {/* Added alt text */}

      <hr />

      {/* Comment Section */}
      <h3>Comments</h3>
      <Form.Group controlId="newComment" className="mb-3">
        <Form.Label>Add a Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write your comment here (must be logged to comment)..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!currentUser} // Disable if not logged in
        />
      </Form.Group>
      <Button variant="primary" onClick={handleAddComment} disabled={!newComment.trim() || !currentUser}>
        Post Comment
      </Button>

      <hr />

      {/* Display Comments */}
      {comments.length > 0 ? (
   
        [...comments].sort((a, b) => new Date(b.date) - new Date(a.date)).map((comment) => (
          <Card key={comment.id} className="mb-3">
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={comment.user.avatar}
                  alt={`${comment.user.username}'s Avatar`} // Added alt text
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
                <div>
                  <strong>{comment.user.username}</strong>
                  <br />
                  <small className="text-muted">{new Date(comment.date).toLocaleString()}</small> {/* Use text-muted */}
                </div>
              </div>
              {}
              <p style={{ marginTop: '0', marginLeft: '50px', wordBreak: 'break-word' }}>{comment.text}</p>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default PostDetail;

