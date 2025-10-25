-- Tabela de perfis de usuário expandido
-- Execute este SQL no Supabase SQL Editor

-- Criar tabela de perfis
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,

  -- Informações pessoais
  full_name TEXT,
  company TEXT,
  job_title TEXT,
  phone TEXT,

  -- Avatar
  avatar_url TEXT,

  -- Preferências
  preferences JSONB DEFAULT '{
    "language": "pt-BR",
    "notifications": {
      "email": true,
      "transcription_complete": true,
      "weekly_summary": false
    },
    "default_export_format": "txt",
    "auto_save": true
  }'::jsonb,

  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem inserir seu próprio perfil
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar seu próprio perfil
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem deletar seu próprio perfil
CREATE POLICY "Users can delete own profile"
  ON user_profiles
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Storage para avatares
-- Execute este comando separadamente na seção Storage do Supabase:
-- 1. Vá em Storage > Create a new bucket
-- 2. Nome: "avatars"
-- 3. Public: true
-- 4. File size limit: 2MB
-- 5. Allowed MIME types: image/*

-- Política de storage para avatares
-- Depois de criar o bucket, execute:

-- CREATE POLICY "Avatar images are publicly accessible"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'avatars');

-- CREATE POLICY "Users can upload their own avatar"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'avatars' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can update their own avatar"
--   ON storage.objects FOR UPDATE
--   USING (
--     bucket_id = 'avatars' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can delete their own avatar"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'avatars' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );
