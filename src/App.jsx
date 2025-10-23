import React, { useState, useEffect } from 'react';
import {
  Header,
  AuthModal,
  ResetPasswordModal,
  ToastMessage,
  AnimatedBackground,
  HeroSection,
  FileUpload,
  TranscriptionResult,
  ProfileView,
  Footer,
  TranscriptionSkeleton
} from './components';
import { useAuth, useTranscription, useHistory, useToast, useDarkMode } from './hooks';
import { copyToClipboard, downloadFile, createTranscriptionJSON } from './utils/fileUtils';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [authError, setAuthError] = useState('');

  // Custom Hooks
  const auth = useAuth();
  const transcription = useTranscription();
  const history = useHistory(auth.user);
  const toast = useToast();
  const darkMode = useDarkMode();

  // Detectar recovery token na URL (quando usuário clica no link de reset de senha)
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');

    if (type === 'recovery') {
      // Usuário veio de um link de reset de senha
      setShowResetPasswordModal(true);
      // Limpar hash da URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Auth handlers
  const handleAuth = async () => {
    try {
      setAuthError(''); // Limpar erro anterior
      console.log('[App] Iniciando autenticação...');
      const result = await auth.handleAuth();
      console.log('[App] Resultado da autenticação:', result);
      toast.showSuccess(result.message);
    } catch (err) {
      console.error('[App] Erro na autenticação:', err);
      console.error('[App] Mensagem do erro:', err.message);
      setAuthError(err.message || 'Erro ao autenticar');
    }
  };

  const handleLogout = async () => {
    try {
      const message = await auth.handleLogout();
      toast.showSuccess(message);
      setCurrentView('home');
    } catch (err) {
      toast.showError(err.message || 'Erro ao fazer logout');
    }
  };

  const handleForgotPassword = async () => {
    try {
      const message = await auth.handleForgotPassword();
      toast.showSuccess(message);
    } catch (err) {
      toast.showError(err.message);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white relative overflow-hidden transition-colors duration-500">
      <AnimatedBackground />

      <Header
        user={auth.user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onAuthClick={() => auth.setShowAuthModal(true)}
        onLogout={handleLogout}
        isDarkMode={darkMode.isDarkMode}
        onToggleDarkMode={darkMode.toggleDarkMode}
      />

      <ToastMessage message={toast.error} type="error" />
      <ToastMessage message={toast.success} type="success" />

      <AuthModal
        show={auth.showAuthModal}
        onClose={() => {
          auth.setShowAuthModal(false);
          setAuthError(''); // Limpar erro ao fechar modal
        }}
        authMode={auth.authMode}
        onAuthModeChange={auth.setAuthMode}
        email={auth.email}
        onEmailChange={(value) => {
          auth.setEmail(value);
          setAuthError(''); // Limpar erro ao digitar
        }}
        password={auth.password}
        onPasswordChange={(value) => {
          auth.setPassword(value);
          setAuthError(''); // Limpar erro ao digitar
        }}
        onSubmit={handleAuth}
        onForgotPassword={handleForgotPassword}
        showForgotPassword={auth.showForgotPassword}
        onToggleForgotPassword={auth.toggleForgotPassword}
        loading={auth.authLoading}
        error={authError}
      />

      <ResetPasswordModal
        show={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
        onSuccess={(message) => {
          toast.showSuccess(message);
          setShowResetPasswordModal(false);
        }}
      />

      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {currentView === 'home' && (
            <>
              {!transcription.transcription && !transcription.file && <HeroSection />}

              {!transcription.transcription && !transcription.isTranscribing && (
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

              {transcription.isTranscribing && !transcription.transcription && (
                <TranscriptionSkeleton progress={Math.round(transcription.transcriptionProgress)} />
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
