import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { getFromSession, saveToSession } from '../utils/SessionStorage';

const UserManagement = () => {
  const users = getFromSession('users') || [];
  const currentUser = getFromSession('currentUser');

  const handleRoleChange = (username, role) => {
    if (currentUser.role !== 'admin') return;
    const updatedUsers = users.map((user) =>
      user.username === username ? { ...user, role } : user
    );
    saveToSession('users', updatedUsers);
  };

  return (
    <Table striped bordered hover>
      <tbody>
  {users.map((user) => (
    <tr key={user.username}>
      <td>{user.username}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Form.Check
          type="radio"
          label="Regular"
          name={`role-${user.username}`}
          checked={user.role === 'regular'}
          onChange={() => handleRoleChange(user.username, 'regular')}
          disabled={currentUser.role !== 'admin'}
        />
        <Form.Check
          type="radio"
          label="Admin"
          name={`role-${user.username}`}
          checked={user.role === 'admin'}
          onChange={() => handleRoleChange(user.username, 'admin')}
          disabled={currentUser.role !== 'admin'}
        />
      </td>
    </tr>
  ))}
</tbody>

    </Table>
  );
};

export default UserManagement;
