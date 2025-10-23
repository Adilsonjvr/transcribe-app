import React, { useState, useRef } from 'react';
import { Play, Pause, Copy, Download, RefreshCw, Clock } from 'lucide-react';

export const TimestampedTranscription = ({
  segments = [],
  onCopy,
  onDownloadTxt,
  onDownloadJson,
  onNewTranscription,
  audioFile = null
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);

  // Criar URL do áudio
  React.useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [audioFile]);

  // Atualizar tempo atual do áudio
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const jumpToTime = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      if (!isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const wordCount = segments.reduce((acc, seg) => acc + seg.text.split(' ').length, 0);
  const charCount = segments.reduce((acc, seg) => acc + seg.text.length, 0);

  // Encontrar segmento atual baseado no tempo
  const currentSegmentIndex = segments.findIndex(
    (seg, idx) => {
      const nextSeg = segments[idx + 1];
      return currentTime >= seg.start && (!nextSeg || currentTime < nextSeg.start);
    }
  );

  return (
    <div>
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            TRANSCRIÇÃO
          </h2>
          <p className="text-white/50">
            {wordCount} palavras • {charCount} caracteres • {segments.length} segmentos
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

      {/* Player de áudio (se disponível) */}
      {audioUrl && (
        <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              )}
            </button>
            <div className="flex-1">
              <div className="text-sm text-white/70 mb-1">
                {formatTime(currentTime)} / {formatTime(audioRef.current?.duration || 0)}
              </div>
              <div className="text-xs text-white/50">
                Clique nos timestamps abaixo para navegar
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Segmentos com timestamps */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6 max-h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {segments.map((segment, index) => {
            const isActive = index === currentSegmentIndex;
            const isHovered = index === hoveredSegment;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`group p-4 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-500/20 border border-purple-500/50'
                    : isHovered
                    ? 'bg-white/5'
                    : 'hover:bg-white/5'
                }`}
                onClick={() => jumpToTime(segment.start)}
              >
                <div className="flex items-start gap-3">
                  <button
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-mono hover:bg-white/20 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      jumpToTime(segment.start);
                    }}
                  >
                    <Clock className="w-3 h-3 text-purple-400" />
                    {formatTime(segment.start)}
                  </button>
                  <p className="flex-1 text-lg leading-relaxed">
                    {segment.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onCopy}
          className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
        >
          <Copy className="w-5 h-5" />
          Copiar
        </button>

        <button
          onClick={onDownloadTxt}
          className="flex-1 sm:flex-none px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Download className="w-5 h-5" />
          TXT
        </button>

        <button
          onClick={onDownloadJson}
          className="flex-1 sm:flex-none px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Download className="w-5 h-5" />
          JSON
        </button>
      </div>
    </div>
  );
};
