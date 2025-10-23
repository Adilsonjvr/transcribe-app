export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatFileSize = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2);
};

export const countWords = (text) => {
  return text.split(' ').filter(w => w).length;
};

export const countCharacters = (text) => {
  return text.length;
};
