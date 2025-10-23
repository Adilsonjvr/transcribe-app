# 🔑 Configurar AssemblyAI API Key

## ❌ Erro Atual

```
❌ Erro: Upload falhou: 401 - Unauthorized
```

**Causa:** A API Key da AssemblyAI não está configurada ou está incorreta.

---

## ✅ Solução: Configurar API Key

### Passo 1: Obter a API Key da AssemblyAI

1. **Acesse:** https://www.assemblyai.com/

2. **Faça Login ou Crie Conta:**
   - Clique em "Get Started" ou "Sign In"
   - Se não tiver conta, crie uma (é grátis!)
   - Email de confirmação será enviado

3. **Acesse o Dashboard:**
   - Após login, você será redirecionado para o dashboard
   - URL: https://www.assemblyai.com/app

4. **Copie sua API Key:**
   - No topo da página, você verá **"Your API Key"**
   - Clique no ícone de copiar 📋
   - Sua chave tem formato: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

**Exemplo:**
```
1234567890abcdef1234567890abcdef
```

---

### Passo 2: Configurar no Supabase

#### Opção A: Via Dashboard (Mais Fácil)

1. **Acesse o Dashboard do Supabase:**
   - https://supabase.com/dashboard
   - Faça login
   - Selecione seu projeto

2. **Vá em Edge Functions:**
   - Menu lateral → **"Edge Functions"**
   - Ou acesse: https://supabase.com/dashboard/project/fbxdfjkptlfyexhhsgpy/functions

3. **Abra Secrets:**
   - Clique na aba **"Secrets"** (ou "Environment Variables")
   - Ou vá em: Settings → Edge Functions → Secrets

4. **Adicionar Secret:**
   - Clique em **"Add Secret"** ou **"New Secret"**
   - **Name:** `ASSEMBLYAI_API_KEY`
   - **Value:** Cole sua API Key da AssemblyAI
   - Clique em **"Save"** ou **"Add"**

5. **Verificar:**
   - A secret deve aparecer na lista
   - Nome: `ASSEMBLYAI_API_KEY`
   - Valor: `••••••••••••••••` (escondido por segurança)

#### Opção B: Via Supabase CLI

```bash
# Configurar a secret
supabase secrets set ASSEMBLYAI_API_KEY=sua_api_key_aqui

# Exemplo:
supabase secrets set ASSEMBLYAI_API_KEY=1234567890abcdef1234567890abcdef

# Verificar que foi configurada
supabase secrets list

# Deve mostrar:
# ASSEMBLYAI_API_KEY
```

---

### Passo 3: Redeploy da Edge Function

Depois de adicionar a secret, você precisa fazer redeploy da função para ela pegar a nova variável:

#### Via Dashboard:
1. Edge Functions → `dynamic-processor`
2. Clique em **"Deploy"**
3. Aguarde confirmação

#### Via CLI:
```bash
supabase functions deploy dynamic-processor
```

---

### Passo 4: Testar Novamente

Agora teste pelo frontend:

1. Acesse http://localhost:5175/
2. Faça upload de um áudio
3. Ative "Identificar quem está falando"
4. Clique em "Transcrever"
5. **Deve funcionar!** ✅

---

## 🧪 Teste Rápido da API Key

Você pode testar se a API Key funciona diretamente:

```bash
# Testar upload direto na AssemblyAI
curl -X POST https://api.assemblyai.com/v2/upload \
  -H "authorization: SUA_API_KEY_AQUI" \
  -H "content-type: audio/mpeg" \
  --data-binary @audiotest.mp3
```

**Resposta esperada (sucesso):**
```json
{
  "upload_url": "https://cdn.assemblyai.com/upload/abc123..."
}
```

**Resposta de erro (API Key inválida):**
```json
{
  "error": "Unauthorized"
}
```

---

## 📊 Planos da AssemblyAI

### Plano Gratuito
- ✅ **$0/mês**
- ✅ **100 minutos inclusos**
- ✅ Speaker diarization grátis
- ✅ Timestamps grátis
- ✅ Todos os recursos básicos

