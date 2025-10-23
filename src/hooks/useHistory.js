import { useState, useEffect } from 'react';
import { STORAGE_KEYS, HISTORY_CONFIG } from '../config/constants';
import { countWords, countCharacters } from '../utils/formatters';

export const useHistory = (user) => {
  const [transcriptionHistory, setTranscriptionHistory] = useState([]);

  useEffect(() => {
    if (user) {
      loadHistory(user.id);
    } else {
      setTranscriptionHistory([]);
    }
  }, [user]);

  const loadHistory = (userId) => {
    const history = localStorage.getItem(`${STORAGE_KEYS.HISTORY_PREFIX}${userId}`);
    if (history) {
      setTranscriptionHistory(JSON.parse(history));
    }
  };

  const saveToHistory = (transcriptionData, fileName) => {
    if (!user) return;

    const newItem = {
      id: Date.now(),
      fileName: fileName || 'Audio',
      transcription: transcriptionData,
      wordCount: countWords(transcriptionData),
      charCount: countCharacters(transcriptionData),
      date: new Date().toISOString()
    };

    const updatedHistory = [newItem, ...transcriptionHistory].slice(0, HISTORY_CONFIG.MAX_ITEMS);
    setTranscriptionHistory(updatedHistory);
    localStorage.setItem(`${STORAGE_KEYS.HISTORY_PREFIX}${user.id}`, JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id) => {
    const updatedHistory = transcriptionHistory.filter(item => item.id !== id);
    setTranscriptionHistory(updatedHistory);
    if (user) {
      localStorage.setItem(`${STORAGE_KEYS.HISTORY_PREFIX}${user.id}`, JSON.stringify(updatedHistory));
    }
  };

  const clearHistory = () => {
    setTranscriptionHistory([]);
    if (user) {
      localStorage.removeItem(`${STORAGE_KEYS.HISTORY_PREFIX}${user.id}`);
    }
  };

  return {
    transcriptionHistory,
    saveToHistory,
    deleteFromHistory,
    clearHistory
  };
};
