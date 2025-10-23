import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

export const ToastMessage = ({ message, type = 'success' }) => {
  if (!message) return null;

  const isError = type === 'error';

  return (
    <div
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-xl flex items-center gap-2 ${
        isError
          ? 'bg-red-500/20 border border-red-500 text-red-100'
          : 'bg-green-500/20 border border-green-500 text-green-100'
      } ${!isError ? '' : 'max-w-md'}`}
    >
      {isError ? (
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
      ) : (
        <Check className="w-5 h-5" />
      )}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
