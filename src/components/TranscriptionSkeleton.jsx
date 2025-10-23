import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export const TranscriptionSkeleton = ({ progress = 0 }) => {
  return (
    <div className="space-y-6">
      {/* Header com animação */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
            TRANSCREVENDO...
          </h2>
          <div className="flex items-center gap-2 text-white/50">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">
              Processando seu áudio com IA...
            </span>
          </div>
        </div>
        <div className="relative">
          <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
        </div>
      </div>

      {/* Barra de progresso */}
      {progress > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/70">Progresso</span>
            <span className="text-sm font-bold text-purple-400">{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Skeleton do resultado */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <div className="space-y-4 animate-pulse">
          {/* Linha 1 */}
          <div className="h-4 bg-white/20 rounded-full w-full" />
          <div className="h-4 bg-white/20 rounded-full w-11/12" />
          <div className="h-4 bg-white/20 rounded-full w-full" />
          <div className="h-4 bg-white/20 rounded-full w-10/12" />

          <div className="py-3" />

          {/* Linha 2 */}
          <div className="h-4 bg-white/20 rounded-full w-full" />
          <div className="h-4 bg-white/20 rounded-full w-9/12" />
          <div className="h-4 bg-white/20 rounded-full w-11/12" />

          <div className="py-3" />

          {/* Linha 3 */}
          <div className="h-4 bg-white/20 rounded-full w-full" />
          <div className="h-4 bg-white/20 rounded-full w-10/12" />
          <div className="h-4 bg-white/20 rounded-full w-full" />
          <div className="h-4 bg-white/20 rounded-full w-8/12" />
        </div>

        {/* Efeito shimmer overlay */}
        <div className="relative mt-8 overflow-hidden rounded-lg">
          <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_linear_infinite]" />
        </div>
      </div>

      {/* Dicas enquanto processa */}
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-purple-200 font-medium mb-1">
              Processamento IA em andamento
            </p>
            <p className="text-xs text-purple-300/70">
              Estamos analisando seu áudio com tecnologia de ponta.
              Isso pode levar alguns instantes dependendo do tamanho do arquivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
