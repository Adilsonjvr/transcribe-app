import React from 'react';
import { Check, X } from 'lucide-react';

export const PasswordStrengthIndicator = ({ password }) => {
  const requirements = [
    {
      label: 'Mínimo 8 caracteres',
      test: (pwd) => pwd.length >= 8
    },
    {
      label: 'Uma letra maiúscula',
      test: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      label: 'Uma letra minúscula',
      test: (pwd) => /[a-z]/.test(pwd)
    },
    {
      label: 'Um número',
      test: (pwd) => /[0-9]/.test(pwd)
    },
    {
      label: 'Um caractere especial',
      test: (pwd) => /[^A-Za-z0-9]/.test(pwd)
    }
  ];

  const passedRequirements = requirements.filter(req => req.test(password));
  const strength = passedRequirements.length;

  const getStrengthLabel = () => {
    if (strength === 0) return { label: '', color: '' };
    if (strength <= 2) return { label: 'Fraca', color: 'text-red-400' };
    if (strength <= 3) return { label: 'Média', color: 'text-yellow-400' };
    if (strength <= 4) return { label: 'Boa', color: 'text-blue-400' };
    return { label: 'Forte', color: 'text-green-400' };
  };

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const strengthInfo = getStrengthLabel();

  if (!password) return null;

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/60">Força da senha</span>
          <span className={`text-xs font-semibold ${strengthInfo.color}`}>
            {strengthInfo.label}
          </span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                level <= strength
                  ? getStrengthColor()
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="bg-white/5 rounded-lg p-3 space-y-2">
        {requirements.map((req, index) => {
          const passed = req.test(password);
          return (
            <div
              key={index}
              className={`flex items-center gap-2 text-xs transition-all duration-200 ${
                passed ? 'text-green-400' : 'text-white/40'
              }`}
            >
              {passed ? (
                <Check className="w-4 h-4 flex-shrink-0" />
              ) : (
                <X className="w-4 h-4 flex-shrink-0" />
              )}
              <span className={passed ? 'font-medium' : ''}>{req.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
