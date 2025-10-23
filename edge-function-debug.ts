// supabase/functions/dynamic-processor/index.ts
// VERSÃO COM DEBUG - Para identificar problema com API Key

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ASSEMBLYAI_API_KEY = Deno.env.get('ASSEMBLYAI_API_KEY')

// ← DEBUG: Verificar se API Key foi carregada
console.log('🔍 DEBUG: API Key loaded?', ASSEMBLYAI_API_KEY ? 'YES' : 'NO')
console.log('🔍 DEBUG: API Key length:', ASSEMBLYAI_API_KEY?.length || 0)
console.log('🔍 DEBUG: API Key first 10 chars:', ASSEMBLYAI_API_KEY?.substring(0, 10) || 'N/A')

// Mapeamento de códigos de idioma
const LANGUAGE_MAP: Record<string, string> = {
  'pt': 'pt',
  'en': 'en',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'it': 'it'
}

// HEADERS CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

serve(async (req) => {
  // HANDLE OPTIONS REQUEST
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // ← DEBUG: Verificar API Key novamente
    if (!ASSEMBLYAI_API_KEY) {
      throw new Error('ASSEMBLYAI_API_KEY não está configurada!')
    }

    // PROCESSAR FORMDATA
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

    // ← DEBUG: Mostrar headers que serão enviados
    console.log('🔍 DEBUG: Upload headers:', {
      authorization: ASSEMBLYAI_API_KEY.substring(0, 10) + '...',
      'content-type': audioFile.type || 'audio/mpeg'
    })

    const arrayBuffer = await audioFile.arrayBuffer()

    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLYAI_API_KEY,
        'content-type': audioFile.type || 'audio/mpeg'
      },
      body: arrayBuffer
    })

    // ← DEBUG: Mostrar status da resposta
    console.log('🔍 DEBUG: Upload response status:', uploadResponse.status)
    console.log('🔍 DEBUG: Upload response ok?', uploadResponse.ok)

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('❌ Upload error response:', errorText)
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
        'authorization': ASSEMBLYAI_API_KEY,
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

    // 3. Polling até completar
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
            'authorization': ASSEMBLYAI_API_KEY
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

    // ADICIONAR CORS HEADERS NA RESPOSTA
    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })

  } catch (error: any) {
    console.error('❌ Erro:', error)
    console.error('❌ Erro stack:', error.stack)

    // ADICIONAR CORS HEADERS NO ERRO TAMBÉM
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
