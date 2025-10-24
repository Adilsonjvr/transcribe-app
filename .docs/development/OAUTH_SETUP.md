# 🔐 Configuração de OAuth (Google e Apple)

Este guia explica como configurar login social com Google e Apple no Supabase.

## 📋 Pré-requisitos

- Conta no Supabase
- Conta de desenvolvedor no Google Cloud Platform
- Conta de desenvolvedor na Apple (para Apple Sign In)

---

## 🔵 Google OAuth

### 1. Criar Credenciais no Google Cloud Platform

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá para **APIs & Services** → **Credentials**
4. Clique em **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure a tela de consentimento (se ainda não configurou):
   - **User Type**: External
   - **App name**: Transcribe App
   - **User support email**: Seu email
   - **Developer contact**: Seu email

### 2. Configurar OAuth Client

1. **Application type**: Web application
2. **Name**: Transcribe App - Supabase
3. **Authorized JavaScript origins**:
   ```
   https://fbxdfjkptlfyexhhsgpy.supabase.co
   ```

4. **Authorized redirect URIs**:
   ```
   https://fbxdfjkptlfyexhhsgpy.supabase.co/auth/v1/callback
   ```

5. Clique em **Create**
6. **Copie o Client ID e Client Secret**

### 3. Configurar no Supabase

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Vá para **Authentication** → **Providers**
3. Ative **Google**
4. Cole as credenciais:
   - **Client ID**: Cole o Client ID do Google
   - **Client Secret**: Cole o Client Secret do Google
5. Clique em **Save**

---

## 🍎 Apple Sign In

### 1. Criar App ID na Apple

1. Acesse [Apple Developer](https://developer.apple.com/account/)
2. Vá para **Certificates, IDs & Profiles**
3. Clique em **Identifiers** → **+ (Novo)**
4. Selecione **App IDs** → **App**
5. Configure:
   - **Description**: Transcribe App
   - **Bundle ID**: `com.transcribeapp.web` (ou seu domínio reverso)
   - **Capabilities**: Marque **Sign In with Apple**

### 2. Criar Service ID

1. Vá para **Identifiers** → **+ (Novo)**
2. Selecione **Services IDs**
3. Configure:
   - **Description**: Transcribe App Web
   - **Identifier**: `com.transcribeapp.web.service`
   - Marque **Sign In with Apple**
4. Clique em **Configure**:
   - **Primary App ID**: Selecione o App ID criado anteriormente
   - **Domains and Subdomains**:
     ```
     fbxdfjkptlfyexhhsgpy.supabase.co
     ```
   - **Return URLs**:
     ```
     https://fbxdfjkptlfyexhhsgpy.supabase.co/auth/v1/callback
     ```
5. Salve e Continue

### 3. Criar Private Key

1. Vá para **Keys** → **+ (Novo)**
2. Configure:
   - **Key Name**: Transcribe App Sign In Key
   - **Services**: Marque **Sign In with Apple**
   - **Primary App ID**: Selecione seu App ID
3. Clique em **Continue** → **Register**
4. **Baixe a chave** (arquivo .p8) - guarde em lugar seguro!
5. Anote o **Key ID**

### 4. Configurar no Supabase

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Vá para **Authentication** → **Providers**
3. Ative **Apple**
4. Preencha:
   - **Services ID**: `com.transcribeapp.web.service`
   - **Team ID**: Encontre em Apple Developer Account → Membership
   - **Key ID**: O Key ID da chave criada
   - **Private Key**: Cole o conteúdo do arquivo .p8 (abra com editor de texto)
5. Clique em **Save**

---

## 🧪 Testando

### Modo de Desenvolvimento

Para testar em `localhost`, adicione também:

**Google:**
- Authorized JavaScript origins: `http://localhost:5173`
- Authorized redirect URIs: `http://localhost:5173/auth/callback`

**Apple:**
- Domains: `localhost:5173`
- Return URLs: `http://localhost:5173/auth/callback`

### Verificar Configuração

1. Abra o app em `http://localhost:5173`
2. Clique em "Entrar"
3. Tente fazer login com Google ou Apple
4. Se tudo estiver correto, você será redirecionado após a autenticação

---

## ⚠️ Problemas Comuns

### Google

**Erro: redirect_uri_mismatch**
- Verifique se as URIs de redirecionamento estão exatamente iguais
- Não use `http` em produção, apenas `https`
- Certifique-se de que não há espaços extras

**Erro: invalid_client**
- Client ID ou Secret incorretos
- Verifique se copiou as credenciais corretamente no Supabase

### Apple

**Erro: invalid_client**
- Service ID incorreto
- Team ID incorreto
- Key ID incorreto

**Erro: invalid_key**
- Private Key mal formatada
- Certifique-se de copiar TODO o conteúdo do arquivo .p8, incluindo:
  ```
  -----BEGIN PRIVATE KEY-----
  ...
  -----END PRIVATE KEY-----
  ```

**Erro: invalid_request**
- Domains ou Return URLs incorretas
- Certifique-se de usar exatamente as URLs do Supabase

---

## 📚 Recursos

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth/social-login)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Apple Sign In Setup](https://supabase.com/docs/guides/auth/social-login/auth-apple)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Apple Developer Portal](https://developer.apple.com/)

---

## 🎯 Checklist de Configuração

### Google
- [ ] Projeto criado no Google Cloud Platform
- [ ] OAuth Client ID criado
- [ ] Authorized JavaScript origins configuradas
- [ ] Authorized redirect URIs configuradas
- [ ] Client ID e Secret copiados
- [ ] Credenciais adicionadas no Supabase
- [ ] Provider ativado no Supabase

### Apple
- [ ] App ID criado
- [ ] Service ID criado e configurado
- [ ] Domains e Return URLs configuradas
- [ ] Private Key criada e baixada
- [ ] Key ID anotado
- [ ] Team ID identificado
- [ ] Credenciais adicionadas no Supabase
- [ ] Provider ativado no Supabase

---

**Nota**: Após configurar, pode levar alguns minutos para as mudanças se propagarem. Se encontrar problemas, aguarde 5-10 minutos e tente novamente.
