# 🚀 Guia de Atualização da Edge Function - AssemblyAI

## 📋 Resumo

A Edge Function `dynamic-processor` precisa ser atualizada para suportar **Speaker Diarization** usando a API nativa da **AssemblyAI**. A boa notícia: **AssemblyAI já tem diarization integrada e é GRÁTIS!**

---

## ✅ O que AssemblyAI Oferece NATIVAMENTE

### 1. **Speaker Diarization (Speaker Labels)**
- ✅ Identifica automaticamente diferentes speakers ("A", "B", "C", etc.)
- ✅ **Grátis** - incluído no plano padrão
- ✅ Suporta de 1 a 10 speakers
- ✅ Funciona com áudio mono e estéreo
- ✅ Melhorias de 2024-2025: 10.1% mais preciso!

### 2. **Timestamps Precisos**
- ✅ Timestamps em milissegundos
- ✅ Start/end para cada utterance (fala)
- ✅ Word-level timestamps também disponíveis

### 3. **Multichannel (Áudio Estéreo)**
- ✅ Processa cada canal separadamente
- ✅ 100% de acurácia (cada canal = 1 speaker)
- ✅ Ideal para entrevistas gravadas com 2 microfones

---

## 🔧 Como Funciona a API da AssemblyAI

### Passo 1: Upload do Áudio
```javascript
// POST https://api.assemblyai.com/v2/upload
// Headers: { 'authorization': 'YOUR_API_KEY' }
// Body: arquivo binário

// Response:
{
  "upload_url": "https://cdn.assemblyai.com/upload/ccbbbfaf-f319-4455-9556-272d48faaf7f"
}
```

### Passo 2: Criar Transcrição com Diarization
```javascript
// POST https://api.assemblyai.com/v2/transcript
// Headers: { 'authorization': 'YOUR_API_KEY' }

// Request body:
{
  "audio_url": "https://cdn.assemblyai.com/upload/ccbbbfaf-f319-4455-9556-272d48faaf7f",
  "language_code": "pt",           // ou 'en', 'es', etc.
  "speaker_labels": true,           // ← ATIVAR DIARIZATION
  "speakers_expected": 2            // Opcional: número de speakers esperados
}

// Response:
{
  "id": "5552830-d8b1-4e60-a2b4-bdfefb3130b3",
  "status": "queued"  // ou "processing", "completed"
}
```

### Passo 3: Polling (Verificar Status)
```javascript
// GET https://api.assemblyai.com/v2/transcript/{id}
// Headers: { 'authorization': 'YOUR_API_KEY' }

// Response quando status = "completed":
{
  "id": "5552830-d8b1-4e60-a2b4-bdfefb3130b3",
  "status": "completed",
  "text": "Hi, I'm joy. Hi, I'm sharon. Do you have kids in school?",
  "utterances": [
    {
      "speaker": "A",
      "confidence": 0.97,
      "start": 0,           // milliseconds
      "end": 1380,          // milliseconds
      "text": "Hi, I'm joy.",
      "words": [
        {
          "text": "Hi",
          "start": 0,
          "end": 210,
          "confidence": 0.99,
          "speaker": "A"
        }
      ]
    },
    {
      "speaker": "B",
      "confidence": 0.95,
      "start": 1380,
      "end": 2650,
      "text": "Hi, I'm sharon.",
      "words": [...]
    }
  ]
}
```

---

## 📝 Atualização da Edge Function

