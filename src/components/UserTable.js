import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { getFromSession, saveToSession } from '../utils/SessionStorage';
import { getCurrentUser } from '../utils/Auth';

const UserTable = () => {
  const [users, setUsers] = useState(getFromSession('users') || []);
  const [editingUserId, setEditingUserId] = useState(null); // Track which user is being edited
  const [editableData, setEditableData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' }); // Default sorting by points descending
  const currentUser = getCurrentUser();

  useEffect(() => {
    sortUsers(sortConfig.key, sortConfig.direction);
  }, [sortConfig]);

  const sortUsers = (key, direction) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.username); // Set the user being edited
    setEditableData({ ...user }); // Populate editable fields with the selected user's data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.username === editingUserId ? { ...editableData } : user
    );
    setUsers(updatedUsers);
    saveToSession('users', updatedUsers); // Save updated users to sessionStorage
    setEditingUserId(null); // Exit editing mode
  };

  const handleResetPassword = (user) => {
    const updatedUsers = users.map((u) =>
      u.username === user.username ? { ...u, password: 'default123' } : u
    );
    setUsers(updatedUsers);
    saveToSession('users', updatedUsers); // Save updated users to sessionStorage
    alert(`Password for ${user.username} has been reset to "default123".`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '20px' }}>
      <h3>Registered Users</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('role')} style={{ cursor: 'pointer' }}>
              Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('username')} style={{ cursor: 'pointer' }}>
              Username {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
              Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('points')} style={{ cursor: 'pointer' }}>
              Points {sortConfig.key === 'points' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            {currentUser && currentUser.role === 'admin' && <th>Password</th>}
            {currentUser && currentUser.role === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{editingUserId === user.username ? (
                <Form.Control
                  type="text"
                  name="role"
                  value={editableData.role}
                  onChange={handleInputChange}
                />
              ) : (
                user.role
              )}</td>
              <td>{editingUserId === user.username ? (
                <Form.Control
                  type="text"
                  name="name"
                  value={editableData.name}
                  onChange={handleInputChange}
                />
              ) : (
                user.name
              )}</td>
              <td>{editingUserId === user.username ? (
                <Form.Control
                  type="text"
                  name="username"
                  value={editableData.username}
                  onChange={handleInputChange}
                />
              ) : (
                user.username
              )}</td>
              <td>{editingUserId === user.username ? (
                <Form.Control
                  type="email"
                  name="email"
                  value={editableData.email}
                  onChange={handleInputChange}
                />
              ) : (
                user.email
              )}</td>
              <td>{editingUserId === user.username ? (
                <Form.Control
                  type="number"
                  name="points"
                  value={editableData.points}
                  onChange={handleInputChange}
                />
              ) : (
                user.points
              )}</td>
              {currentUser && currentUser.role === 'admin' && (
                <td>
                  {user.password ? user.password : 'N/A'}
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleResetPassword(user)}
                  >
                    Reset
                  </Button>
                </td>
              )}
              {currentUser && currentUser.role === 'admin' && (
                <td>
                  {editingUserId === user.username ? (
                    <>
                      <Button variant="success" onClick={handleSave} size="sm" style={{ marginRight: '5px' }}>
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditingUserId(null)}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(user)}
                      size="sm"
                    >
                      Edit
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
