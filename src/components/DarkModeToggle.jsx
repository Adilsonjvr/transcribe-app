import React from 'react';
import { Moon, Sun } from 'lucide-react';

export const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
      style={{
        backgroundColor: isDarkMode ? '#6366f1' : '#f59e0b'
      }}
      aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {/* Bolinha que desliza */}
      <div
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center"
        style={{
          left: isDarkMode ? 'calc(100% - 24px)' : '4px'
        }}
      >
        {isDarkMode ? (
          <Moon className="w-3 h-3 text-indigo-600" />
        ) : (
          <Sun className="w-3 h-3 text-amber-600" />
        )}
      </div>

      {/* Ícones de fundo */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className="w-3.5 h-3.5 text-white/70" />
        <Moon className="w-3.5 h-3.5 text-white/70" />
      </div>
    </button>
  );
};
