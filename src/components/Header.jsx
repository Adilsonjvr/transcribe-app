import React, { useState } from 'react';
import { User, Zap, Home, Menu, X, LogOut } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';

export const Header = ({ user, currentView, onViewChange, onAuthClick, onLogout, isDarkMode, onToggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (view) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight">TRANSCRIBE</h1>
              <p className="text-xs text-white/50">Audio to Text AI</p>
            </div>
          </div>

          {/* Desktop Navigation */}
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />

            {user ? (
              <>
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm hover:bg-white/10 rounded-full transition-all"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Entrar
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />

            {user ? (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-blue-600 transition-all text-sm"
              >
                Entrar
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10 animate-fadeIn">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigation('home')}
                className={`px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  currentView === 'home'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Início</span>
              </button>

              <button
                onClick={() => handleNavigation('profile')}
                className={`px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  currentView === 'profile'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Perfil</span>
              </button>

              <div className="my-2 border-t border-white/10" />

              <div className="px-4 py-2 text-sm text-white/50 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-lg transition-all flex items-center gap-3 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
