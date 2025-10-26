import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Check localStorage for saved language, default to PT-BR
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('app_language');
    return saved || 'pt-BR';
  });

  // Save to localStorage when language changes
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt-BR' ? 'en' : 'pt-BR');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isPortuguese: language === 'pt-BR',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
