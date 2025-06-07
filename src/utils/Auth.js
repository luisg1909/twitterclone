import { getFromSession, saveToSession } from './SessionStorage';

export const login = (username) => {
  const users = getFromSession('users') || [];
  const user = users.find((u) => u.username === username);
  if (user) saveToSession('currentUser', user);
  return user;
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  sessionStorage.removeItem('currentUser'); // Remove the current user
};

export const getCurrentPath = () => { 
  return 'xpressnetwork';
};

