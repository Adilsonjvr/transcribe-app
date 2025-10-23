import React from 'react';
import { X } from 'lucide-react';

export const AuthModal = ({
  show,
  onClose,
  authMode,
  onAuthModeChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmit
}) => {
  if (!show) return null;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {authMode === 'signup' ? 'Criar Conta' : 'Entrar'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            {authMode === 'signup' ? 'Criar Conta' : 'Entrar'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onAuthModeChange(authMode === 'signup' ? 'signin' : 'signup')}
            className="text-sm text-white/50 hover:text-white transition-all"
          >
            {authMode === 'signup' ? 'Já tem conta? Entrar' : 'Não tem conta? Criar'}
          </button>
        </div>
      </div>
    </div>
  );
};
