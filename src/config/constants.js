export const API_CONFIG = {
  EDGE_FUNCTION_URL: 'https://fbxdfjkptlfyexhhsgpy.supabase.co/functions/v1/dynamic-processor',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZieGRmamtwdGxmeWV4aGhzZ3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMjIwNzAsImV4cCI6MjA3NjY5ODA3MH0.QCkbiONVjRCwIldHA6JDanMN5l3VR56Palp4xQM5kKU'
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
