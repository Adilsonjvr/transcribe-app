import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Zap, Home, Menu, X, LogOut } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { Logo } from './Logo';

export const Header = ({ user, profile, onAuthClick, onLogout, isDarkMode, onToggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Nome de exibição: nome completo ou email
  const displayName = profile?.full_name || user?.email || 'Usuário';
  // Primeiro nome apenas
  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Usuário';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="medium" showText={true} animated={true} />
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/app"
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  location.pathname === '/app'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-4 h-4" />
                Início
              </Link>
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  location.pathname === '/profile'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-4 h-4" />
                Perfil
              </Link>
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />

            {user ? (
              <>
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={displayName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="text-sm">{firstName}</span>
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
              <Link
                to="/app"
                onClick={closeMobileMenu}
                className={`px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  location.pathname === '/app'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Início</span>
              </Link>

              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className={`px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  location.pathname === '/profile'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Perfil</span>
              </Link>

              <div className="my-2 border-t border-white/10" />

              <div className="px-4 py-2 text-sm text-white/50 flex items-center gap-2">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <div className="flex flex-col truncate">
                  <span className="text-white font-medium">{displayName}</span>
                  <span className="text-xs text-white/40 truncate">{user.email}</span>
                </div>
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