### Código Atual (Presumido)
```typescript
// supabase/functions/dynamic-processor/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ASSEMBLYAI_API_KEY = Deno.env.get('ASSEMBLYAI_API_KEY')

serve(async (req) => {
  try {
    const formData = await req.formData()
    const audioFile = formData.get('file')
    const language = formData.get('language') || 'pt'

    // 1. Upload do arquivo para AssemblyAI
    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: { 'authorization': ASSEMBLYAI_API_KEY },
      body: audioFile
    })

    const { upload_url } = await uploadResponse.json()

    // 2. Criar transcrição
    const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLYAI_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        audio_url: upload_url,
        language_code: language
      })
    })

    const { id } = await transcriptResponse.json()

    // 3. Polling até completar
    let transcript
    while (true) {
      const pollingResponse = await fetch(
        `https://api.assemblyai.com/v2/transcript/${id}`,
        { headers: { 'authorization': ASSEMBLYAI_API_KEY } }
      )

      transcript = await pollingResponse.json()

      if (transcript.status === 'completed') break
      if (transcript.status === 'error') throw new Error(transcript.error)

      await new Promise(resolve => setTimeout(resolve, 3000))
    }

    return new Response(JSON.stringify({
      success: true,
      text: transcript.text
    }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
```

---

### Código ATUALIZADO (Com Diarization + Timestamps)

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

serve(async (req) => {
  try {
    const formData = await req.formData()
    const audioFile = formData.get('file')
    const language = formData.get('language') || 'pt'
    const enableDiarization = formData.get('diarization') === 'true'  // ← NOVO

    console.log('Recebido:', {
      fileName: audioFile?.name,
      language,
      diarization: enableDiarization
    })

    // 1. Upload do arquivo para AssemblyAI
    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: { 'authorization': ASSEMBLYAI_API_KEY },
      body: audioFile
    })

    if (!uploadResponse.ok) {
      throw new Error(`Upload falhou: ${uploadResponse.statusText}`)
    }

    const { upload_url } = await uploadResponse.json()
    console.log('Upload URL:', upload_url)

    // 2. Criar transcrição com configurações
    const transcriptConfig: any = {
      audio_url: upload_url,
      language_code: LANGUAGE_MAP[language] || 'pt'
    }

    // ← ADICIONAR DIARIZATION SE HABILITADO
    if (enableDiarization) {
      transcriptConfig.speaker_labels = true
      // Opcional: especificar número esperado de speakers
      // transcriptConfig.speakers_expected = 2
    }

    console.log('Config:', transcriptConfig)

    const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLYAI_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(transcriptConfig)
    })

    if (!transcriptResponse.ok) {
      throw new Error(`Transcrição falhou: ${transcriptResponse.statusText}`)
    }

    const { id } = await transcriptResponse.json()
    console.log('Transcript ID:', id)

    // 3. Polling até completar (timeout de 5 minutos)
    const startTime = Date.now()
    const TIMEOUT = 5 * 60 * 1000  // 5 minutos

    let transcript
    while (true) {
      if (Date.now() - startTime > TIMEOUT) {
        throw new Error('Timeout: transcrição demorou mais de 5 minutos')
      }

      const pollingResponse = await fetch(
        `https://api.assemblyai.com/v2/transcript/${id}`,
        { headers: { 'authorization': ASSEMBLYAI_API_KEY } }
      )

      transcript = await pollingResponse.json()
      console.log('Status:', transcript.status)

      if (transcript.status === 'completed') break
      if (transcript.status === 'error') {
        throw new Error(`Erro na transcrição: ${transcript.error}`)
      }

      // Aguardar 3 segundos antes de verificar novamente
      await new Promise(resolve => setTimeout(resolve, 3000))
    }

    console.log('Transcrição concluída!')

    // 4. Processar resposta
    const response: any = {
      success: true,
      text: transcript.text,
      language: transcript.language_code
    }

    // ← ADICIONAR SEGMENTS COM SPEAKERS SE DISPONÍVEL
    if (transcript.utterances && transcript.utterances.length > 0) {
      response.segments = transcript.utterances.map((utterance: any) => ({
        start: utterance.start / 1000,      // Converter ms para segundos
        end: utterance.end / 1000,          // Converter ms para segundos
        text: utterance.text,
        speaker: utterance.speaker ? `Speaker ${utterance.speaker}` : undefined,
        confidence: utterance.confidence
      }))

      console.log(`${response.segments.length} segmentos processados`)
    }

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Erro:', error)

    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Erro desconhecido'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
