import React from 'react';
import { Mic, Zap, Sparkles } from 'lucide-react';

export const Logo = ({ size = 'medium', showText = true, animated = false }) => {
  const sizes = {
    small: {
      container: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-base',
      tagline: 'text-[8px]'
    },
    medium: {
      container: 'w-12 h-12',
      icon: 'w-6 h-6',
      text: 'text-xl',
      tagline: 'text-xs'
    },
    large: {
      container: 'w-16 h-16',
      icon: 'w-8 h-8',
      text: 'text-2xl',
      tagline: 'text-sm'
    }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon with Gradient */}
      <div className={`${currentSize.container} bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center relative overflow-hidden group ${animated ? 'hover-scale' : ''}`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl" />

        {/* Icon with animation */}
        <div className="relative z-10">
          <Mic className={`${currentSize.icon} text-white ${animated ? 'group-hover:animate-wiggle' : ''}`} />
        </div>

        {/* Sparkle effect on hover */}
        {animated && (
          <Sparkles className={`${currentSize.icon} text-yellow-300 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`} />
        )}
      </div>

      {/* Logo Text */}
      {showText && (
        <div>
          <h1 className={`${currentSize.text} font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 ${animated ? 'animate-gradient' : ''}`}>
            TRANSCRIBE
          </h1>
          <p className={`${currentSize.tagline} text-white/50 font-medium tracking-wider`}>
            AI-Powered Transcription
          </p>
        </div>
      )}
    </div>
  );
};
