import React from 'react';
import { Copy, Download, RefreshCw, FileText, FileJson } from 'lucide-react';

export const TranscriptionResult = ({
  transcription,
  wordCount,
  charCount,
  onTranscriptionChange,
  onCopy,
  onDownloadTxt,
  onDownloadJson,
  onDownloadPdf,
  onDownloadDocx,
  onNewTranscription
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            TRANSCRIÇÃO
          </h2>
          <p className="text-white/50">
            {wordCount} palavras • {charCount} caracteres
          </p>
        </div>
        <button
          onClick={onNewTranscription}
          className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Nova
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6">
        <textarea
          value={transcription}
          onChange={(e) => onTranscriptionChange(e.target.value)}
          className="w-full min-h-[400px] bg-transparent border-none focus:outline-none text-lg leading-relaxed resize-none placeholder-white/30"
          placeholder="Sua transcrição aparecerá aqui..."
        />
      </div>

      <div className="space-y-4">
        {/* Botão Copiar - Destaque */}
        <button
          onClick={onCopy}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
        >
          <Copy className="w-5 h-5" />
          Copiar Texto
        </button>

        {/* Botões de Download */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={onDownloadTxt}
            className="px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
          >
            <Download className="w-5 h-5" />
            <span className="text-sm font-medium">TXT</span>
          </button>

          <button
            onClick={onDownloadJson}
            className="px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
          >
            <FileJson className="w-5 h-5" />
            <span className="text-sm font-medium">JSON</span>
          </button>

          <button
            onClick={onDownloadPdf}
            className="px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">PDF</span>
          </button>

          <button
            onClick={onDownloadDocx}
            className="px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">DOCX</span>
          </button>
        </div>
      </div>
    </div>
  );
};
