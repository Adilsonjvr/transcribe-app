import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../config/constants';
import { validateAuthFields } from '../utils/validators';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = () => {
    const validation = validateAuthFields(email, password);

    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const mockUser = {
      id: 'user-' + Date.now(),
      email: email,
      created_at: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
    setUser(mockUser);
    setShowAuthModal(false);
    setEmail('');
    setPassword('');

    return {
      user: mockUser,
      message: authMode === 'signup' ? 'Conta criada!' : 'Login realizado!'
    };
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
    return 'Logout realizado';
  };

  const requireAuth = (action) => {
    if (!user) {
      setShowAuthModal(true);
      throw new Error(`Faça login para ${action}`);
    }
    return true;
  };

  return {
    user,
    showAuthModal,
    setShowAuthModal,
    authMode,
    setAuthMode,
    email,
    setEmail,
    password,
    setPassword,
    handleAuth,
    handleLogout,
    requireAuth
  };
};
