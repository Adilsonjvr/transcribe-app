import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const AudioPreview = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(1);
      if (audioRef.current) audioRef.current.volume = 1;
    } else {
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!audioUrl) return null;

  return (
    <div className="mb-6 p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
      <audio ref={audioRef} src={audioUrl} />

      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col gap-4 sm:hidden">
        {/* Play Button + Time Display */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" fill="white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            )}
          </button>

          <div className="flex justify-between text-xs text-white/50 flex-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="h-2 bg-white/20 rounded-full cursor-pointer relative group"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="w-10 h-10 flex-shrink-0 rounded-full hover:bg-white/10 flex items-center justify-center transition-all"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5 text-white/70" />
            ) : (
              <Volume2 className="w-5 h-5 text-white/70" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
          />
        </div>

        {/* File Info */}
        <div className="text-sm text-white/50 text-center">
          Preview • {(file.size / (1024 * 1024)).toFixed(2)} MB
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" fill="white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            )}
          </button>

          <div className="flex-1">
            <div
              className="h-2 bg-white/20 rounded-full cursor-pointer relative group"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
              </div>
            </div>

            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5 text-white/70" />
              ) : (
                <Volume2 className="w-5 h-5 text-white/70" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>
        </div>

        <div className="text-sm text-white/50">
          Preview do áudio • Tamanho: {(file.size / (1024 * 1024)).toFixed(2)} MB
        </div>
      </div>
    </div>
  );
};
