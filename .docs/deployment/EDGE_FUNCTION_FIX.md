# 🔧 Correção da Edge Function - CORS e FormData

## ❌ Problemas Identificados

### 1. **Erro CORS**
```
Access to fetch at 'https://...supabase.co/functions/v1/dynamic-processor'
from origin 'http://localhost:5175' has been blocked by CORS policy
```

**Causa:** Edge Function não retorna headers CORS corretos

### 2. **Missing content type**
```
TypeError: Missing content type
at packageData (ext:deno_fetch/22_body.js:405:13)
```

**Causa:** FormData em Deno precisa ser processado diferente do Node.js

---

## ✅ Solução Completa

### Código Corrigido da Edge Function

```typescript
// supabase/functions/dynamic-processor/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ASSEMBLYAI_API_KEY = Deno.env.get('ASSEMBLYAI_API_KEY')

// Mapeamento de códigos de idioma
const LANGUAGE_MAP: Record<string, string> = {
  'pt': 'pt',
  'en': 'en',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'it': 'it'
}

// ← HEADERS CORS (CORREÇÃO 1)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

serve(async (req) => {
  // ← HANDLE OPTIONS REQUEST (CORREÇÃO 2)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // ← PROCESSAR FORMDATA CORRETAMENTE (CORREÇÃO 3)
    const formData = await req.formData()
    const audioFile = formData.get('file') as File
    const language = (formData.get('language') as string) || 'pt'
    const enableDiarization = formData.get('diarization') === 'true'

    console.log('📥 Recebido:', {
      fileName: audioFile?.name,
      fileSize: audioFile?.size,
      fileType: audioFile?.type,
      language,
      diarization: enableDiarization
    })

    if (!audioFile) {
      throw new Error('Nenhum arquivo foi enviado')
    }

    // 1. Upload do arquivo para AssemblyAI
    console.log('📤 Fazendo upload para AssemblyAI...')

    // ← CONVERTER FILE PARA ARRAYBUFFER (CORREÇÃO 4)
    const arrayBuffer = await audioFile.arrayBuffer()

    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLYAI_API_KEY || '',
        'content-type': audioFile.type || 'audio/mpeg'
      },
      body: arrayBuffer
    })

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      throw new Error(`Upload falhou: ${uploadResponse.status} - ${errorText}`)
    }

    const { upload_url } = await uploadResponse.json()
    console.log('✅ Upload URL:', upload_url)

    // 2. Criar transcrição com configurações
    const transcriptConfig: any = {
      audio_url: upload_url,
      language_code: LANGUAGE_MAP[language] || 'pt'
    }

    // Adicionar diarization se habilitado
    if (enableDiarization) {
      transcriptConfig.speaker_labels = true
      console.log('🎙️ Speaker diarization ativado')
    }

    console.log('⚙️ Config:', transcriptConfig)

    const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLYAI_API_KEY || '',
        'content-type': 'application/json'
      },
      body: JSON.stringify(transcriptConfig)
    })

    if (!transcriptResponse.ok) {
      const errorText = await transcriptResponse.text()
      throw new Error(`Transcrição falhou: ${transcriptResponse.status} - ${errorText}`)
    }

    const { id } = await transcriptResponse.json()
    console.log('🆔 Transcript ID:', id)

    // 3. Polling até completar (timeout de 10 minutos para arquivos grandes)
    console.log('⏳ Aguardando transcrição...')
    const startTime = Date.now()
    const TIMEOUT = 10 * 60 * 1000  // 10 minutos

    let transcript: any
    let pollCount = 0

    while (true) {
      pollCount++

      if (Date.now() - startTime > TIMEOUT) {
        throw new Error('Timeout: transcrição demorou mais de 10 minutos')
      }

      const pollingResponse = await fetch(
        `https://api.assemblyai.com/v2/transcript/${id}`,
        {
          headers: {
            'authorization': ASSEMBLYAI_API_KEY || ''
          }
        }
      )

      if (!pollingResponse.ok) {
        throw new Error(`Polling falhou: ${pollingResponse.status}`)
      }

      transcript = await pollingResponse.json()
      console.log(`🔄 Poll ${pollCount}: Status = ${transcript.status}`)

      if (transcript.status === 'completed') break
      if (transcript.status === 'error') {
        throw new Error(`Erro na transcrição: ${transcript.error}`)
      }

      // Aguardar 3 segundos antes de verificar novamente
      await new Promise(resolve => setTimeout(resolve, 3000))
    }

    console.log('✅ Transcrição concluída!')

    // 4. Processar resposta
    const response: any = {
      success: true,
      text: transcript.text,
      language: transcript.language_code
    }

    // Adicionar segments com speakers se disponível
    if (transcript.utterances && transcript.utterances.length > 0) {
      response.segments = transcript.utterances.map((utterance: any) => ({
        start: utterance.start / 1000,      // Converter ms para segundos
        end: utterance.end / 1000,          // Converter ms para segundos
        text: utterance.text,
        speaker: utterance.speaker ? `Speaker ${utterance.speaker}` : undefined,
        confidence: utterance.confidence
      }))

      console.log(`📊 ${response.segments.length} segmentos processados`)

      // Log de speakers únicos
      const uniqueSpeakers = [...new Set(response.segments.map((s: any) => s.speaker).filter(Boolean))]
      console.log(`🎙️ Speakers detectados: ${uniqueSpeakers.join(', ')}`)
    }

    // ← ADICIONAR CORS HEADERS NA RESPOSTA (CORREÇÃO 5)
    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })

  } catch (error: any) {
    console.error('❌ Erro:', error)

    // ← ADICIONAR CORS HEADERS NO ERRO TAMBÉM (CORREÇÃO 6)
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Erro desconhecido'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
})
```

---

## 🔍 Principais Correções

### 1️⃣ **Headers CORS Completos**
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}
```

