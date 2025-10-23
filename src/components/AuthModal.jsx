import React, { useRef, useEffect } from 'react';
import { X, Loader2, Mail } from 'lucide-react';

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
  onForgotPassword,
  showForgotPassword,
  onToggleForgotPassword,
  loading = false
}) => {
  const emailInputRef = useRef(null);

  // Auto-focus no email quando o modal abre
  useEffect(() => {
    if (show && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [show]);

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

  if (!show) return null;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      if (showForgotPassword) {
        onForgotPassword();
      } else {
        onSubmit();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {showForgotPassword
            ? 'Recuperar Senha'
            : authMode === 'signup'
              ? 'Criar Conta'
              : 'Entrar'}
        </h2>

        {showForgotPassword ? (
          // FORGOT PASSWORD FORM
          <div className="space-y-4">
            <p className="text-sm text-white/70 mb-4">
              Digite seu email para receber um link de recuperação de senha.
            </p>

            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-white/70 mb-2">
                Email
              </label>
              <input
                id="auth-email"
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="seu@email.com"
                aria-required="true"
              />
            </div>

            <button
              onClick={onForgotPassword}
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Enviar Email
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <button
                onClick={onToggleForgotPassword}
                disabled={loading}
                className="text-sm text-white/50 hover:text-white transition-all disabled:opacity-50"
              >
                Voltar para login
              </button>
            </div>
          </div>
        ) : (
          // LOGIN / SIGNUP FORM
          <div className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-white/70 mb-2">
                Email
              </label>
              <input
                id="auth-email"
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="seu@email.com"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-sm font-medium text-white/70 mb-2">
                Senha
              </label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
                aria-required="true"
              />
            </div>

            {authMode === 'signin' && (
              <div className="text-right">
                <button
                  onClick={onToggleForgotPassword}
                  disabled={loading}
                  className="text-sm text-white/50 hover:text-white transition-all disabled:opacity-50"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              onClick={onSubmit}
              disabled={loading || !email || !password}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          </div>
        )}

        {!showForgotPassword && (
          <div className="mt-6 text-center">
            <button
              onClick={() => onAuthModeChange(authMode === 'signup' ? 'signin' : 'signup')}
              disabled={loading}
              className="text-sm text-white/50 hover:text-white transition-all disabled:opacity-50"
            >
              {authMode === 'signup' ? 'Já tem conta? Entrar' : 'Não tem conta? Criar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
