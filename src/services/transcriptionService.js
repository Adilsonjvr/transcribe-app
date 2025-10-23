import { API_CONFIG } from '../config/constants';

export const transcribeAudio = async (audioFile) => {
  console.log('Iniciando transcrição...');
  console.log('Arquivo:', audioFile.name, '|', (audioFile.size / 1024 / 1024).toFixed(2), 'MB');

  // Criar FormData com o arquivo
  const formData = new FormData();
  formData.append('file', audioFile);
  formData.append('language', 'pt');

  // Chamar Edge Function
  const response = await fetch(API_CONFIG.EDGE_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'apikey': API_CONFIG.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${API_CONFIG.SUPABASE_ANON_KEY}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Erro desconhecido na transcrição');
  }

  const transcribedText = data.text;

  if (!transcribedText) {
    throw new Error('Nenhum texto foi transcrito');
  }

  return transcribedText;
};

export const simulateUpload = (onProgress) => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        resolve();
      }
    }, 150);
  });
};
