import { useState, useEffect } from 'react';
import { validateFile } from '../utils/validators';
import { transcribeAudio, simulateUpload } from '../services/transcriptionService';
import { countWords, countCharacters } from '../utils/formatters';

export const useTranscription = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [audioFileId, setAudioFileId] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (transcription) {
      setWordCount(countWords(transcription));
      setCharCount(countCharacters(transcription));
    }
  }, [transcription]);

  const validateAndSetFile = (selectedFile) => {
    const validation = validateFile(selectedFile);

    if (!validation.isValid) {
      throw new Error(validation.errors[0]);
    }

    setFile(selectedFile);
    return 'Arquivo selecionado!';
  };

  const handleUploadAndTranscribe = async () => {
    if (!file) {
      throw new Error('Selecione um arquivo primeiro');
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simular upload
      await simulateUpload(setUploadProgress);

      setIsUploading(false);
      const mockAudioFileId = 'audio-' + Date.now();
      setAudioFileId(mockAudioFileId);

      // Transcrever
      setIsTranscribing(true);
      const transcribedText = await transcribeAudio(file);

      setTranscription(transcribedText);
      setIsTranscribing(false);

      return {
        success: true,
        text: transcribedText,
        message: '✓ Transcrição concluída!'
      };
    } catch (err) {
      setIsUploading(false);
      setIsTranscribing(false);
      throw err;
    }
  };

  const handleNewTranscription = () => {
    setFile(null);
    setTranscription('');
    setUploadProgress(0);
    setAudioFileId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      return validateAndSetFile(droppedFile);
    }
  };

  return {
    file,
    setFile,
    uploadProgress,
    isUploading,
    isTranscribing,
    transcription,
    setTranscription,
    audioFileId,
    wordCount,
    charCount,
    isDragging,
    validateAndSetFile,
    handleUploadAndTranscribe,
    handleNewTranscription,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
