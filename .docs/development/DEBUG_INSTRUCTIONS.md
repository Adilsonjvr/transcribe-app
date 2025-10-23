# 🔍 Instruções de Debug - API Key

## Problema

Você disse que a API Key **já está configurada no Supabase**, mas continua dando erro 401.

Possíveis causas:
1. A Edge Function não foi atualizada com o código corrigido
2. A API Key tem espaços extras ou está incompleta
3. A secret está com nome diferente
4. A Edge Function não está lendo a variável de ambiente

---

## Solução: Usar Versão de Debug

### Passo 1: Deploy da Versão de Debug

**Copie o arquivo:** [edge-function-debug.ts](edge-function-debug.ts)

Este arquivo tem logs extras que mostram:
- ✅ Se a API Key foi carregada
- ✅ Tamanho da API Key
- ✅ Primeiros 10 caracteres
- ✅ Headers enviados para AssemblyAI
- ✅ Status da resposta

#### Via Dashboard:

1. Acesse: https://supabase.com/dashboard/project/fbxdfjkptlfyexhhsgpy/functions
2. Clique em `dynamic-processor`
3. Clique em "Edit function"
4. **Apague todo o código atual**
5. **Cole o código de** `edge-function-debug.ts`
6. Clique em "Deploy"

#### Via CLI:

```bash
# 1. Copiar arquivo para pasta correta
cp edge-function-debug.ts supabase/functions/dynamic-processor/index.ts

# 2. Deploy
supabase functions deploy dynamic-processor
```

---

### Passo 2: Fazer um Teste

1. Acesse http://localhost:5175/
2. Faça upload de um áudio
3. Ative "Identificar quem está falando"
4. Clique em "Transcrever"

---

### Passo 3: Ver os Logs

#### Via CLI (Mais Rápido):

```bash
# Ver logs em tempo real
supabase functions logs dynamic-processor --follow
```

#### Via Dashboard:

1. Acesse: https://supabase.com/dashboard/project/fbxdfjkptlfyexhhsgpy/functions
2. Clique em `dynamic-processor`
3. Aba "Logs"

---

## 🔍 O Que Procurar nos Logs

### ✅ Cenário 1: API Key está OK

```
🔍 DEBUG: API Key loaded? YES
🔍 DEBUG: API Key length: 32
🔍 DEBUG: API Key first 10 chars: 407ade7e04
📥 Recebido: { fileName: 'audiotest.mp3', ... }
📤 Fazendo upload para AssemblyAI...
🔍 DEBUG: Upload headers: { authorization: '407ade7e04...', ... }
🔍 DEBUG: Upload response status: 200
🔍 DEBUG: Upload response ok? true
✅ Upload URL: https://cdn.assemblyai.com/upload/...
```

**Se ver isso:** API Key está correta! ✅

---

### ❌ Cenário 2: API Key NÃO está carregada

```
🔍 DEBUG: API Key loaded? NO
🔍 DEBUG: API Key length: 0
🔍 DEBUG: API Key first 10 chars: N/A
❌ Erro: ASSEMBLYAI_API_KEY não está configurada!
```

**Solução:**
```bash
# Via CLI
supabase secrets set ASSEMBLYAI_API_KEY=407ade7e04b64c6fb9a4caaac4c36dd5

# Redeploy
supabase functions deploy dynamic-processor
```

---

### ❌ Cenário 3: API Key tem tamanho errado

```
🔍 DEBUG: API Key loaded? YES
🔍 DEBUG: API Key length: 35  ← Deveria ser 32!
🔍 DEBUG: API Key first 10 chars: 407ade7e04
```

**Causa:** Tem espaços extras ou quebras de linha

**Solução:**
```bash
# Reconfigurar sem espaços
supabase secrets set ASSEMBLYAI_API_KEY=407ade7e04b64c6fb9a4caaac4c36dd5

# Redeploy
supabase functions deploy dynamic-processor
```

---

### ❌ Cenário 4: Upload retorna 401

```
🔍 DEBUG: API Key loaded? YES
🔍 DEBUG: API Key length: 32
🔍 DEBUG: API Key first 10 chars: 407ade7e04
📤 Fazendo upload para AssemblyAI...
🔍 DEBUG: Upload response status: 401  ← ERRO!
🔍 DEBUG: Upload response ok? false
❌ Upload error response: Unauthorized
```

