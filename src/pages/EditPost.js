import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { Form, Button, Carousel } from 'react-bootstrap';

// Dynamically import images from the assets/landscape folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../assets/landscape', false, /\.(png|jpe?g|svg)$/));

const EditPost = () => {
  const { postId } = useParams();
  const posts = getFromSession('posts') || [];
  const post = posts.find((p) => p.id === Number(postId));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: post ? post.title : '',
    content: post ? post.content : '',
    image: post ? post.image : images[0], // Default to the post's current image or the first image
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageSelect = (selectedImage) => {
    setFormData({ ...formData, image: selectedImage });
  };

  const handleSave = () => {
    if (!post) return;

    // Update the post
    post.title = formData.title;
    post.content = formData.content;
    post.image = formData.image;

    // Save updated posts to sessionStorage
    saveToSession('posts', posts);

    alert('Post updated successfully!');
    navigate('/');
  };

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
      <h3>Edit Post</h3>
      <Form>
        {/* Title Input */}
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Content Input */}
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Image Carousel */}
        <Form.Group className="mb-3" controlId="imageCarousel">
          <Form.Label>Choose an Image</Form.Label>
          <Carousel>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${index}`}
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                  onClick={() => handleImageSelect(image)}
                />
                <Carousel.Caption>
                  <Button
                    variant={formData.image === image ? 'success' : 'secondary'}
                    onClick={() => handleImageSelect(image)}
                  >
                    {formData.image === image ? 'Selected' : 'Select'}
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Form.Group>

        {/* Save Button */}
        <Button variant="success" onClick={handleSave}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditPost;