### 2️⃣ **Handle OPTIONS Request (Preflight)**
```typescript
if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders })
}
```

### 3️⃣ **Type Casting do FormData**
```typescript
const audioFile = formData.get('file') as File
const language = (formData.get('language') as string) || 'pt'
```

### 4️⃣ **Converter File para ArrayBuffer**
```typescript
const arrayBuffer = await audioFile.arrayBuffer()

const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
  method: 'POST',
  headers: {
    'authorization': ASSEMBLYAI_API_KEY || '',
    'content-type': audioFile.type || 'audio/mpeg'
  },
  body: arrayBuffer  // ← ArrayBuffer, não File
})
```

### 5️⃣ **CORS em Todas as Respostas**
```typescript
return new Response(JSON.stringify(response), {
  headers: {
    'Content-Type': 'application/json',
    ...corsHeaders  // ← Espalhar headers CORS
  }
})
```

### 6️⃣ **Logs Melhorados com Emojis**
```typescript
console.log('📥 Recebido:', { ... })
console.log('📤 Fazendo upload...')
console.log('✅ Upload concluído!')
console.log('⏳ Aguardando transcrição...')
console.log('🔄 Poll 1: Status = processing')
console.log('✅ Transcrição concluída!')
console.log('📊 10 segmentos processados')
console.log('🎙️ Speakers detectados: Speaker A, Speaker B')
```

---

## 📝 Como Aplicar a Correção

### Opção 1: Via Dashboard Supabase (Mais Fácil)

1. **Acesse o Dashboard**
   - https://supabase.com/dashboard
   - Selecione seu projeto

2. **Vá em Edge Functions**
   - Menu lateral → Edge Functions
   - Clique em `dynamic-processor`

3. **Edite o Código**
   - Clique em "Edit function"
   - Cole o código corrigido acima
   - Salve

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde confirmação

### Opção 2: Via Supabase CLI (Recomendado)

1. **Instalar CLI** (se não tiver)
```bash
npm install -g supabase
```

2. **Login**
```bash
supabase login
```

3. **Criar arquivo local**
```bash
# Criar estrutura de pastas
mkdir -p supabase/functions/dynamic-processor

# Criar arquivo
nano supabase/functions/dynamic-processor/index.ts
```

4. **Colar código corrigido**
   - Cole todo o código da seção "Código Corrigido" acima
   - Salve (Ctrl+X → Y → Enter)