### Pay-as-you-go
- **$0.65/hora** de áudio
- Sem limite de minutos
- Todos os recursos avançados

**Cálculo de custos:**
- 1 entrevista de 30min = **$0.325**
- 10 entrevistas/mês (5h) = **$3.25/mês**
- 100 entrevistas/mês (50h) = **$32.50/mês**

**Para começar:** O plano gratuito (100min) é suficiente para testar!

---

## 🔍 Verificar se está Funcionando

### Ver Logs da Edge Function

```bash
# Tempo real
supabase functions logs dynamic-processor --follow

# Últimos 50 logs
supabase functions logs dynamic-processor --limit 50
```

### Logs esperados (sucesso):

```
📥 Recebido: { fileName: 'audiotest.mp3', fileSize: 6426112, language: 'pt', diarization: true }
📤 Fazendo upload para AssemblyAI...
✅ Upload URL: https://cdn.assemblyai.com/upload/abc123...
⚙️ Config: { audio_url: '...', language_code: 'pt', speaker_labels: true }
🎙️ Speaker diarization ativado
🆔 Transcript ID: abc123-def456-...
⏳ Aguardando transcrição...
🔄 Poll 1: Status = queued
🔄 Poll 2: Status = processing
🔄 Poll 3: Status = processing
🔄 Poll 4: Status = completed
✅ Transcrição concluída!
📊 15 segmentos processados
🎙️ Speakers detectados: Speaker A, Speaker B
```

### Logs de erro (API Key inválida):

```
📥 Recebido: { ... }
📤 Fazendo upload para AssemblyAI...
❌ Erro: Upload falhou: 401 - Unauthorized  ← ESTE É O ERRO ATUAL
```

---

## ⚠️ Troubleshooting

### Erro: "401 - Unauthorized"
**Causa:** API Key inválida ou não configurada
**Solução:**
1. Verificar que a API Key está correta no dashboard da AssemblyAI
2. Copiar novamente a chave
3. Reconfigurar no Supabase
4. Fazer redeploy da função

### Erro: "Secret ASSEMBLYAI_API_KEY not found"
**Causa:** Secret não foi configurada
**Solução:**
```bash
supabase secrets set ASSEMBLYAI_API_KEY=sua_chave_aqui
supabase functions deploy dynamic-processor
```

### API Key está correta mas continua dando 401
**Possíveis causas:**
1. Espaços extras ao copiar/colar a chave
2. Chave copiada incompleta
3. Conta da AssemblyAI não ativada (verificar email)

**Solução:**
1. No dashboard da AssemblyAI, clique em "Regenerate API Key"
2. Copie a nova chave
3. Configure novamente no Supabase
4. Redeploy

### Como saber se a secret está configurada?

```bash
# Listar todas as secrets
supabase secrets list

# Deve aparecer:
# ASSEMBLYAI_API_KEY
```

Se não aparecer, configure:
```bash
supabase secrets set ASSEMBLYAI_API_KEY=sua_chave
```

---

## ✅ Checklist

- [ ] Criar conta na AssemblyAI (https://www.assemblyai.com/)
- [ ] Confirmar email
- [ ] Fazer login no dashboard
- [ ] Copiar API Key
- [ ] Acessar Supabase Dashboard
- [ ] Ir em Edge Functions → Secrets
- [ ] Adicionar secret `ASSEMBLYAI_API_KEY`
- [ ] Fazer redeploy da Edge Function
- [ ] Testar upload no frontend
- [ ] Verificar logs do Supabase
- [ ] Confirmar que não dá mais erro 401

---

## 📚 Links Úteis

- **AssemblyAI Dashboard:** https://www.assemblyai.com/app
- **AssemblyAI Docs:** https://www.assemblyai.com/docs
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Seu projeto:** https://supabase.com/dashboard/project/fbxdfjkptlfyexhhsgpy

---

**Status:** 🔑 Aguardando configuração da API Key
**Próximo passo:** Obter API Key da AssemblyAI e configurar no Supabase
**Tempo estimado:** 5 minutos
