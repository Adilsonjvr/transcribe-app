// IMPORTANTE: Não coloque API keys diretamente aqui!
// Use variáveis de ambiente (.env) para maior segurança
export const API_CONFIG = {
  EDGE_FUNCTION_URL: import.meta.env.VITE_EDGE_FUNCTION_URL || 'https://fbxdfjkptlfyexhhsgpy.supabase.co/functions/v1/dynamic-processor',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};

export const FILE_CONFIG = {
  MAX_SIZE: 50 * 1024 * 1024, // 50MB
  VALID_EXTENSIONS: ['.mp3', '.wav', '.m4a', '.flac', '.ogg'],
  ACCEPT_TYPES: 'audio/*,.mp3,.wav,.m4a,.flac,.ogg'
};

export const STORAGE_KEYS = {
  USER: 'user',
  HISTORY_PREFIX: 'history_'
};

export const UPLOAD_CONFIG = {
  PROGRESS_INTERVAL: 150,
  PROGRESS_STEP: 10
};

export const HISTORY_CONFIG = {
  MAX_ITEMS: 20
};

export const TOAST_DURATION = 2000;
