import React, { useRef, useEffect, useState } from 'react';
import { X, Loader2, Mail, Eye, EyeOff, User, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

export const AuthModal = ({
  show,
  onClose,
  authMode,
  onAuthModeChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmit,
  onSocialLogin,
  onForgotPassword,
  showForgotPassword,
  onToggleForgotPassword,
  loading = false,
  error = ''
}) => {
  const emailInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Auto-focus no email quando o modal abre
  useEffect(() => {
    if (show && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  }, [show]);

  // Reset states when modal closes or mode changes
  useEffect(() => {
    if (!show) {
      setShowPassword(false);
      setShowConfirmPassword(false);
      setConfirmPassword('');
      setFullName('');
      setEmailError('');
      setPasswordError('');
      setIsEmailValid(false);
    }
  }, [show]);

  useEffect(() => {
    setConfirmPassword('');
    setPasswordError('');
  }, [authMode]);

  // Fechar modal com ESC
  useEffect(() => {
    if (!show) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [show, onClose]);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Email inválido');
      setIsEmailValid(false);
    } else if (email) {
      setEmailError('');
      setIsEmailValid(true);
    }
  };

  const handleEmailChange = (value) => {
    onEmailChange(value);
    if (emailError) {
      setEmailError('');
    }
    if (value && validateEmail(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  // Password validation
  const validatePasswordStrength = (pwd) => {
    const requirements = [
      pwd.length >= 8,
      /[A-Z]/.test(pwd),
      /[a-z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[^A-Za-z0-9]/.test(pwd)
    ];
    return requirements.filter(Boolean).length >= 4;
  };

  const handlePasswordChange = (value) => {
    onPasswordChange(value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleSubmit = () => {
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido');
      return;
    }

    // Validate password strength for signup
    if (authMode === 'signup' && !validatePasswordStrength(password)) {
      setPasswordError('A senha não atende aos requisitos mínimos de segurança');
      return;
    }

    // Validate password confirmation
    if (authMode === 'signup' && password !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return;
    }

    // Validate full name for signup
    if (authMode === 'signup' && !fullName.trim()) {
      return; // Field required validation handled by disabled button
    }

    onSubmit({ fullName: fullName.trim() });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      if (showForgotPassword) {
        onForgotPassword();
      } else {
        handleSubmit();
      }
    }
  };

  const isFormValid = () => {
    if (showForgotPassword) {
      return email && validateEmail(email);
    }

    if (authMode === 'signup') {
      return (
        email &&
        validateEmail(email) &&
        password &&
        confirmPassword &&
        password === confirmPassword &&
        validatePasswordStrength(password) &&
        fullName.trim()
      );
    }

    return email && password;
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-blue-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 w-full max-w-md relative shadow-2xl transform transition-all animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-all disabled:opacity-50 group"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              {showForgotPassword ? (
                <Mail className="w-6 h-6" />
              ) : authMode === 'signup' ? (
                <User className="w-6 h-6" />
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {showForgotPassword
                ? 'Recuperar Senha'
                : authMode === 'signup'
                ? 'Criar Conta'
                : 'Bem-vindo'}
            </h2>
          </div>
          <p className="text-white/60 text-sm">
            {showForgotPassword
              ? 'Enviaremos um link para redefinir sua senha'
              : authMode === 'signup'
              ? 'Preencha os dados para começar'
              : 'Entre para continuar sua jornada'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-100">{error}</p>
            </div>
          </div>
        )}

        {showForgotPassword ? (
          // FORGOT PASSWORD FORM
          <div className="space-y-5">
            <p className="text-sm text-white/70 mb-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              Digite seu email cadastrado e enviaremos um link para redefinir sua senha.
            </p>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="auth-email" className="block text-sm font-semibold text-white/80">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="auth-email"
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder:text-white/40"
                  placeholder="seu@email.com"
                  aria-required="true"
                />
                {isEmailValid && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 animate-fadeIn" />
                )}
              </div>
              {emailError && (
                <p className="text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                  <AlertCircle className="w-3 h-3" />
                  {emailError}
                </p>
              )}
            </div>

            <button
              onClick={onForgotPassword}
              disabled={loading || !isFormValid()}
              className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Enviar Link de Recuperação
                </>
              )}
            </button>

            <div className="mt-6 text-center">
              <button
                onClick={onToggleForgotPassword}
                disabled={loading}
                className="text-sm text-purple-300 hover:text-white transition-all disabled:opacity-50 font-medium"
              >
                ← Voltar para login
              </button>
            </div>
          </div>
        ) : (
          // LOGIN / SIGNUP FORM
          <div className="space-y-5">
            {/* Full Name (Signup only) */}
            {authMode === 'signup' && (
              <div className="space-y-2 animate-slideDown">
                <label htmlFor="auth-name" className="block text-sm font-semibold text-white/80">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    id="auth-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder:text-white/40"
                    placeholder="Seu nome completo"
                    aria-required="true"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="auth-email" className="block text-sm font-semibold text-white/80">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="auth-email"
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder:text-white/40"
                  placeholder="seu@email.com"
                  aria-required="true"
                  autoComplete="email"
                />
                {isEmailValid && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 animate-fadeIn" />
                )}
              </div>
              {emailError && (
                <p className="text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                  <AlertCircle className="w-3 h-3" />
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="auth-password" className="block text-sm font-semibold text-white/80">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder:text-white/40"
                  placeholder="••••••••"
                  aria-required="true"
                  autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator (Signup only) */}
            {authMode === 'signup' && password && (
              <div className="animate-slideDown">
                <PasswordStrengthIndicator password={password} />
              </div>
            )}

            {/* Confirm Password (Signup only) */}
            {authMode === 'signup' && (
              <div className="space-y-2 animate-slideDown">
                <label htmlFor="auth-confirm-password" className="block text-sm font-semibold text-white/80">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    id="auth-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className={`w-full pl-12 pr-12 py-3.5 bg-white/10 border rounded-xl focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder:text-white/40 ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-red-500 focus:border-red-400'
                        : confirmPassword && password === confirmPassword
                        ? 'border-green-500 focus:border-green-400'
                        : 'border-white/20 focus:border-purple-400'
                    }`}
                    placeholder="••••••••"
                    aria-required="true"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {confirmPassword && password === confirmPassword && (
                    <CheckCircle2 className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 animate-fadeIn" />
                  )}
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3 h-3" />
                    As senhas não coincidem
                  </p>
                )}
              </div>
            )}

            {/* Forgot Password Link (Login only) */}
            {authMode === 'signin' && (
              <div className="text-right">
                <button
                  onClick={onToggleForgotPassword}
                  disabled={loading}
                  className="text-sm text-purple-300 hover:text-white transition-all disabled:opacity-50 font-medium"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !isFormValid()}
              className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {authMode === 'signup' ? 'Criando conta...' : 'Entrando...'}
                </>
              ) : (
                <>{authMode === 'signup' ? 'Criar Conta' : 'Entrar'}</>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-blue-900/95 text-white/60 font-medium">
                  Ou continue com
                </span>
              </div>
            </div>

            {/* Social Login Button - Google */}
            <button
              onClick={() => onSocialLogin('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar com Google</span>
            </button>
          </div>
        )}

        {/* Toggle Auth Mode */}
        {!showForgotPassword && (
          <div className="mt-8 text-center">
            <p className="text-sm text-white/50">
              {authMode === 'signup' ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
              <button
                onClick={() => onAuthModeChange(authMode === 'signup' ? 'signin' : 'signup')}
                disabled={loading}
                className="text-purple-300 hover:text-white font-semibold transition-all disabled:opacity-50"
              >
                {authMode === 'signup' ? 'Entrar' : 'Criar conta'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
