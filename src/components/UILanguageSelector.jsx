import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const UILanguageSelector = ({ variant = 'default' }) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  if (variant === 'compact') {
    // Versão compacta para mobile/header
    return (
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-white/60" />
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="bg-white/10 text-white text-sm px-2 py-1 rounded border border-white/20 hover:bg-white/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="pt-BR" className="bg-gray-900">PT</option>
          <option value="en" className="bg-gray-900">EN</option>
        </select>
      </div>
    );
  }

  // Versão padrão - botões toggle
  return (
    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
      <button
        onClick={() => handleLanguageChange('pt-BR')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          language === 'pt-BR'
            ? 'bg-white text-purple-600 shadow-lg'
            : 'text-white/70 hover:text-white'
        }`}
      >
        🇧🇷 PT
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-white text-purple-600 shadow-lg'
            : 'text-white/70 hover:text-white'
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  );
};
