import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8 relative z-10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-white/30 text-sm">
          Desenvolvido com React + Anthropic Claude API
        </p>
      </div>
    </footer>
  );
};
