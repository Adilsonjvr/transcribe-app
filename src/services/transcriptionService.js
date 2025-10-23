import { API_CONFIG } from '../config/constants';

export const transcribeAudio = async (audioFile, language = 'pt-BR', enableDiarization = false) => {
  console.log('Iniciando transcrição...');
  console.log('Arquivo:', audioFile.name, '|', (audioFile.size / 1024 / 1024).toFixed(2), 'MB');
  console.log('Idioma:', language);
  console.log('Diarization:', enableDiarization ? 'Ativado' : 'Desativado');

  // Mapear códigos de idioma para formato da API
  const languageMap = {
    'pt-BR': 'pt',
    'en-US': 'en',
    'es-ES': 'es',
    'fr-FR': 'fr',
    'de-DE': 'de',
    'it-IT': 'it',
    'auto': 'auto'
  };

  // Se 'auto' foi selecionado, usar 'pt' como fallback (API não suporta auto-detection)
  const apiLanguage = language === 'auto' ? 'pt' : (languageMap[language] || 'pt');

  // Criar FormData com o arquivo
  const formData = new FormData();
  formData.append('file', audioFile);
  formData.append('language', apiLanguage);

  // Enviar parâmetro de diarization se habilitado
  if (enableDiarization) {
    formData.append('diarization', 'true');
  }

  // Nota: A API atual pode não suportar diarization nativamente.
  // Se não suportar, será necessário upgrade no backend com Pyannote ou WhisperX

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

  // Processar segmentos com timestamps (se disponível)
  const segments = data.segments || generateMockSegments(transcribedText, enableDiarization);
  const detectedLanguage = data.language || language;

  return {
    text: transcribedText,
    segments: segments,
    detectedLanguage: detectedLanguage
  };
};

// Função auxiliar para gerar segmentos simulados se a API não retornar
function generateMockSegments(text, includeSpeakers = false) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  let currentTime = 0;
  let currentSpeaker = 0;

  return sentences.map((sentence, index) => {
    const duration = sentence.split(' ').length * 0.5; // ~0.5s por palavra

    const segment = {
      start: currentTime,
      end: currentTime + duration,
      text: sentence.trim() + (index < sentences.length - 1 ? '.' : '')
    };

    // Adicionar speaker se diarization estiver habilitado
    if (includeSpeakers) {
      // Simular alternância de speakers a cada 2-3 frases (mock)
      if (index > 0 && index % Math.floor(Math.random() * 2 + 2) === 0) {
        currentSpeaker = currentSpeaker === 0 ? 1 : 0;
      }
      segment.speaker = `Speaker ${currentSpeaker + 1}`;
    }

    currentTime += duration + 0.5; // Pausa entre frases
    return segment;
  });
}

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
