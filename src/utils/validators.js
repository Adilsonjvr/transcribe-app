import { FILE_CONFIG } from '../config/constants';

export const validateFile = (file) => {
  const errors = [];

  // Validar extensão
  const validExtensions = FILE_CONFIG.VALID_EXTENSIONS;
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

  if (!validExtensions.includes(fileExtension)) {
    errors.push('Formato não suportado. Use: MP3, WAV, M4A, FLAC ou OGG');
  }

  // Validar tamanho
  if (file.size > FILE_CONFIG.MAX_SIZE) {
    errors.push('Arquivo muito grande. Máximo: 50MB');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAuthFields = (email, password) => {
  if (!email || !password) {
    return { isValid: false, error: 'Preencha todos os campos' };
  }

  if (!validateEmail(email)) {
    return { isValid: false, error: 'Email inválido' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Senha deve ter pelo menos 6 caracteres' };
  }

  return { isValid: true };
};
