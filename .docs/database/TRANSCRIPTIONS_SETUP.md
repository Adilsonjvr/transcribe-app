# Setup da Tabela de Transcrições

## Problema Atual
As transcrições estão sendo salvas apenas no **localStorage** do navegador, o que causa:
- ❌ Perda de dados ao limpar cache/cookies
- ❌ Não sincroniza entre dispositivos
- ❌ Sem backup das transcrições
- ❌ Histórico limitado ao navegador

## Solução
Criar tabela `transcriptions` no Supabase para persistência permanente.

## Passo 1: Executar SQL no Supabase

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto `transcribe-app`
3. Vá em **SQL Editor** (no menu lateral)
4. Clique em **New Query**
5. Cole o SQL abaixo e clique em **RUN**:

```sql
-- Criar tabela de transcrições
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

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_transcriptions_user_id ON public.transcriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_transcriptions_created_at ON public.transcriptions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transcriptions_user_created ON public.transcriptions(user_id, created_at DESC);

-- Habilitar RLS (Row Level Security)
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
```

## Passo 2: Verificar Instalação

Após executar o SQL, verifique se a tabela foi criada:

1. No Supabase Dashboard, vá em **Table Editor**
2. Você deve ver a tabela `transcriptions` listada
3. Clique nela para ver a estrutura

## Passo 3: Testar

Após o deploy do código atualizado:

1. Faça uma nova transcrição
2. A transcrição será salva automaticamente no Supabase
3. Verifique na tabela `transcriptions` no Supabase Dashboard
4. Transcrições antigas do localStorage serão migradas automaticamente

## Estrutura da Tabela

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | ID único da transcrição |
| `user_id` | UUID | ID do usuário (FK para auth.users) |
| `file_name` | TEXT | Nome do arquivo original |
| `file_size` | BIGINT | Tamanho do arquivo em bytes |
| `file_type` | TEXT | Tipo MIME do arquivo |
| `transcription` | TEXT | Texto completo transcrito |
| `language` | TEXT | Idioma detectado/usado |
| `has_diarization` | BOOLEAN | Se tem identificação de palestrantes |
| `has_timestamps` | BOOLEAN | Se tem timestamps |
| `word_count` | INTEGER | Número de palavras |
| `char_count` | INTEGER | Número de caracteres |
| `duration_seconds` | INTEGER | Duração do áudio em segundos |
| `audio_url` | TEXT | URL do áudio (se armazenado) |
| `metadata` | JSONB | Dados adicionais (speakers, timestamps, etc) |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data da última atualização |

## Benefícios

✅ **Persistência permanente** - Dados salvos no banco de dados
✅ **Sincronização** - Acesse de qualquer dispositivo
✅ **Backup automático** - Supabase faz backup diário
✅ **Busca avançada** - Buscar por nome de arquivo ou conteúdo
✅ **Estatísticas** - Total de palavras, minutos transcritos, etc
✅ **Segurança** - RLS garante que cada usuário vê apenas seus dados

## Migração Automática

O sistema irá automaticamente:
1. Verificar se existem dados no Supabase
2. Se não, buscar no localStorage
3. Migrar dados do localStorage para Supabase
4. Continuar usando Supabase como fonte primária
