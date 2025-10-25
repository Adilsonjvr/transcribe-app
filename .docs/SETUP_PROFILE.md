# Setup do Sistema de Perfil Expandido

## Passo 1: Executar SQL no Supabase

1. Acesse seu projeto no Supabase: https://supabase.com/dashboard
2. Vá em **SQL Editor**
3. Clique em **New Query**
4. Copie todo o conteúdo do arquivo `.docs/database/user_profiles.sql`
5. Cole no editor e clique em **Run**

## Passo 2: Criar bucket para avatares

1. Vá em **Storage** no menu lateral
2. Clique em **Create a new bucket**
3. Configurações:
   - **Name**: `avatars`
   - **Public bucket**: ✅ Marque como público
   - **File size limit**: 2MB
   - **Allowed MIME types**: `image/*`
4. Clique em **Create bucket**

## Passo 3: Configurar políticas do bucket

1. Ainda em **Storage**, clique no bucket `avatars`
2. Vá na aba **Policies**
3. Clique em **New Policy** e adicione as seguintes políticas:

### Política 1: Leitura pública
```sql
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
```

### Política 2: Upload próprio
```sql
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

### Política 3: Atualizar próprio
```sql
CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

### Política 4: Deletar próprio
```sql
CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Passo 4: Verificar se está funcionando

1. Faça login na aplicação
2. Vá para a página de **Perfil**
3. Clique em **Editar Perfil**
4. Tente fazer upload de uma foto
5. Preencha os dados pessoais
6. Clique em **Salvar**

## Troubleshooting

### Erro ao criar perfil
- Verifique se o trigger `on_auth_user_created` foi criado corretamente
- Verifique as políticas RLS na tabela `user_profiles`

### Erro ao fazer upload de avatar
- Verifique se o bucket `avatars` foi criado como público
- Verifique se as 4 políticas de storage foram criadas
- Verifique se o tamanho da imagem é menor que 2MB

### Perfil não aparece
- Abra o console do navegador (F12) e veja se há erros
- Verifique se a tabela `user_profiles` foi criada no Supabase
- Verifique se o RLS está habilitado e as políticas estão corretas

## Estrutura da Tabela

```
user_profiles
├── id (UUID, PK)
├── user_id (UUID, FK → auth.users)
├── full_name (TEXT)
├── company (TEXT)
├── job_title (TEXT)
├── phone (TEXT)
├── avatar_url (TEXT)
├── preferences (JSONB)
├── onboarding_completed (BOOLEAN)
├── onboarding_step (INTEGER)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```
