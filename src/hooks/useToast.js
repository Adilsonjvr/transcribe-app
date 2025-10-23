import { useState } from 'react';
import { TOAST_DURATION } from '../config/constants';

export const useToast = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), TOAST_DURATION);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), TOAST_DURATION);
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return {
    error,
    success,
    showError,
    showSuccess,
    clearMessages
  };
};
