import React from 'react';
import { User, Clock, FileAudio, ChevronRight, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export const ProfileView = ({
  user,
  transcriptionHistory,
  onViewChange,
  onLoadTranscription,
  onDeleteFromHistory
}) => {
  return (
    <div>
      <div className="mb-12">
        <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          MEU PERFIL
        </h2>
        <p className="text-white/60 text-lg">Gerencie suas transcrições e histórico</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{user.email}</h3>
            <p className="text-white/50">Membro desde {formatDate(user.created_at)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-white/50 text-sm mb-1">Total de Transcrições</p>
            <p className="text-3xl font-bold text-purple-400">{transcriptionHistory.length}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-white/50 text-sm mb-1">Palavras Transcritas</p>
            <p className="text-3xl font-bold text-blue-400">
              {transcriptionHistory.reduce((acc, item) => acc + item.wordCount, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-white/50 text-sm mb-1">Última Atividade</p>
            <p className="text-xl font-bold text-indigo-400">
              {transcriptionHistory.length > 0 ? 'Hoje' : 'Nunca'}
            </p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-400" />
          Histórico de Transcrições
        </h3>

        {transcriptionHistory.length === 0 ? (
          <div className="text-center py-12">
            <FileAudio className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <p className="text-white/50 text-lg">Nenhuma transcrição ainda</p>
            <button
              onClick={() => onViewChange('home')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Criar primeira transcrição
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {transcriptionHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <FileAudio className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <h4 className="font-medium truncate">{item.fileName}</h4>
                    </div>
                    <p className="text-sm text-white/50 line-clamp-2 mb-2">
                      {item.transcription}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span>{item.wordCount} palavras</span>
                      <span>•</span>
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLoadTranscription(item)}
                      className="p-2 hover:bg-white/10 rounded-full transition-all"
                      title="Carregar transcrição"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDeleteFromHistory(item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-full transition-all text-red-400"
                      title="Deletar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
