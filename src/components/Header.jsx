import React from 'react';
import { User, Zap, Home } from 'lucide-react';

export const Header = ({ user, currentView, onViewChange, onAuthClick, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">TRANSCRIBE</h1>
              <p className="text-xs text-white/50">Audio to Text AI</p>
            </div>
          </div>

          {user && (
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onViewChange('home')}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  currentView === 'home'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-4 h-4" />
                Início
              </button>
              <button
                onClick={() => onViewChange('profile')}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  currentView === 'profile'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-4 h-4" />
                Perfil
              </button>
            </nav>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <User className="w-4 h-4" />
              <span className="text-sm">{user.email}</span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm hover:bg-white/10 rounded-full transition-all"
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={onAuthClick}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Entrar
          </button>
        )}
      </div>
    </header>
  );
};
