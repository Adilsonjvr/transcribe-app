import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
  DiarizationToggle,
  ProtectedRoute
} from './components';
import { useAuth, useTranscription, useHistory, useToast, useDarkMode, useProfile } from './hooks';
import { copyToClipboard, downloadFile, createTranscriptionJSON } from './utils/fileUtils';
import { exportToPDF, exportToDOCX } from './utils/exportUtils';
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';

// Componente da Landing Page com navegação
const LandingPageRoute = ({ onGetStarted, authProps, toast }) => {
  return (
    <>
      <LandingPage onGetStarted={onGetStarted} />
      <AuthModal {...authProps} />
      <ToastMessage message={toast.error} type="error" />
      <ToastMessage message={toast.success} type="success" />
    </>
  );
};

// Componente da Página Principal (App)
const AppPage = ({
  auth,
  transcription,
  history,
  toast,
  darkMode,
  authProps,
  showResetPasswordModal,
  setShowResetPasswordModal,
  handleCopy,
  handleDownload,
  handleFileSelect,
  handleUploadAndTranscribe,
  handleLogout,
  loadTranscription
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white relative overflow-hidden transition-colors duration-500">
      <AnimatedBackground />

      <Header
        user={auth.user}
        onAuthClick={() => auth.setShowAuthModal(true)}
        onLogout={handleLogout}
        isDarkMode={darkMode.isDarkMode}
        onToggleDarkMode={darkMode.toggleDarkMode}
      />

      <ToastMessage message={toast.error} type="error" />
      <ToastMessage message={toast.success} type="success" />

      <AuthModal {...authProps} />

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
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Componente da Página de Perfil
const ProfilePage = ({ auth, profile, history, toast, darkMode, authProps, handleLogout, loadTranscription, onUpdateProfile, onUploadAvatar, onDeleteAvatar, profileUpdating }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white relative overflow-hidden transition-colors duration-500">
      <AnimatedBackground />

      <Header
        user={auth.user}
        onAuthClick={() => auth.setShowAuthModal(true)}
        onLogout={handleLogout}
        isDarkMode={darkMode.isDarkMode}
        onToggleDarkMode={darkMode.toggleDarkMode}
      />

      <ToastMessage message={toast.error} type="error" />
      <ToastMessage message={toast.success} type="success" />

      <AuthModal {...authProps} />

      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ProfileView
            user={auth.user}
            profile={profile}
            transcriptionHistory={history.transcriptionHistory}
            onLoadTranscription={loadTranscription}
            onDeleteFromHistory={history.deleteFromHistory}
            onUpdateProfile={onUpdateProfile}
            onUploadAvatar={onUploadAvatar}
            onDeleteAvatar={onDeleteAvatar}
            profileUpdating={profileUpdating}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Componente Principal com toda a lógica
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [authError, setAuthError] = useState('');

  // Custom Hooks
  const auth = useAuth();
  const transcription = useTranscription();
  const history = useHistory(auth.user);
  const toast = useToast();
  const darkMode = useDarkMode();
  const profile = useProfile(auth.user);

  // Detectar recovery token e OAuth callback na URL
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    const accessToken = hashParams.get('access_token');

    if (type === 'recovery') {
      setShowResetPasswordModal(true);
      navigate('/app');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Se houver access_token no hash, é um callback do OAuth
    if (accessToken && auth.user) {
      toast.showSuccess('Login realizado com sucesso!');
      navigate('/app');
      // Limpar hash da URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [navigate, auth.user, toast]);

  // Redirecionar para /app quando usuário fizer login (incluindo OAuth)
  useEffect(() => {
    if (auth.user && !auth.loading && location.pathname === '/') {
      // Pequeno delay para garantir que o usuário foi carregado completamente
      const timer = setTimeout(() => {
        navigate('/app');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [auth.user, auth.loading, location.pathname, navigate]);

  // Auth handlers
  const handleAuth = async () => {
    try {
      setAuthError('');
      const result = await auth.handleAuth();
      toast.showSuccess(result.message);

      // Após login bem-sucedido, redirecionar para o app
      if (result.user && location.pathname === '/') {
        navigate('/app');
      }
    } catch (err) {
      setAuthError(err.message || 'Erro ao autenticar');
    }
  };

  const handleLogout = async () => {
    try {
      const message = await auth.handleLogout();
      toast.showSuccess(message);
      navigate('/');
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
    navigate('/app');
    toast.showSuccess('Transcrição carregada!');
  };

  // Profile actions
  const handleUpdateProfile = async (updates) => {
    const result = await profile.updateProfile(updates);
    if (result.success) {
      toast.showSuccess(result.message);
    } else {
      toast.showError(result.error);
    }
    return result;
  };

  const handleUploadAvatar = async (file) => {
    const result = await profile.uploadAvatar(file);
    if (result.success) {
      toast.showSuccess(result.message);
    } else {
      toast.showError(result.error);
    }
    return result;
  };

  const handleDeleteAvatar = async () => {
    const result = await profile.deleteAvatar();
    if (result.success) {
      toast.showSuccess(result.message);
    } else {
      toast.showError(result.error);
    }
    return result;
  };

  // Handler para começar a usar o app da landing page
  const handleGetStarted = () => {
    if (!auth.user) {
      auth.setShowAuthModal(true);
    } else {
      navigate('/app');
    }
  };

  // Props para AuthModal (reutilizado em várias páginas)
  const authProps = {
    show: auth.showAuthModal,
    onClose: () => {
      auth.setShowAuthModal(false);
      setAuthError('');
    },
    authMode: auth.authMode,
    onAuthModeChange: auth.setAuthMode,
    email: auth.email,
    onEmailChange: (value) => {
      auth.setEmail(value);
      setAuthError('');
    },
    password: auth.password,
    onPasswordChange: (value) => {
      auth.setPassword(value);
      setAuthError('');
    },
    onSubmit: handleAuth,
    onSocialLogin: auth.handleSocialLogin,
    onForgotPassword: handleForgotPassword,
    showForgotPassword: auth.showForgotPassword,
    onToggleForgotPassword: auth.toggleForgotPassword,
    loading: auth.authLoading,
    error: authError
  };

  return (
    <Routes>
      {/* Landing Page - Rota pública */}
      <Route
        path="/"
        element={
          <LandingPageRoute
            onGetStarted={handleGetStarted}
            authProps={authProps}
            toast={toast}
          />
        }
      />

      {/* App Page - Rota protegida */}
      <Route
        path="/app"
        element={
          <ProtectedRoute user={auth.user}>
            <AppPage
              auth={auth}
              transcription={transcription}
              history={history}
              toast={toast}
              darkMode={darkMode}
              authProps={authProps}
              showResetPasswordModal={showResetPasswordModal}
              setShowResetPasswordModal={setShowResetPasswordModal}
              handleCopy={handleCopy}
              handleDownload={handleDownload}
              handleFileSelect={handleFileSelect}
              handleUploadAndTranscribe={handleUploadAndTranscribe}
              handleLogout={handleLogout}
              loadTranscription={loadTranscription}
            />
          </ProtectedRoute>
        }
      />

      {/* Profile Page - Rota protegida */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={auth.user}>
            <ProfilePage
              auth={auth}
              profile={profile.profile}
              history={history}
              toast={toast}
              darkMode={darkMode}
              authProps={authProps}
              handleLogout={handleLogout}
              loadTranscription={loadTranscription}
              onUpdateProfile={handleUpdateProfile}
              onUploadAvatar={handleUploadAvatar}
              onDeleteAvatar={handleDeleteAvatar}
              profileUpdating={profile.updating}
            />
          </ProtectedRoute>
        }
      />

      {/* Redirect para landing page se rota não existir */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Componente App que envolve tudo com Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
