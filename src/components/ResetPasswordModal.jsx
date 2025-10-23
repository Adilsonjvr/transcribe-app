import React, { useState, useEffect } from 'react';
import { X, Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import { updatePassword } from '../services/authService';

export const ResetPasswordModal = ({ show, onClose, onSuccess }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (show) {
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = async () => {
    setError('');

    // Validações
    if (!newPassword || !confirmPassword) {
      setError('Preencha ambos os campos');
      return;
    }

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const result = await updatePassword(newPassword);

      if (!result.success) {
        setError(result.error);
        return;
      }

      onSuccess(result.message);
      onClose();
    } catch (err) {
      setError(err.message || 'Erro ao atualizar senha');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Redefinir Senha</h2>
            <p className="text-sm text-white/70">Digite sua nova senha</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-sm text-red-100">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-white/70 mb-2">
              Nova Senha
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50"
                placeholder="Mínimo 6 caracteres"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-all"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-white/50" />
                ) : (
                  <Eye className="w-5 h-5 text-white/50" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-white/70 mb-2">
              Confirmar Senha
            </label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50"
              placeholder="Digite a senha novamente"
            />
          </div>

          {newPassword && (
            <div className="text-sm">
              <p className="text-white/70 mb-2">Força da senha:</p>
              <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded ${newPassword.length >= 6 ? 'bg-green-500' : 'bg-white/20'}`}></div>
                <div className={`h-1 flex-1 rounded ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-white/20'}`}></div>
                <div className={`h-1 flex-1 rounded ${newPassword.length >= 10 && /[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-white/20'}`}></div>
                <div className={`h-1 flex-1 rounded ${newPassword.length >= 12 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-white/20'}`}></div>
              </div>
              <p className="text-xs text-white/50 mt-1">
                {newPassword.length < 6 ? 'Fraca' : newPassword.length < 8 ? 'Regular' : newPassword.length < 10 ? 'Boa' : 'Forte'}
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !newPassword || !confirmPassword}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Redefinir Senha
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
