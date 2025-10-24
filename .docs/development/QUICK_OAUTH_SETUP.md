# ⚡ Configuração Rápida de OAuth no Supabase

## 🚀 Google Sign In (Ativação Imediata - 2 minutos)

### Opção 1: OAuth Compartilhado do Supabase (Mais Rápido)

1. **Acesse o Supabase Dashboard:**
   ```
   https://app.supabase.com/project/fbxdfjkptlfyexhhsgpy/auth/providers
   ```

2. **Encontre "Google" na lista**
3. **Ative o toggle "Enable Sign in with Google"**
4. **Clique em "Save"**

✅ **Pronto!** Já funciona.

⚠️ **Limitação:** A tela de consent do Google vai mostrar:
- "Sign in with Supabase"
- Email: noreply@supabase.io

**Isso é OK para desenvolvimento e testes!**

---

### Opção 2: Suas Próprias Credenciais (Profissional)

Se você quiser que apareça "Transcribe App" na tela do Google:

#### Passo 1: Google Cloud Platform

1. Acesse: https://console.cloud.google.com/
2. Crie novo projeto: **"Transcribe App"**
3. Vá em **APIs & Services** → **Credentials**
4. Clique **Create Credentials** → **OAuth 2.0 Client ID**

5. **Configure OAuth Consent Screen** (primeira vez):
   - User Type: **External**
   - App name: **Transcribe App**
   - User support email: **seu-email@gmail.com**
   - Developer contact: **seu-email@gmail.com**
   - Salve

6. **Criar OAuth Client ID**:
   - Application type: **Web application**
   - Name: **Transcribe App - Production**

   - **Authorized JavaScript origins**:
     ```
     https://fbxdfjkptlfyexhhsgpy.supabase.co
     http://localhost:5173
     ```

   - **Authorized redirect URIs**:
     ```
     https://fbxdfjkptlfyexhhsgpy.supabase.co/auth/v1/callback
     http://localhost:5173/auth/callback
     ```

7. **Clique em "Create"**
8. **Copie:**
   - Client ID (parece com: `123456789-abc123.apps.googleusercontent.com`)
   - Client Secret (parece com: `GOCSPX-abc123xyz`)

#### Passo 2: Configurar no Supabase

1. Volte para: https://app.supabase.com/project/fbxdfjkptlfyexhhsgpy/auth/providers
2. Expanda **Google**
3. **Desative** "Use Supabase OAuth credentials"
4. Cole:
   - **Client ID**: (o que você copiou)
   - **Client Secret**: (o que você copiou)
5. **Save**

✅ **Pronto!** Agora vai mostrar "Transcribe App"

---

## 🍎 Apple Sign In (Requer Apple Developer)

### Pré-requisitos
- Apple Developer Account ($99/ano)
- Não tem OAuth compartilhado disponível

### Configuração Completa
Siga o guia detalhado em: `OAUTH_SETUP.md`

---

## 🧪 Testando

### Teste Local (localhost:5173)

1. Certifique-se que o dev server está rodando:
   ```bash
   npm run dev
   ```

2. Abra: `http://localhost:5173`

3. Clique em **"Entrar"**

4. Clique no botão **"Google"**

5. Você deve ser redirecionado para a tela de login do Google

6. Após fazer login, retorna automaticamente ao app autenticado

---

## ⚠️ Problemas Comuns

### "redirect_uri_mismatch"
**Causa:** URL de callback não está autorizada

**Solução:**
1. Vá no Google Cloud Console
2. Edite o OAuth Client
3. Adicione exatamente estas URIs:
   ```
   https://fbxdfjkptlfyexhhsgpy.supabase.co/auth/v1/callback
   http://localhost:5173/auth/callback
   ```

### "Access blocked: This app's request is invalid"
**Causa:** OAuth Consent Screen não configurado

**Solução:**
1. Configure a OAuth Consent Screen no Google Cloud
2. Adicione seu email de teste em "Test users"

### Botão não responde
**Causa:** Provider não ativado no Supabase

**Solução:**
1. Verifique se o toggle está ATIVO no Supabase Dashboard
2. Recarregue a página do app

---

## 📊 Comparação: OAuth Compartilhado vs Próprio

| Aspecto | OAuth do Supabase | Suas Credenciais |
|---------|-------------------|------------------|
| **Tempo de setup** | 2 minutos | 15-30 minutos |
| **Custo** | Grátis | Grátis (Google) |
| **Nome mostrado** | "Supabase" | "Transcribe App" |
| **Email mostrado** | noreply@supabase.io | Seu email |
| **Produção** | ⚠️ Não recomendado | ✅ Recomendado |
| **Desenvolvimento** | ✅ Perfeito | ✅ Perfeito |
| **Configuração** | Toggle on/off | Client ID + Secret |

---

## 🎯 Recomendação

### Para Desenvolvimento/Testes
Use **OAuth Compartilhado do Supabase**
- Mais rápido
- Zero configuração
- Funciona imediatamente

### Para Produção
Use **Suas Próprias Credenciais**
- Mais profissional
- Seu nome e logo
- Melhor controle

---

## 📚 Links Úteis

- [Supabase Auth Dashboard](https://app.supabase.com/project/fbxdfjkptlfyexhhsgpy/auth/providers)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Supabase OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)

---

## ✅ Checklist de Ativação Rápida

### Google (Opção Rápida)
- [ ] Acessar Supabase Dashboard
- [ ] Ir em Authentication → Providers
- [ ] Encontrar "Google"
- [ ] Ativar toggle
- [ ] Clicar em "Save"
- [ ] Testar no app

### Google (Opção Profissional)
- [ ] Criar projeto no Google Cloud
- [ ] Configurar OAuth Consent Screen
- [ ] Criar OAuth Client ID
- [ ] Adicionar Authorized URIs
- [ ] Copiar Client ID e Secret
- [ ] Colar no Supabase
- [ ] Desativar "Use Supabase credentials"
- [ ] Salvar
- [ ] Testar no app

---

**💡 Dica:** Comece com o OAuth compartilhado para testar rapidamente, depois migre para suas próprias credenciais quando for para produção.
