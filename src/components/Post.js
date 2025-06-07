import React, { useState } from 'react';
import { Form, Button, Alert, Carousel } from 'react-bootstrap';
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { getCurrentUser } from '../utils/Auth';
import { Post } from '../utils/DataModel';
import { useNavigate } from 'react-router-dom';

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../assets/landscape', false, /\.(png|jpe?g|svg)$/));

const PostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '', // Stores the selected image
  });
  const [selectedImage, setSelectedImage] = useState(images[0]); // Default to the first image
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setFormData({ ...formData, image }); // Update the selected image in the form data
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, image } = formData;

    if (!title || !content || !image) {
      setError('Title, Content, and Image are required.');
      return;
    }

    const posts = getFromSession('posts') || [];
    const newPost = new Post(
      posts.length + 1, // Generate a unique ID for the post
      title,
      content,
      currentUser.username,
      new Date(),
      image
    );

    posts.push(newPost);
    saveToSession('posts', posts);

    // Redirect to home with success message
    navigate('/', { state: { message: 'Post created successfully!' } });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '50px' }}>
      <h3>Create a New Post</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
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
                    variant={selectedImage === image ? 'success' : 'secondary'}
                    onClick={() => handleImageSelect(image)}
                  >
                    {selectedImage === image ? 'Selected' : 'Select'}
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Form.Group>

        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
};

export default PostPage;
