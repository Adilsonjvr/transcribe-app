-- =====================================================
-- POLÍTICAS DE STORAGE PARA AVATARES
-- Execute DEPOIS de criar o bucket "avatars"
-- =====================================================

-- IMPORTANTE: Antes de executar este SQL:
-- 1. Vá em Storage no Supabase Dashboard
-- 2. Clique em "Create a new bucket"
-- 3. Configurações:
--    - Name: avatars
--    - Public bucket: ✅ MARCAR COMO PÚBLICO
--    - File size limit: 2097152 (2MB)
--    - Allowed MIME types: image/*
-- 4. Depois execute este SQL abaixo

-- =====================================================
-- POLÍTICAS DE ACESSO AO BUCKET
-- =====================================================

-- Política 1: Leitura pública (qualquer um pode ver avatares)
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Política 2: Upload próprio (cada usuário pode fazer upload no seu diretório)
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Política 3: Atualizar próprio (usuários podem atualizar apenas seus avatares)
CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Política 4: Deletar próprio (usuários podem deletar apenas seus avatares)
CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- =====================================================
-- VERIFICAR SE AS POLÍTICAS FORAM CRIADAS
-- =====================================================

-- Execute esta query para verificar:
SELECT
  policyname,
  tablename,
  cmd,
  permissive
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname LIKE '%avatar%';

-- Você deve ver 4 políticas listadas

-- =====================================================
-- FIM - STORAGE CONFIGURADO COM SUCESSO!
-- =====================================================
