# 🚀 Guia de Configuração do Banco de Dados

## Ordem de Execução

### Passo 1: Limpar estrutura anterior (se necessário)

Se você tentou executar o SQL antes e deu erro, execute primeiro:

```sql
-- Limpar tentativas anteriores
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.update_updated_at_column();
```

### Passo 2: Criar tabela de perfis

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New Query**
5. Copie TODO o conteúdo de: `.docs/database/complete_schema.sql`
6. Cole no editor
7. Clique em **Run** (ou Ctrl+Enter)

✅ **Sucesso!** Você deve ver: "Success. No rows returned"

### Passo 3: Criar bucket para avatares

1. Vá em **Storage** (menu lateral)
2. Clique em **Create a new bucket**
3. Preencha:

```
Name: avatars
Public bucket: ✅ MARCAR
File size limit: 2097152
Allowed MIME types: image/*
```

4. Clique em **Create bucket**

### Passo 4: Configurar políticas de storage

1. Ainda em **Storage**, selecione o bucket `avatars`
2. Vá em **Policies** (aba superior)
3. Volte no **SQL Editor**
4. Copie TODO o conteúdo de: `.docs/database/storage_policies.sql`
5. Cole e execute

✅ **Sucesso!** Você deve ver 4 políticas criadas

### Passo 5: Verificar se está tudo OK

Execute no SQL Editor:

```sql
-- Ver perfis criados
SELECT * FROM public.user_profiles;

-- Ver políticas de storage
SELECT policyname FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname LIKE '%avatar%';
```

Você deve ver:
- Seus usuários existentes com perfis criados
- 4 políticas de avatar listadas

## ✅ Pronto!

Agora você pode:

1. Fazer login na aplicação
2. Ir em **Perfil**
3. Clicar em **Editar Perfil**
4. Upload de avatar
5. Preencher dados pessoais
6. Salvar

## 🐛 Troubleshooting

### Erro: "column user_id does not exist"
- ✅ Use o arquivo `complete_schema.sql` (ele corrige isso)

### Erro ao fazer upload de avatar
- Verifique se o bucket é PÚBLICO
- Verifique se executou `storage_policies.sql`

### Perfil não carrega
- Verifique no SQL Editor: `SELECT * FROM public.user_profiles;`
- Se estiver vazio, execute: `INSERT INTO public.user_profiles...` (está no schema)

### Avatar não aparece
- Verifique se a URL está sendo salva: `SELECT avatar_url FROM public.user_profiles;`
- Verifique se o bucket `avatars` é público

## 📁 Arquivos de Referência

- `complete_schema.sql` - Schema completo da tabela
- `storage_policies.sql` - Políticas de acesso ao storage
- `SETUP_GUIDE.md` - Este guia (você está aqui!)

## 🎯 Próximos Passos

Depois de configurar o banco:
1. Testar upload de avatar
2. Testar edição de perfil
3. Implementar Google Drive integration
4. Implementar onboarding para novos usuários
