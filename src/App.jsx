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
  TranscriptionSkeleton,
  LanguageSelector,
  TimestampedTranscription,
  DiarizationToggle
} from './components';
import { useAuth, useTranscription, useHistory, useToast, useDarkMode } from './hooks';
import { copyToClipboard, downloadFile, createTranscriptionJSON } from './utils/fileUtils';
import { exportToPDF, exportToDOCX } from './utils/exportUtils';
import { LandingPage } from './pages/LandingPage';

const App = () => {
  // Carregar view salva ou mostrar landing page
  const getSavedView = () => {
    try {
      const saved = localStorage.getItem('transcribe_current_view');
      return saved || 'landing';
    } catch {
      return 'landing';
    }
  };

  const [currentView, setCurrentView] = useState(getSavedView());
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [authError, setAuthError] = useState('');

  // Custom Hooks
  const auth = useAuth();
  const transcription = useTranscription();
  const history = useHistory(auth.user);
  const toast = useToast();
  const darkMode = useDarkMode();

  // Salvar view atual no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('transcribe_current_view', currentView);
    } catch (error) {
      console.error('Erro ao salvar view:', error);
    }
  }, [currentView]);

  // Se usuário não está logado e não está na landing, redirecionar
  useEffect(() => {
    if (!auth.user && currentView !== 'landing') {
      setCurrentView('landing');
    }
  }, [auth.user, currentView]);

  // Detectar recovery token na URL (quando usuário clica no link de reset de senha)
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');

    if (type === 'recovery') {
      // Usuário veio de um link de reset de senha
      setShowResetPasswordModal(true);
      setCurrentView('home');
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

      // Após login bem-sucedido, redirecionar para o app
      if (result.user && currentView === 'landing') {
        setCurrentView('home');
      }
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

  const handleDownload = async (format) => {
    try {
      auth.requireAuth('baixar o arquivo');

      const metadata = {
        language: transcription.detectedLanguage || transcription.language,
        wordCount: transcription.wordCount,
        charCount: transcription.charCount
      };

      if (format === 'pdf') {
        await exportToPDF(transcription.transcription, transcription.segments, metadata);
        toast.showSuccess('Download PDF concluído!');
        return;
      }

      if (format === 'docx') {
        await exportToDOCX(transcription.transcription, transcription.segments, metadata);
        toast.showSuccess('Download DOCX concluído!');
        return;
      }

      // Formatos TXT e JSON
      let content = transcription.transcription;
      let mimeType = 'text/plain';
      let extension = 'txt';

      if (format === 'json') {
        // Se tiver timestamps, incluir no JSON
        if (transcription.segments && transcription.segments.length > 0) {
          content = JSON.stringify({
            text: transcription.transcription,
            segments: transcription.segments,
            language: transcription.detectedLanguage || transcription.language,
            wordCount: transcription.wordCount,
            charCount: transcription.charCount,
            timestamp: new Date().toISOString()
          }, null, 2);
        } else {
          content = createTranscriptionJSON(
            transcription.transcription,
            transcription.wordCount,
            transcription.charCount
          );
        }
        mimeType = 'application/json';
        extension = 'json';
      } else if (format === 'txt') {
        // Se tiver timestamps, incluir no TXT
        if (transcription.segments && transcription.segments.length > 0) {
          content = transcription.segments.map((seg) => {
            const timestamp = formatTimestamp(seg.start);
            const speaker = seg.speaker ? `${seg.speaker}: ` : '';
            return `[${timestamp}] ${speaker}${seg.text}`;
          }).join('\n\n');
        }
      }

      downloadFile(content, `transcricao_${Date.now()}.${extension}`, mimeType);
      toast.showSuccess(`Download ${format.toUpperCase()} concluído!`);
    } catch (err) {
      toast.showError(err.message || 'Erro ao baixar arquivo');
    }
  };

  const formatTimestamp = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // History actions
  const loadTranscription = (item) => {
    transcription.setTranscription(item.transcription);
    setCurrentView('home');
    toast.showSuccess('Transcrição carregada!');
  };

  // Handler para começar a usar o app da landing page
  const handleGetStarted = () => {
    if (!auth.user) {
      // Se não estiver logado, apenas abre o modal (mantém na landing)
      auth.setShowAuthModal(true);
    } else {
      // Se já estiver logado, vai direto para o app
      setCurrentView('home');
    }
  };

  // Renderizar Landing Page com modal de auth
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} />

        {/* Modal de autenticação disponível na landing page */}
        <AuthModal
          show={auth.showAuthModal}
          onClose={() => {
            auth.setShowAuthModal(false);
            setAuthError('');
          }}
          authMode={auth.authMode}
          onAuthModeChange={auth.setAuthMode}
          email={auth.email}
          onEmailChange={(value) => {
            auth.setEmail(value);
            setAuthError('');
          }}
          password={auth.password}
          onPasswordChange={(value) => {
            auth.setPassword(value);
            setAuthError('');
          }}
          onSubmit={handleAuth}
          onSocialLogin={auth.handleSocialLogin}
          onForgotPassword={handleForgotPassword}
          showForgotPassword={auth.showForgotPassword}
          onToggleForgotPassword={auth.toggleForgotPassword}
          loading={auth.authLoading}
          error={authError}
        />

        <ToastMessage message={toast.error} type="error" />
        <ToastMessage message={toast.success} type="success" />
      </>
    );
  }

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
        onSocialLogin={auth.handleSocialLogin}
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
                <>
                  {/* Seletor de Idioma */}
                  <div className="mb-6">
                    <LanguageSelector
                      selectedLanguage={transcription.language}
                      onLanguageChange={transcription.setLanguage}
                      disabled={transcription.isUploading || transcription.isTranscribing}
                    />
                  </div>

                  {/* Toggle de Diarization (Speaker Identification) */}
                  <div className="mb-8">
                    <DiarizationToggle
                      enabled={transcription.diarizationEnabled}
                      onToggle={transcription.setDiarizationEnabled}
                      disabled={transcription.isUploading || transcription.isTranscribing}
                    />
                  </div>

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
                </>
              )}

              {transcription.isTranscribing && !transcription.transcription && (
                <TranscriptionSkeleton progress={Math.round(transcription.transcriptionProgress)} />
              )}

              {transcription.transcription && (
                <>
                  {/* Se tiver segmentos com timestamps, usar componente apropriado */}
                  {transcription.segments && transcription.segments.length > 0 ? (
                    <TimestampedTranscription
                      segments={transcription.segments}
                      onCopy={handleCopy}
                      onDownloadTxt={() => handleDownload('txt')}
                      onDownloadJson={() => handleDownload('json')}
                      onDownloadPdf={() => handleDownload('pdf')}
                      onDownloadDocx={() => handleDownload('docx')}
                      onNewTranscription={transcription.handleNewTranscription}
                      audioFile={transcription.file}
                    />
                  ) : (
                    <TranscriptionResult
                      transcription={transcription.transcription}
                      wordCount={transcription.wordCount}
                      charCount={transcription.charCount}
                      onTranscriptionChange={transcription.setTranscription}
                      onCopy={handleCopy}
                      onDownloadTxt={() => handleDownload('txt')}
                      onDownloadJson={() => handleDownload('json')}
                      onDownloadPdf={() => handleDownload('pdf')}
                      onDownloadDocx={() => handleDownload('docx')}
                      onNewTranscription={transcription.handleNewTranscription}
                    />
                  )}
                </>
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
