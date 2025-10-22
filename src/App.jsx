import React, { useState, useRef, useEffect } from 'react';
import { Upload, Copy, Download, FileAudio, Check, AlertCircle, Loader2, X, User, Zap, RefreshCw, Clock, Trash2, ChevronRight, Home } from 'lucide-react';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [audioFileId, setAudioFileId] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [transcriptionHistory, setTranscriptionHistory] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      loadHistory(JSON.parse(savedUser).id);
    }
  }, []);

  useEffect(() => {
    if (transcription) {
      setWordCount(transcription.split(' ').filter(w => w).length);
      setCharCount(transcription.length);
    }
  }, [transcription]);

  const loadHistory = (userId) => {
    const history = localStorage.getItem(`history_${userId}`);
    if (history) {
      setTranscriptionHistory(JSON.parse(history));
    }
  };

  const saveToHistory = (transcriptionData) => {
    if (!user) return;
    
    const newItem = {
      id: Date.now(),
      fileName: file?.name || 'Audio',
      transcription: transcriptionData,
      wordCount: transcriptionData.split(' ').filter(w => w).length,
      charCount: transcriptionData.length,
      date: new Date().toISOString()
    };

    const updatedHistory = [newItem, ...transcriptionHistory].slice(0, 20);
    setTranscriptionHistory(updatedHistory);
    localStorage.setItem(`history_${user.id}`, JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id) => {
    const updatedHistory = transcriptionHistory.filter(item => item.id !== id);
    setTranscriptionHistory(updatedHistory);
    if (user) {
      localStorage.setItem(`history_${user.id}`, JSON.stringify(updatedHistory));
    }
  };

  const loadTranscription = (item) => {
    setTranscription(item.transcription);
    setCurrentView('home');
    setSuccess('Transcrição carregada!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleAuth = () => {
    setError('');
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    const mockUser = {
      id: 'user-' + Date.now(),
      email: email,
      created_at: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    loadHistory(mockUser.id);
    setSuccess(authMode === 'signup' ? 'Conta criada!' : 'Login realizado!');
    setShowAuthModal(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setTranscriptionHistory([]);
    setSuccess('Logout realizado');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    const validExtensions = ['.mp3', '.wav', '.m4a', '.flac', '.ogg'];
    const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      setError('Formato não suportado. Use: MP3, WAV, M4A, FLAC ou OGG');
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo: 50MB');
      return;
    }

    setFile(selectedFile);
    setSuccess('Arquivo selecionado!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleUploadAndTranscribe = async () => {
    if (!file) {
      setError('Selecione um arquivo primeiro');
      return;
    }

    setError('');
    setSuccess('');
    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 150));
      }

      setIsUploading(false);
      const mockAudioFileId = 'audio-' + Date.now();
      setAudioFileId(mockAudioFileId);
      await transcribeAudio(file);
    } catch (err) {
      setError('Erro no upload: ' + err.message);
      setIsUploading(false);
    }
  };

  const transcribeAudio = async (audioFile) => {
    setIsTranscribing(true);
    setError('');

    try {
      console.log('Iniciando transcrição...');
      console.log('Arquivo:', audioFile.name, '|', (audioFile.size / 1024 / 1024).toFixed(2), 'MB');

      // URL da Edge Function do Supabase (já configurada!)
      const EDGE_FUNCTION_URL = 'https://fbxdfjkptlfyexhhsgpy.supabase.co/functions/v1/dynamic-processor';

      // Criar FormData com o arquivo
      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('language', 'pt');

     // Chamar Edge Function (COM autenticação)
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZieGRmamtwdGxmeWV4aGhzZ3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMjIwNzAsImV4cCI6MjA3NjY5ODA3MH0.QCkbiONVjRCwIldHA6JDanMN5l3VR56Palp4xQM5kKU'; // Cole a anon key aqui

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
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

      setTranscription(transcribedText);
      setIsTranscribing(false);
      setSuccess('✓ Transcrição concluída!');
      
      if (user) {
        saveToHistory(transcribedText);
      }
      
      setTimeout(() => setSuccess(''), 2000);

    } catch (err) {
      console.error('Erro na transcrição:', err);
      setError(err.message || 'Erro ao transcrever');
      setIsTranscribing(false);
    }
  };

  const requireAuth = (action) => {
    if (!user) {
      setError('Faça login para ' + action);
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const handleCopy = async () => {
    if (!requireAuth('copiar o texto')) return;
    
    try {
      await navigator.clipboard.writeText(transcription);
      setSuccess('Texto copiado!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Erro ao copiar texto');
    }
  };

  const handleDownload = (format) => {
    if (!requireAuth('baixar o arquivo')) return;

    try {
      let content = transcription;
      let mimeType = 'text/plain';
      let extension = 'txt';

      if (format === 'json') {
        content = JSON.stringify({
          transcription: transcription,
          timestamp: new Date().toISOString(),
          word_count: wordCount,
          character_count: charCount
        }, null, 2);
        mimeType = 'application/json';
        extension = 'json';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcricao_${Date.now()}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccess(`Download ${format.toUpperCase()} concluído!`);
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Erro ao baixar arquivo');
    }
  };

  const handleNewTranscription = () => {
    setFile(null);
    setTranscription('');
    setUploadProgress(0);
    setAudioFileId(null);
    setError('');
    setSuccess('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="absolute top-32 right-1/4 w-32 h-32 border-4 border-purple-400/30 rounded-2xl rotate-45 animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border-4 border-blue-400/30 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg rotate-12 animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">TRANSCRIBE</h1>
                <p className="text-xs text-white/50">Audio to Text AI</p>
              </div>
            </div>

            {user && (
              <nav className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('home')}
                  className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                    currentView === 'home' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Início
                </button>
                <button
                  onClick={() => setCurrentView('profile')}
                  className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                    currentView === 'profile' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Perfil
                </button>
              </nav>
            )}
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm hover:bg-white/10 rounded-full transition-all"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Entrar
            </button>
          )}
        </div>
      </header>

      {/* Toast Messages */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-500/20 border border-red-500 text-red-100 px-6 py-3 rounded-full backdrop-blur-xl flex items-center gap-2 max-w-md">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {success && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500/20 border border-green-500 text-green-100 px-6 py-3 rounded-full backdrop-blur-xl flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="text-sm font-medium">{success}</span>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              {authMode === 'signup' ? 'Criar Conta' : 'Entrar'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                onClick={handleAuth}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                {authMode === 'signup' ? 'Criar Conta' : 'Entrar'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
                className="text-sm text-white/50 hover:text-white transition-all"
              >
                {authMode === 'signup' ? 'Já tem conta? Entrar' : 'Não tem conta? Criar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* HOME VIEW */}
          {currentView === 'home' && (
            <>
              {/* Hero Section */}
              {!transcription && !file && (
                <div className="text-center mb-16">
                  <h2 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight">
                    AUDIO TO
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400">
                      TEXT
                    </span>
                  </h2>
                  <p className="text-xl text-white/70 max-w-2xl mx-auto">
                    Transcreva seus áudios instantaneamente com IA de última geração.
                    Rápido, preciso e sem complicações.
                  </p>
                </div>
              )}

              {/* Upload Section */}
              {!transcription && (
                <div className="mb-12">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all bg-white/5 backdrop-blur-sm ${
                      isDragging
                        ? 'border-purple-400 bg-purple-500/10'
                        : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    <Upload className="w-16 h-16 mx-auto mb-6 text-purple-300" />
                    <h3 className="text-2xl font-bold mb-2">
                      {file ? file.name : 'Arraste seu arquivo aqui'}
                    </h3>
                    <p className="text-white/50 mb-8">
                      ou clique para selecionar • MP3, WAV, M4A, FLAC, OGG • Máx: 50MB
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileSelect}
                      accept="audio/*,.mp3,.wav,.m4a,.flac,.ogg"
                      className="hidden"
                    />

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all inline-flex items-center gap-2"
                    >
                      <FileAudio className="w-5 h-5" />
                      Escolher Arquivo
                    </button>

                    {file && (
                      <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <FileAudio className="w-8 h-8 text-purple-400" />
                            <div className="text-left">
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-white/50">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        </div>

                        {isUploading && (
                          <div className="mb-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">Enviando...</span>
                              <span className="text-sm font-medium">{uploadProgress}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {isTranscribing && (
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                            <span className="font-medium">Transcrevendo áudio...</span>
                          </div>
                        )}

                        <button
                          onClick={handleUploadAndTranscribe}
                          disabled={isUploading || isTranscribing}
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 rounded-full hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 disabled:text-white/50 transition-all flex items-center justify-center gap-2"
                        >
                          {isUploading || isTranscribing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              {isUploading ? 'Enviando...' : 'Transcrevendo...'}
                            </>
                          ) : (
                            <>
                              <Zap className="w-5 h-5" />
                              Transcrever Agora
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transcription Result */}
              {transcription && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">TRANSCRIÇÃO</h2>
                      <p className="text-white/50">{wordCount} palavras • {charCount} caracteres</p>
                    </div>
                    <button
                      onClick={handleNewTranscription}
                      className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 bg-white/5 backdrop-blur-sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Nova
                    </button>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6">
                    <textarea
                      value={transcription}
                      onChange={(e) => setTranscription(e.target.value)}
                      className="w-full min-h-[400px] bg-transparent border-none focus:outline-none text-lg leading-relaxed resize-none placeholder-white/30"
                      placeholder="Sua transcrição aparecerá aqui..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={handleCopy}
                      className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Copy className="w-5 h-5" />
                      Copiar
                    </button>

                    <button
                      onClick={() => handleDownload('txt')}
                      className="flex-1 sm:flex-none px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
                    >
                      <Download className="w-5 h-5" />
                      TXT
                    </button>

                    <button
                      onClick={() => handleDownload('json')}
                      className="flex-1 sm:flex-none px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
                    >
                      <Download className="w-5 h-5" />
                      JSON
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* PROFILE VIEW */}
          {currentView === 'profile' && user && (
            <div>
              <div className="mb-12">
                <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  MEU PERFIL
                </h2>
                <p className="text-white/60 text-lg">Gerencie suas transcrições e histórico</p>
              </div>

              {/* User Info Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{user.email}</h3>
                    <p className="text-white/50">Membro desde {formatDate(user.created_at)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/50 text-sm mb-1">Total de Transcrições</p>
                    <p className="text-3xl font-bold text-purple-400">{transcriptionHistory.length}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/50 text-sm mb-1">Palavras Transcritas</p>
                    <p className="text-3xl font-bold text-blue-400">
                      {transcriptionHistory.reduce((acc, item) => acc + item.wordCount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/50 text-sm mb-1">Última Atividade</p>
                    <p className="text-xl font-bold text-indigo-400">
                      {transcriptionHistory.length > 0 ? 'Hoje' : 'Nunca'}
                    </p>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-purple-400" />
                  Histórico de Transcrições
                </h3>

                {transcriptionHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <FileAudio className="w-16 h-16 mx-auto mb-4 text-white/30" />
                    <p className="text-white/50 text-lg">Nenhuma transcrição ainda</p>
                    <button
                      onClick={() => setCurrentView('home')}
                      className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
                    >
                      Criar primeira transcrição
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transcriptionHistory.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <FileAudio className="w-5 h-5 text-purple-400 flex-shrink-0" />
                              <h4 className="font-medium truncate">{item.fileName}</h4>
                            </div>
                            <p className="text-sm text-white/50 line-clamp-2 mb-2">
                              {item.transcription}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-white/40">
                              <span>{item.wordCount} palavras</span>
                              <span>•</span>
                              <span>{formatDate(item.date)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => loadTranscription(item)}
                              className="p-2 hover:bg-white/10 rounded-full transition-all"
                              title="Carregar transcrição"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteFromHistory(item.id)}
                              className="p-2 hover:bg-red-500/20 rounded-full transition-all text-red-400"
                              title="Deletar"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 relative z-10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/30 text-sm">
            Desenvolvido com React + Anthropic Claude API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;