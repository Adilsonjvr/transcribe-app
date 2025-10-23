import React from 'react';
import { Users, Info } from 'lucide-react';

export const DiarizationToggle = ({ enabled, onToggle, disabled = false }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
        <Users className="w-5 h-5 text-purple-400" />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">Identificar quem está falando</span>
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Informações sobre diarization"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Ideal para entrevistas e conversas com múltiplos participantes
          </p>
        </div>

        <button
          onClick={() => !disabled && onToggle(!enabled)}
          disabled={disabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-purple-500' : 'bg-gray-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          role="switch"
          aria-checked={enabled}
          aria-label="Ativar identificação de quem está falando"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Speaker Diarization
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2">
              <span className="text-purple-400">•</span>
              <span>Identifica automaticamente diferentes pessoas falando</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">•</span>
              <span>Rotula cada segmento com "Speaker 1", "Speaker 2", etc.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">•</span>
              <span>Perfeito para entrevistas, podcasts e reuniões</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-green-400">Áudios estéreo (2 canais): 100% de acurácia</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400">⚠</span>
              <span className="text-yellow-400">Áudios mono: usa IA para identificar (pode ter variação)</span>
            </li>
          </ul>
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-gray-400">
              <strong>Nota:</strong> Esta funcionalidade requer processamento adicional e pode aumentar o tempo de transcrição.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
