export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao copiar texto' };
  }
};

export const createTranscriptionJSON = (transcription, wordCount, charCount) => {
  return JSON.stringify({
    transcription,
    timestamp: new Date().toISOString(),
    word_count: wordCount,
    character_count: charCount
  }, null, 2);
};
