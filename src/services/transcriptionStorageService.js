import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fbxdfjkptlfyexhhsgpy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZieGRmamtwdGxmeWV4aGhzZ3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMDgwNDgsImV4cCI6MjA1Njc4NDA0OH0.sJ5_qI2_T7LJxzkUb8MhBzIuRtR0P0l1WH_kDVBZIQE';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Salva uma nova transcrição no banco de dados
 */
export const saveTranscription = async (userId, transcriptionData) => {
  try {
    const { data, error } = await supabase
      .from('transcriptions')
      .insert([{
        user_id: userId,
        file_name: transcriptionData.fileName,
        file_size: transcriptionData.fileSize,
        file_type: transcriptionData.fileType,
        transcription: transcriptionData.transcription,
        language: transcriptionData.language,
        has_diarization: transcriptionData.hasDiarization || false,
        has_timestamps: transcriptionData.hasTimestamps || false,
        word_count: transcriptionData.wordCount,
        char_count: transcriptionData.charCount,
        duration_seconds: transcriptionData.duration,
        audio_url: transcriptionData.audioUrl,
        metadata: transcriptionData.metadata || {}
      }])
      .select()
      .single();

    if (error) throw error;

    return { success: true, transcription: data };
  } catch (error) {
    console.error('Error saving transcription:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Busca todas as transcrições de um usuário
 */
export const getUserTranscriptions = async (userId, options = {}) => {
  try {
    const { limit = 50, offset = 0 } = options;

    let query = supabase
      .from('transcriptions')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { success: true, transcriptions: data, total: count };
  } catch (error) {
    console.error('Error fetching transcriptions:', error);
    return { success: false, error: error.message, transcriptions: [] };
  }
};

/**
 * Busca uma transcrição específica
 */
export const getTranscription = async (transcriptionId) => {
  try {
    const { data, error } = await supabase
      .from('transcriptions')
      .select('*')
      .eq('id', transcriptionId)
      .single();

    if (error) throw error;

    return { success: true, transcription: data };
  } catch (error) {
    console.error('Error fetching transcription:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Atualiza uma transcrição existente
 */
export const updateTranscription = async (transcriptionId, updates) => {
  try {
    const { data, error } = await supabase
      .from('transcriptions')
      .update(updates)
      .eq('id', transcriptionId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, transcription: data };
  } catch (error) {
    console.error('Error updating transcription:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Deleta uma transcrição
 */
export const deleteTranscription = async (transcriptionId) => {
  try {
    const { error } = await supabase
      .from('transcriptions')
      .delete()
      .eq('id', transcriptionId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting transcription:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Busca transcrições com filtro de busca
 */
export const searchTranscriptions = async (userId, searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('transcriptions')
      .select('*')
      .eq('user_id', userId)
      .or(`file_name.ilike.%${searchTerm}%,transcription.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false})
      .limit(50);

    if (error) throw error;

    return { success: true, transcriptions: data };
  } catch (error) {
    console.error('Error searching transcriptions:', error);
    return { success: false, error: error.message, transcriptions: [] };
  }
};

/**
 * Obtém estatísticas de uso do usuário
 */
export const getUserStats = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('transcriptions')
      .select('word_count, char_count, duration_seconds')
      .eq('user_id', userId);

    if (error) throw error;

    const stats = {
      totalTranscriptions: data.length,
      totalWords: data.reduce((sum, t) => sum + (t.word_count || 0), 0),
      totalCharacters: data.reduce((sum, t) => sum + (t.char_count || 0), 0),
      totalMinutes: Math.round(data.reduce((sum, t) => sum + (t.duration_seconds || 0), 0) / 60)
    };

    return { success: true, stats };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return { success: false, error: error.message };
  }
};
