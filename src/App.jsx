import React, { useState } from 'react';
import {
  Header,
  AuthModal,
  ToastMessage,
  AnimatedBackground,
  HeroSection,
  FileUpload,
  TranscriptionResult,
  ProfileView,
  Footer
} from './components';
import { useAuth, useTranscription, useHistory, useToast } from './hooks';
import { copyToClipboard, downloadFile, createTranscriptionJSON } from './utils/fileUtils';

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  // Custom Hooks
  const auth = useAuth();
  const transcription = useTranscription();
  const history = useHistory(auth.user);
  const toast = useToast();

  // Auth handlers
  const handleAuth = () => {
    try {
      const result = auth.handleAuth();
      toast.showSuccess(result.message);
      if (result.user) {
        // Carrega o histórico do novo usuário
      }
    } catch (err) {
      toast.showError(err.message);
    }
  };

  const handleLogout = () => {
    const message = auth.handleLogout();
    toast.showSuccess(message);
    setCurrentView('home');
  };

  // File handlers
  const handleFileSelect = (file) => {
    try {
      const message = transcription.validateAndSetFile(file);
      toast.showSuccess(message);
    } catch (err) {
      toast.showError(err.message);
    }
  };

  const handleUploadAndTranscribe = async () => {
    try {
      toast.clearMessages();
      const result = await transcription.handleUploadAndTranscribe();
      toast.showSuccess(result.message);

      if (auth.user && result.text) {
        history.saveToHistory(result.text, transcription.file?.name);
      }
    } catch (err) {
      toast.showError(err.message || 'Erro ao transcrever');
    }
  };

  // Transcription actions
  const handleCopy = async () => {
    try {
      auth.requireAuth('copiar o texto');
      const result = await copyToClipboard(transcription.transcription);
      if (result.success) {
        toast.showSuccess('Texto copiado!');
      } else {
        toast.showError(result.error);
      }
    } catch (err) {
      toast.showError(err.message);
    }
  };

  const handleDownload = (format) => {
    try {
      auth.requireAuth('baixar o arquivo');

      let content = transcription.transcription;
      let mimeType = 'text/plain';
      let extension = 'txt';

      if (format === 'json') {
        content = createTranscriptionJSON(
          transcription.transcription,
          transcription.wordCount,
          transcription.charCount
        );
        mimeType = 'application/json';
        extension = 'json';
      }

      downloadFile(content, `transcricao_${Date.now()}.${extension}`, mimeType);
      toast.showSuccess(`Download ${format.toUpperCase()} concluído!`);
    } catch (err) {
      toast.showError(err.message || 'Erro ao baixar arquivo');
    }
  };

  // History actions
  const loadTranscription = (item) => {
    transcription.setTranscription(item.transcription);
    setCurrentView('home');
    toast.showSuccess('Transcrição carregada!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <AnimatedBackground />

      <Header
        user={auth.user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onAuthClick={() => auth.setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      <ToastMessage message={toast.error} type="error" />
      <ToastMessage message={toast.success} type="success" />

      <AuthModal
        show={auth.showAuthModal}
        onClose={() => auth.setShowAuthModal(false)}
        authMode={auth.authMode}
        onAuthModeChange={auth.setAuthMode}
        email={auth.email}
        onEmailChange={auth.setEmail}
        password={auth.password}
        onPasswordChange={auth.setPassword}
        onSubmit={handleAuth}
      />

      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {currentView === 'home' && (
            <>
              {!transcription.transcription && !transcription.file && <HeroSection />}

              {!transcription.transcription && (
                <FileUpload
                  file={transcription.file}
                  isDragging={transcription.isDragging}
                  isUploading={transcription.isUploading}
                  isTranscribing={transcription.isTranscribing}
                  uploadProgress={transcription.uploadProgress}
                  onFileSelect={handleFileSelect}
                  onDragOver={transcription.handleDragOver}
                  onDragLeave={transcription.handleDragLeave}
                  onDrop={transcription.handleDrop}
                  onUploadAndTranscribe={handleUploadAndTranscribe}
                />
              )}

              {transcription.transcription && (
                <TranscriptionResult
                  transcription={transcription.transcription}
                  wordCount={transcription.wordCount}
                  charCount={transcription.charCount}
                  onTranscriptionChange={transcription.setTranscription}
                  onCopy={handleCopy}
                  onDownloadTxt={() => handleDownload('txt')}
                  onDownloadJson={() => handleDownload('json')}
                  onNewTranscription={transcription.handleNewTranscription}
                />
              )}
            </>
          )}

          {currentView === 'profile' && auth.user && (
            <ProfileView
              user={auth.user}
              transcriptionHistory={history.transcriptionHistory}
              onViewChange={setCurrentView}
              onLoadTranscription={loadTranscription}
              onDeleteFromHistory={history.deleteFromHistory}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
