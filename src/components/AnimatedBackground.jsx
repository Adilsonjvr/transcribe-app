import React from 'react';

export const AnimatedBackground = () => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>

        <div className="absolute top-32 right-1/4 w-32 h-32 border-4 border-purple-400/30 rounded-2xl rotate-45 animate-float"></div>
        <div
          className="absolute bottom-32 left-1/4 w-24 h-24 border-4 border-blue-400/30 rounded-full animate-float"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg rotate-12 animate-float"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
