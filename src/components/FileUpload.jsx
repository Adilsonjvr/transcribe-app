import React, { useRef } from 'react';
import { Upload, FileAudio, Loader2, Zap } from 'lucide-react';
import { FILE_CONFIG } from '../config/constants';
import { formatFileSize } from '../utils/formatters';
import { AudioPreview } from './AudioPreview';

export const FileUpload = ({
  file,
  isDragging,
  isUploading,
  isTranscribing,
  uploadProgress,
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  onUploadAndTranscribe
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="mb-12">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all bg-white/5 backdrop-blur-sm ${
          isDragging
            ? 'border-purple-400 bg-purple-500/10'
            : 'border-white/20 hover:border-white/40 hover:bg-white/10'
        }`}
      >
        <Upload className="w-16 h-16 mx-auto mb-6 text-purple-300" />
        <h3 className="text-2xl font-bold mb-2">
          {file ? file.name : 'Arraste seu arquivo aqui'}
        </h3>
        <p className="text-white/50 mb-8">
          ou clique para selecionar • MP3, WAV, M4A, FLAC, OGG • Máx: 50MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept={FILE_CONFIG.ACCEPT_TYPES}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all inline-flex items-center gap-2"
        >
          <FileAudio className="w-5 h-5" />
          Escolher Arquivo
        </button>

        {file && (
          <div className="mt-8 space-y-4">
            {/* Audio Preview */}
            <AudioPreview file={file} />

            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileAudio className="w-8 h-8 text-purple-400" />
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-white/50">
                      {formatFileSize(file.size)} MB
                    </p>
                  </div>
                </div>
              </div>

              {isUploading && (
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Enviando...</span>
                    <span className="text-sm font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {isTranscribing && (
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="font-medium">Transcrevendo áudio...</span>
                </div>
              )}

              <button
                onClick={onUploadAndTranscribe}
                disabled={isUploading || isTranscribing}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 rounded-full hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 disabled:text-white/50 transition-all flex items-center justify-center gap-2"
              >
                {isUploading || isTranscribing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isUploading ? 'Enviando...' : 'Transcrevendo...'}
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Transcrever Agora
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