```

---

## 🔑 Variáveis de Ambiente

Certifique-se de que a Edge Function tem acesso à chave da API:

```bash
# No dashboard do Supabase:
# Settings > Edge Functions > Secrets

ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here
```

Para obter a API Key:
1. Acesse [AssemblyAI Dashboard](https://www.assemblyai.com/app)
2. Faça login ou crie conta
3. Vá em "API Keys"
4. Copie sua chave

---

## 📊 Formato da Resposta Esperado

### Sem Diarization
```json
{
  "success": true,
  "text": "Esta é a transcrição completa do áudio.",
  "language": "pt"
}
```

### Com Diarization
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

---

## 🧪 Como Testar

### 1. Deploy da Edge Function
```bash
# Instalar Supabase CLI (se não tiver)
npm install -g supabase

# Login
supabase login

# Linkar projeto
supabase link --project-ref YOUR_PROJECT_REF

# Deploy
supabase functions deploy dynamic-processor
```

### 2. Testar com cURL
```bash
# Sem diarization
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/dynamic-processor \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -F "file=@audio.mp3" \
  -F "language=pt"

# Com diarization
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/dynamic-processor \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -F "file=@audio.mp3" \
  -F "language=pt" \
  -F "diarization=true"
```

### 3. Testar pelo Frontend
1. Acesse o app: http://localhost:5175/
2. Ative o toggle "Identificar quem está falando"
3. Selecione um idioma
4. Faça upload de um arquivo de áudio
5. Verifique se os speakers aparecem nos resultados

---

## 📈 Recursos Adicionais da AssemblyAI

### Outros Recursos Úteis (Opcional)

```typescript
const transcriptConfig = {
  audio_url: upload_url,
  language_code: 'pt',

  // Diarization
  speaker_labels: true,
  speakers_expected: 2,  // Otimiza para 2 speakers

  // Outros recursos úteis:
  punctuate: true,          // Pontuação automática
  format_text: true,        // Formatação (números, datas, etc.)
  filter_profanity: false,  // Censurar palavrões

  // Auto-detect de idioma (se language_code não especificado)
  language_detection: true,

  // Resumo automático (pago)
  // summarization: true,
  // summary_model: 'informative',
  // summary_type: 'bullets'
}
```

---

## 💰 Custos AssemblyAI

### Plano Gratuito
- **$0.00/mês**
- 100 minutos de transcrição inclusos
- Speaker diarization incluído
- Timestamps incluídos
- Limite de 5 horas de áudio

### Plano Pay-as-you-go
- **$0.00037/segundo** ($0.65/hora)
- Sem limite de minutos
- Todos os recursos incluídos
- Sem taxa mensal

**Cálculo:**
- 1 entrevista de 30min = $0.325
- 100 entrevistas/mês (50h) = $32.50/mês

---

## ✅ Checklist de Implementação

- [ ] Obter API Key da AssemblyAI
- [ ] Adicionar ASSEMBLYAI_API_KEY nas secrets da Edge Function
- [ ] Atualizar código da Edge Function com diarization
- [ ] Fazer deploy da função atualizada
- [ ] Testar com cURL
- [ ] Testar pelo frontend
- [ ] Verificar formato da resposta
- [ ] Validar que speakers aparecem corretamente
- [ ] Testar com diferentes idiomas
- [ ] Testar com áudios de diferentes durações

---

## 🔗 Referências

### Documentação Oficial
- [AssemblyAI Speaker Diarization](https://www.assemblyai.com/docs/Models/speaker_diarization)
- [AssemblyAI API Reference](https://www.assemblyai.com/docs/api-reference)
- [AssemblyAI Python SDK](https://github.com/AssemblyAI/assemblyai-python-sdk)

### Tutoriais
- [Speaker Diarization Tutorial](https://www.assemblyai.com/blog/speaker-diarization-python)
- [Multichannel Audio Processing](https://www.assemblyai.com/blog/multichannel-speaker-diarization)

### GitHub Examples
- [AssemblyAI Speaker Diarization Example](https://github.com/AssemblyAI/speaker-diarization)

---

**Status:** 📝 Guia completo - Pronto para implementação
**Data:** 2025-10-23
**Versão:** 1.0.0