**Causa:** API Key está incorreta ou inválida

**Solução:**

1. **Verificar se a chave está correta:**
   - Acesse: https://www.assemblyai.com/app
   - Copie a API Key novamente
   - Compare com: `407ade7e04b64c6fb9a4caaac4c36dd5`

2. **Se for diferente, atualizar:**
   ```bash
   supabase secrets set ASSEMBLYAI_API_KEY=nova_chave_aqui
   supabase functions deploy dynamic-processor
   ```

3. **Testar a chave diretamente:**
   ```bash
   # Testar se a chave funciona
   curl -X POST https://api.assemblyai.com/v2/upload \
     -H "authorization: 407ade7e04b64c6fb9a4caaac4c36dd5" \
     -H "content-type: application/json" \
     --data '{"audio_url": "https://example.com/test.mp3"}'
   ```

   **Se retornar 401:** Chave inválida, precisa gerar nova no dashboard da AssemblyAI

---

## 🧪 Teste Rápido da API Key

Você pode testar sua API Key diretamente:

```bash
curl https://api.assemblyai.com/v2/transcript \
  -H "authorization: 407ade7e04b64c6fb9a4caaac4c36dd5" \
  -H "content-type: application/json" \
  -d '{"audio_url": "https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3"}'
```

**Resposta esperada (API Key válida):**
```json
{
  "id": "abc123...",
  "status": "queued",
  ...
}
```

**Resposta de erro (API Key inválida):**
```json
{
  "error": "Unauthorized"
}
```

---

## 📋 Checklist de Verificação

- [ ] API Key copiada do dashboard: `407ade7e04b64c6fb9a4caaac4c36dd5`
- [ ] Testar chave diretamente com cURL (ver comando acima)
- [ ] Se válida: configurar no Supabase
- [ ] Deploy da versão de debug
- [ ] Fazer teste pelo frontend
- [ ] Ver logs e identificar problema
- [ ] Aplicar solução baseado nos logs
- [ ] Testar novamente

---

## 🔧 Comandos Úteis

### Ver secrets configuradas:
```bash
supabase secrets list
```

### Configurar secret:
```bash
supabase secrets set ASSEMBLYAI_API_KEY=407ade7e04b64c6fb9a4caaac4c36dd5
```

### Remover secret (se precisar reconfigurar):
```bash
supabase secrets unset ASSEMBLYAI_API_KEY
supabase secrets set ASSEMBLYAI_API_KEY=407ade7e04b64c6fb9a4caaac4c36dd5
```

### Ver logs:
```bash
supabase functions logs dynamic-processor --follow
```

### Deploy:
```bash
supabase functions deploy dynamic-processor
```

---

## 💡 Dica Importante

Se você não tem acesso ao Supabase CLI ou às secrets:

1. **Via Dashboard:**
   - Settings → Edge Functions → Secrets
   - Editar `ASSEMBLYAI_API_KEY`
   - Certificar que o valor é exatamente: `407ade7e04b64c6fb9a4caaac4c36dd5`
   - Sem espaços antes ou depois
   - Clicar em "Save"

2. **Redeploy:**
   - Edge Functions → dynamic-processor → "Deploy"

3. **Ver Logs:**
   - Edge Functions → dynamic-processor → Aba "Logs"

---

## ✅ Quando Funcionar

Você verá nos logs:

```
🔍 DEBUG: API Key loaded? YES
🔍 DEBUG: API Key length: 32
🔍 DEBUG: API Key first 10 chars: 407ade7e04
📥 Recebido: { ... }
📤 Fazendo upload para AssemblyAI...
🔍 DEBUG: Upload response status: 200
🔍 DEBUG: Upload response ok? true
✅ Upload URL: https://cdn.assemblyai.com/upload/...
⚙️ Config: { audio_url: '...', language_code: 'pt', speaker_labels: true }
🎙️ Speaker diarization ativado
🆔 Transcript ID: ...
⏳ Aguardando transcrição...
🔄 Poll 1: Status = queued
🔄 Poll 2: Status = processing
🔄 Poll 3: Status = completed
✅ Transcrição concluída!
📊 15 segmentos processados
🎙️ Speakers detectados: Speaker A, Speaker B
```

E no frontend verá os speakers com badges coloridos! 🎉

---

**Me avise o que apareceu nos logs!** Isso vai me ajudar a identificar exatamente qual é o problema.
