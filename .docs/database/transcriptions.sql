-- Tabela para armazenar transcrições dos usuários
CREATE TABLE IF NOT EXISTS public.transcriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  transcription TEXT NOT NULL,
  language TEXT,
  has_diarization BOOLEAN DEFAULT false,
  has_timestamps BOOLEAN DEFAULT false,
  word_count INTEGER,
  char_count INTEGER,
  duration_seconds INTEGER,
  audio_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_transcriptions_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_transcriptions_user_id ON public.transcriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_transcriptions_created_at ON public.transcriptions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transcriptions_user_created ON public.transcriptions(user_id, created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE public.transcriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários podem ver apenas suas próprias transcrições
CREATE POLICY "Users can view own transcriptions"
  ON public.transcriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Usuários podem criar suas próprias transcrições
CREATE POLICY "Users can create own transcriptions"
  ON public.transcriptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Usuários podem atualizar suas próprias transcrições
CREATE POLICY "Users can update own transcriptions"
  ON public.transcriptions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Usuários podem deletar suas próprias transcrições
CREATE POLICY "Users can delete own transcriptions"
  ON public.transcriptions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_transcriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER transcriptions_updated_at
  BEFORE UPDATE ON public.transcriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_transcriptions_updated_at();

-- Comentários
COMMENT ON TABLE public.transcriptions IS 'Armazena todas as transcrições de áudio dos usuários';
COMMENT ON COLUMN public.transcriptions.user_id IS 'ID do usuário que criou a transcrição';
COMMENT ON COLUMN public.transcriptions.file_name IS 'Nome original do arquivo de áudio';
COMMENT ON COLUMN public.transcriptions.transcription IS 'Texto completo da transcrição';
COMMENT ON COLUMN public.transcriptions.has_diarization IS 'Indica se a transcrição tem identificação de palestrantes';
COMMENT ON COLUMN public.transcriptions.has_timestamps IS 'Indica se a transcrição tem timestamps';
COMMENT ON COLUMN public.transcriptions.metadata IS 'Dados adicionais em formato JSON (speakers, timestamps, etc)';