5. **Deploy**
```bash
supabase functions deploy dynamic-processor
```

6. **Verificar logs**
```bash
supabase functions logs dynamic-processor
```

---

## 🧪 Como Testar

### 1. Testar com cURL (Sem Diarization)
```bash
curl -X POST https://fbxdfjkptlfyexhhsgpy.supabase.co/functions/v1/dynamic-processor \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -F "file=@audiotest.mp3" \
  -F "language=pt"
```

### 2. Testar com cURL (Com Diarization)
```bash
curl -X POST https://fbxdfjkptlfyexhhsgpy.supabase.co/functions/v1/dynamic-processor \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -F "file=@audiotest.mp3" \
  -F "language=pt" \
  -F "diarization=true"
```

### 3. Testar pelo Frontend
1. Acesse http://localhost:5175/
2. Faça upload de um áudio
3. Ative "Identificar quem está falando"
4. Clique em "Transcrever"
5. Aguarde resultado

### 4. Verificar Logs no Supabase
```bash
# Tempo real
supabase functions logs dynamic-processor --follow

# Últimos 100 logs
supabase functions logs dynamic-processor --limit 100
```

---

## 📊 Resposta Esperada

### Sucesso (Sem Diarization)
```json
{
  "success": true,
  "text": "Esta é a transcrição completa do áudio.",
  "language": "pt"
}
```

### Sucesso (Com Diarization)
```json
{
  "success": true,
  "text": "Olá, como vai? Tudo bem, obrigado!",
  "language": "pt",
  "segments": [
    {
      "start": 0.0,
      "end": 1.38,
      "text": "Olá, como vai?",
      "speaker": "Speaker A",
      "confidence": 0.97
    },
    {
      "start": 1.38,
      "end": 2.65,
      "text": "Tudo bem, obrigado!",
      "speaker": "Speaker B",
      "confidence": 0.95
    }
  ]
}
```

### Erro (Exemplo)
```json
{
  "success": false,
  "error": "Nenhum arquivo foi enviado"
}
```

---

## 🔐 Verificar Secrets

Certifique-se de que a API Key está configurada:

```bash
# Listar secrets
supabase secrets list

# Deve mostrar:
# ASSEMBLYAI_API_KEY

# Se não estiver, adicionar:
supabase secrets set ASSEMBLYAI_API_KEY=your_actual_api_key_here
```

Ou pelo Dashboard:
1. Settings → Edge Functions → Secrets
2. Adicionar `ASSEMBLYAI_API_KEY`

---

## 🐛 Troubleshooting

### Erro: "Missing content type"
**Solução:** Código corrigido já resolve (linha 48: `arrayBuffer`)

### Erro: CORS
**Solução:** Código corrigido já resolve (linhas 16-20, 23-25)

### Erro: "Upload falhou: 401"
**Causa:** API Key da AssemblyAI inválida
**Solução:** Verificar `ASSEMBLYAI_API_KEY` nas secrets

### Erro: "Timeout"
**Causa:** Arquivo muito grande (>10min)
**Solução:** Aumentar `TIMEOUT` na linha 104

### Transcrição vazia
**Causa:** Arquivo de áudio corrompido ou formato não suportado
**Solução:** Verificar formato do áudio (MP3, WAV, M4A)

---

## ✅ Checklist de Implementação

- [ ] Copiar código corrigido
- [ ] Colar em `supabase/functions/dynamic-processor/index.ts`
- [ ] Verificar que `ASSEMBLYAI_API_KEY` está configurada
- [ ] Deploy da função
- [ ] Testar com cURL (sem diarization)
- [ ] Testar com cURL (com diarization)
- [ ] Testar pelo frontend
- [ ] Verificar logs
- [ ] Confirmar que CORS funciona
- [ ] Confirmar que speakers aparecem

---

## 📚 Referências

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Deno FormData](https://deno.land/api@v1.37.0?s=FormData)
- [AssemblyAI API](https://www.assemblyai.com/docs/api-reference)
- [CORS Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Status:** 🔧 Correção completa - Pronto para deploy
**Data:** 2025-10-23
**Versão:** 1.1.0
