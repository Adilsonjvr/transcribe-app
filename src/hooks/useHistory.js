import { useState, useEffect } from 'react';
import { STORAGE_KEYS, HISTORY_CONFIG } from '../config/constants';
import { countWords, countCharacters } from '../utils/formatters';
import {
  getUserTranscriptions,
  saveTranscription as saveToSupabase,
  deleteTranscription as deleteFromSupabase
} from '../services/transcriptionStorageService';

export const useHistory = (user) => {
  const [transcriptionHistory, setTranscriptionHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHistory(user.id);
    } else {
      setTranscriptionHistory([]);
      setLoading(false);
    }
  }, [user]);

  const loadHistory = async (userId) => {
    setLoading(true);
    try {
      // Tentar carregar do Supabase
      const result = await getUserTranscriptions(userId, { limit: 50 });

      if (result.success && result.transcriptions && result.transcriptions.length > 0) {
        // Converter formato do Supabase para formato do app
        const formattedHistory = result.transcriptions.map(t => ({
          id: t.id,
          fileName: t.file_name,
          transcription: t.transcription,
          wordCount: t.word_count,
          charCount: t.char_count,
          date: t.created_at,
          metadata: t.metadata,
          language: t.language,
          hasDiarization: t.has_diarization,
          hasTimestamps: t.has_timestamps
        }));
        setTranscriptionHistory(formattedHistory);
      } else {
        // Fallback: tentar localStorage (para migração)
        const localHistory = localStorage.getItem(`${STORAGE_KEYS.HISTORY_PREFIX}${userId}`);
        if (localHistory) {
          const parsed = JSON.parse(localHistory);
          setTranscriptionHistory(parsed);

          // Migrar dados do localStorage para Supabase em background
          migrateLocalToSupabase(userId, parsed);
        } else {
          setTranscriptionHistory([]);
        }
      }
    } catch (error) {
      console.error('Error loading history:', error);
      // Fallback para localStorage em caso de erro
      const localHistory = localStorage.getItem(`${STORAGE_KEYS.HISTORY_PREFIX}${userId}`);
      if (localHistory) {
        setTranscriptionHistory(JSON.parse(localHistory));
      }
    } finally {
      setLoading(false);
    }
  };

  // Migrar dados do localStorage para Supabase
  const migrateLocalToSupabase = async (userId, localData) => {
    try {
      for (const item of localData) {
        await saveToSupabase(userId, {
          fileName: item.fileName,
          transcription: item.transcription,
          wordCount: item.wordCount,
          charCount: item.charCount,
          language: 'pt-BR',
          metadata: item.metadata || {}
        });
      }
      // Limpar localStorage após migração bem-sucedida
      localStorage.removeItem(`${STORAGE_KEYS.HISTORY_PREFIX}${userId}`);
      console.log('✅ Dados migrados do localStorage para Supabase');
    } catch (error) {
      console.error('Erro ao migrar dados:', error);
    }
  };

  const saveToHistory = async (transcriptionData, fileName, metadata = {}) => {
    if (!user) return;

    const wordCount = countWords(transcriptionData);
    const charCount = countCharacters(transcriptionData);

    try {
      // Salvar no Supabase
      const result = await saveToSupabase(user.id, {
        fileName: fileName || 'Audio',
        transcription: transcriptionData,
        wordCount,
        charCount,
        language: metadata.language || 'pt-BR',
        hasDiarization: metadata.hasDiarization || false,
        hasTimestamps: metadata.hasTimestamps || false,
        metadata: metadata
      });

      if (result.success) {
        // Atualizar estado local
        const newItem = {
          id: result.transcription.id,
          fileName: result.transcription.file_name,
          transcription: result.transcription.transcription,
          wordCount: result.transcription.word_count,
          charCount: result.transcription.char_count,
          date: result.transcription.created_at,
          metadata: result.transcription.metadata,
          language: result.transcription.language,
          hasDiarization: result.transcription.has_diarization,
          hasTimestamps: result.transcription.has_timestamps
        };

        setTranscriptionHistory(prev => [newItem, ...prev]);
        return { success: true };
      }
    } catch (error) {
      console.error('Error saving to Supabase, falling back to localStorage:', error);

      // Fallback para localStorage
      const newItem = {
        id: Date.now(),
        fileName: fileName || 'Audio',
        transcription: transcriptionData,
        wordCount,
        charCount,
        date: new Date().toISOString()
      };

      const updatedHistory = [newItem, ...transcriptionHistory].slice(0, HISTORY_CONFIG.MAX_ITEMS);
      setTranscriptionHistory(updatedHistory);
      localStorage.setItem(`${STORAGE_KEYS.HISTORY_PREFIX}${user.id}`, JSON.stringify(updatedHistory));
    }
  };

  const deleteFromHistory = async (id) => {
    try {
      // Tentar deletar do Supabase
      const result = await deleteFromSupabase(id);

      if (result.success) {
        setTranscriptionHistory(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting from Supabase:', error);

      // Fallback para localStorage
      const updatedHistory = transcriptionHistory.filter(item => item.id !== id);
      setTranscriptionHistory(updatedHistory);
      if (user) {
        localStorage.setItem(`${STORAGE_KEYS.HISTORY_PREFIX}${user.id}`, JSON.stringify(updatedHistory));
      }
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
    loading,
    saveToHistory,
    deleteFromHistory,
    clearHistory
  };
};
