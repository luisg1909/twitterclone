import { getFromSession, saveToSession } from './SessionStorage';

export const login = (username) => {
  const users = getFromSession('userst') || [];
  const user = users.find((u) => u.username === username);
  if (user) saveToSession('currentUsert', user);
  return user;
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem('currentUsert');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  sessionStorage.removeItem('currentUsert'); // Remove the current user
};

export const getCurrentPath = () => { 
  return 'xpressnetwork';
};

