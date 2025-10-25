-- =====================================================
-- SCHEMA COMPLETO - PLATAFORMA DE TRANSCRIÇÃO
-- Supabase PostgreSQL
-- Execute TUDO de uma vez no SQL Editor
-- =====================================================

-- =====================================================
-- 1. TABELA: user_profiles (perfis expandidos)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,

  -- Informações pessoais
  full_name TEXT,
  company TEXT,
  job_title TEXT,
  phone TEXT,

  -- Avatar
  avatar_url TEXT,

  -- Subscription (para sistema de planos futuro)
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  monthly_minutes_used INTEGER DEFAULT 0,
  monthly_minutes_limit INTEGER DEFAULT 60, -- 60 minutos grátis por mês

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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Foreign key para auth.users
  CONSTRAINT fk_user_profiles_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription ON public.user_profiles(subscription_tier);

-- =====================================================
-- 2. ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.user_profiles;

-- Políticas de segurança
CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON public.user_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- 3. FUNCTIONS E TRIGGERS
-- =====================================================

-- Function: Atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function: Criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 4. CRIAR PERFIS PARA USUÁRIOS EXISTENTES
-- =====================================================

INSERT INTO public.user_profiles (user_id, full_name)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_profiles)
ON CONFLICT (user_id) DO NOTHING;

-- =====================================================
-- 5. COMENTÁRIOS (DOCUMENTAÇÃO)
-- =====================================================

COMMENT ON TABLE public.user_profiles IS 'Perfis expandidos dos usuários com informações pessoais, avatar e preferências';
COMMENT ON COLUMN public.user_profiles.user_id IS 'Referência ao usuário autenticado (auth.users)';
COMMENT ON COLUMN public.user_profiles.subscription_tier IS 'Nível de assinatura: free, pro, enterprise';
COMMENT ON COLUMN public.user_profiles.preferences IS 'Preferências do usuário em formato JSON';
COMMENT ON COLUMN public.user_profiles.onboarding_completed IS 'Se o usuário completou o onboarding inicial';

-- =====================================================
-- FIM - TABELA DE PERFIS CRIADA COM SUCESSO!
-- =====================================================

-- PRÓXIMOS PASSOS:
-- 1. Criar bucket "avatars" no Storage
-- 2. Executar as políticas de storage (próximo bloco)
