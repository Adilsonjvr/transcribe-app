import { useState, useEffect, useCallback } from 'react';
import { validateAuthFields } from '../utils/validators';
import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  onAuthStateChange,
  resetPassword
} from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Carregar usuário ao iniciar e escutar mudanças
  useEffect(() => {
    // Obter usuário atual
    const loadUser = async () => {
      try {
        const { user: currentUser } = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Listener para mudanças de autenticação
    const { data: { subscription } } = onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  /**
   * Fazer login ou signup
   */
  const handleAuth = useCallback(async () => {
    // Validar campos
    const validation = validateAuthFields(email, password);

    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    setAuthLoading(true);

    try {
      let result;

      if (authMode === 'signup') {
        result = await signUp(email, password);
      } else {
        result = await signIn(email, password);
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      // Sucesso
      setUser(result.user);
      setShowAuthModal(false);
      setEmail('');
      setPassword('');

      return {
        user: result.user,
        message: authMode === 'signup'
          ? 'Conta criada! Verifique seu email para confirmar.'
          : 'Login realizado com sucesso!'
      };
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }, [email, password, authMode]);

  /**
   * Fazer logout
   */
  const handleLogout = useCallback(async () => {
    setAuthLoading(true);

    try {
      const result = await signOut();

      if (!result.success) {
        throw new Error(result.error);
      }

      setUser(null);
      return 'Logout realizado com sucesso';
    } catch (error) {
      throw new Error('Erro ao fazer logout');
    } finally {
      setAuthLoading(false);
    }
  }, []);

  /**
   * Recuperar senha
   */
  const handleForgotPassword = useCallback(async () => {
    if (!email) {
      throw new Error('Digite seu email para recuperar a senha');
    }

    setAuthLoading(true);

    try {
      const result = await resetPassword(email);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.message;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }, [email]);

  /**
   * Verificar se usuário está autenticado antes de uma ação
   */
  const requireAuth = useCallback((action) => {
    if (!user) {
      setShowAuthModal(true);
      throw new Error(`Faça login para ${action}`);
    }
    return true;
  }, [user]);

  /**
   * Alternar entre login e signup
   */
  const toggleAuthMode = useCallback(() => {
    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setShowForgotPassword(false);
  }, []);

  /**
   * Mostrar tela de esqueci senha
   */
  const toggleForgotPassword = useCallback(() => {
    setShowForgotPassword(prev => !prev);
  }, []);

  return {
    // Estado
    user,
    loading,
    authLoading,
    showAuthModal,
    authMode,
    email,
    password,
    showForgotPassword,

    // Setters
    setShowAuthModal,
    setAuthMode,
    setEmail,
    setPassword,

    // Ações
    handleAuth,
    handleLogout,
    handleForgotPassword,
    requireAuth,
    toggleAuthMode,
    toggleForgotPassword
  };
};
