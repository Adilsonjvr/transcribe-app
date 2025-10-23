# 🎙️ Speaker Diarization (Identificação de Quem Está Falando)

## 📋 Resumo

Speaker Diarization é uma funcionalidade que identifica automaticamente diferentes pessoas falando em um áudio, rotulando cada segmento com "Speaker 1", "Speaker 2", etc. É ideal para entrevistas, podcasts, reuniões e qualquer áudio com múltiplos interlocutores.

---

## ✅ Implementação no Frontend (CONCLUÍDA)

### 1. **Componente DiarizationToggle**

**Arquivo criado:** [src/components/DiarizationToggle.jsx](src/components/DiarizationToggle.jsx)

**Funcionalidades:**
- ✅ Toggle on/off visual e acessível
- ✅ Tooltip informativo sobre diarization
- ✅ Explicação sobre áudios estéreo vs mono
- ✅ Estados disabled durante upload/transcrição
- ✅ Design consistente com o resto da aplicação

**Exemplo de uso:**
```jsx
<DiarizationToggle
  enabled={diarizationEnabled}
  onToggle={setDiarizationEnabled}
  disabled={isUploading || isTranscribing}
/>
```

---

### 2. **Hook useTranscription Atualizado**

**Arquivo modificado:** [src/hooks/useTranscription.js](src/hooks/useTranscription.js)

**Mudanças:**
```javascript
// Novo estado
const [diarizationEnabled, setDiarizationEnabled] = useState(false);

// Passa diarization para o service
const result = await transcribeAudio(file, language, diarizationEnabled);

// Retorna no hook
return {
  // ... outros estados
  diarizationEnabled,
  setDiarizationEnabled
};
```

---

### 3. **TranscriptionService Atualizado**

**Arquivo modificado:** [src/services/transcriptionService.js](src/services/transcriptionService.js)

**Mudanças:**

```javascript
export const transcribeAudio = async (audioFile, language = 'pt-BR', enableDiarization = false) => {
  console.log('Diarization:', enableDiarization ? 'Ativado' : 'Desativado');

  const formData = new FormData();
  formData.append('file', audioFile);
  formData.append('language', apiLanguage);

  // Enviar parâmetro de diarization se habilitado
  if (enableDiarization) {
    formData.append('diarization', 'true');
  }

  // ... rest of code
};

// Gerar segmentos com speakers
function generateMockSegments(text, includeSpeakers = false) {
  return sentences.map((sentence, index) => {
    const segment = {
      start: currentTime,
      end: currentTime + duration,
      text: sentence.trim()
    };

    // Adicionar speaker se diarization estiver habilitado
    if (includeSpeakers) {
      segment.speaker = `Speaker ${currentSpeaker + 1}`;
    }

    return segment;
  });
}
```

---

### 4. **TimestampedTranscription Atualizado**

**Arquivo modificado:** [src/components/TimestampedTranscription.jsx](src/components/TimestampedTranscription.jsx)

**Mudanças:**

```jsx
// Detectar se há speakers
const hasSpeakers = segments.some(seg => seg.speaker);

// Cores únicas para cada speaker
const speakerColors = {
  'Speaker 1': 'from-blue-500 to-cyan-500',
  'Speaker 2': 'from-purple-500 to-pink-500',
  'Speaker 3': 'from-green-500 to-emerald-500',
  'Speaker 4': 'from-orange-500 to-red-500',
};

// Badge do Speaker
{hasSpeakers && segment.speaker && (
  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${speakerColors[segment.speaker]}`}>
    <User className="w-3 h-3" />
    {segment.speaker}
  </div>
)}
```

**Visual:**
- Cada speaker tem uma cor única (gradiente)
- Badge com ícone de usuário
- Aparece ao lado do timestamp

---

### 5. **Exports Atualizados**

**Arquivo modificado:** [src/App.jsx](src/App.jsx)

**Formato TXT com speakers:**
```
[00:15] Speaker 1: Olá, bem-vindo ao podcast.
[00:22] Speaker 2: Muito obrigado por me receber!
[00:28] Speaker 1: Vamos começar?
```

**Formato JSON com speakers:**
```json
{
  "text": "Transcrição completa...",
  "segments": [
    {
      "start": 15.0,
      "end": 22.0,
      "text": "Olá, bem-vindo ao podcast.",
      "speaker": "Speaker 1"
    },
    {
      "start": 22.0,
      "end": 28.0,
      "text": "Muito obrigado por me receber!",
      "speaker": "Speaker 2"
    }
  ],
  "language": "pt-BR",
  "wordCount": 145,
  "charCount": 892,
  "timestamp": "2025-10-23T17:00:00.000Z"
}
```

---

## ⚠️ Necessidade de Upgrade no Backend

### Estado Atual da API

A Edge Function do Supabase (`dynamic-processor`) **atualmente NÃO suporta diarization**. O frontend está preparado para enviar o parâmetro `diarization: 'true'`, mas a API precisa ser atualizada para processar isso.

### Opções de Implementação no Backend

#### **Opção 1: Whisper + Pyannote Audio (Recomendada)**

**Tecnologias:**
- **Whisper** (OpenAI) para transcrição
- **Pyannote Audio** para diarization

**Vantagens:**
- ✅ Solução open-source e bem documentada
- ✅ Alta precisão em diarization
- ✅ Grande comunidade e suporte
- ✅ Funciona bem com áudios mono

**Requisitos:**
- GPU com pelo menos 6-8GB VRAM
- Python 3.8+
- Bibliotecas: `openai-whisper`, `pyannote.audio`, `torch`

**Exemplo de implementação:**
```python
import whisper
from pyannote.audio import Pipeline

# Carregar modelos
whisper_model = whisper.load_model("medium")
diarization_pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization")

# Transcrever
transcription = whisper_model.transcribe(audio_path, language=language)

# Diarization
diarization = diarization_pipeline(audio_path)

# Combinar transcrição com speakers
segments_with_speakers = combine_transcription_diarization(
    transcription['segments'],
    diarization
)
```

**Referências:**
- [Pyannote Audio Docs](https://github.com/pyannote/pyannote-audio)
- [Whisper + Pyannote Tutorial](https://medium.com/@xriteshsharmax/speaker-diarization-using-whisper-asr-and-pyannote-f0141c85d59a)

---

#### **Opção 2: WhisperX**

**Tecnologias:**
- **WhisperX** (Whisper com timestamps precisos e diarization integrado)

**Vantagens:**
- ✅ Solução all-in-one
- ✅ Timestamps mais precisos que Whisper vanilla
- ✅ Diarization integrada via Pyannote
- ✅ Alinhamento palavra-por-palavra

**Requisitos:**
- GPU recomendada
- Python 3.8+
- `whisperx` package

**Exemplo:**
```python
import whisperx

device = "cuda"
audio_file = "audio.mp3"
batch_size = 16

# 1. Transcrever com WhisperX
model = whisperx.load_model("large-v2", device, compute_type="float16")
audio = whisperx.load_audio(audio_file)
result = model.transcribe(audio, batch_size=batch_size)

# 2. Alinhar timestamps
model_a, metadata = whisperx.load_align_model(language_code=result["language"], device=device)
result = whisperx.align(result["segments"], model_a, metadata, audio, device)

# 3. Diarization
diarize_model = whisperx.DiarizationPipeline(use_auth_token=HF_TOKEN, device=device)
diarize_segments = diarize_model(audio_file)

# 4. Combinar
result = whisperx.assign_word_speakers(diarize_segments, result)
```

**Referências:**
- [WhisperX GitHub](https://github.com/m-bain/whisperX)

---

#### **Opção 3: Áudios Estéreo (2 canais) - Mais Simples**

Para áudios estéreo onde cada canal representa um speaker (ex: entrevistas gravadas com 2 microfones):

**Vantagens:**
- ✅ **100% de acurácia** (cada canal = 1 speaker)
- ✅ Processamento mais rápido
- ✅ Não requer IA de diarization

**Implementação:**
```python
import whisper
from pydub import AudioSegment

# Separar canais
audio = AudioSegment.from_file("stereo_audio.mp3")
left_channel = audio.split_to_mono()[0]
right_channel = audio.split_to_mono()[1]

# Transcrever cada canal
model = whisper.load_model("medium")
transcript_speaker1 = model.transcribe("left_channel.wav")
transcript_speaker2 = model.transcribe("right_channel.wav")

# Combinar com timestamps
combined_segments = merge_by_timestamp(
    transcript_speaker1['segments'],
    transcript_speaker2['segments']
)
```

---

#### **Opção 4: APIs Externas**

Se não quiser hospedar os modelos:

**AssemblyAI:**
- API com diarization nativa
- Paga por minuto de áudio
- Fácil integração

**Deepgram:**
- API moderna com diarization
- Pricing competitivo
- Boa documentação

**Rev.ai:**
- Focado em transcrição profissional
- Suporte a diarization

---

## 🚀 Roadmap de Implementação

### Fase 1: Preparação (Frontend - ✅ COMPLETO)
- [x] Criar componente DiarizationToggle
- [x] Atualizar useTranscription hook
- [x] Modificar transcriptionService
- [x] Atualizar TimestampedTranscription
- [x] Ajustar exports (TXT/JSON)

### Fase 2: Backend (PENDENTE)
- [ ] Decidir abordagem (Pyannote, WhisperX, API externa)
- [ ] Configurar ambiente com GPU (se necessário)
- [ ] Instalar dependências Python
- [ ] Atualizar Edge Function para aceitar `diarization` param
- [ ] Implementar processamento de diarization
- [ ] Testar com áudios mono e estéreo
- [ ] Otimizar performance

### Fase 3: Integração e Testes
- [ ] Testar com áudios reais
- [ ] Validar precisão da diarization
- [ ] Ajustar UI baseado em feedback
- [ ] Documentar limitações

### Fase 4: Melhorias Futuras
- [ ] Permitir renomear speakers ("Speaker 1" → "João")
- [ ] Detectar número de speakers automaticamente
- [ ] Configurar número mínimo/máximo de speakers
- [ ] Estatísticas por speaker (tempo de fala, % de participação)
- [ ] Exportar apenas fala de um speaker específico

---

## 🧪 Como Testar Atualmente

### Frontend (Mock)

Enquanto o backend não está pronto, o frontend gera speakers simulados para testes:

1. Ative o toggle "Identificar quem está falando"
2. Faça upload de um áudio
3. A transcrição mostrará speakers alternados (mock)
4. Baixe TXT ou JSON para ver o formato

**Formato esperado do backend:**

```javascript
{
  "success": true,
  "text": "Transcrição completa...",
  "segments": [
    {
      "start": 0.0,
      "end": 5.2,
      "text": "Olá, como vai?",
      "speaker": "Speaker 1"  // ← Adicionar este campo
    },
    {
      "start": 5.5,
      "end": 10.8,
      "text": "Tudo bem, obrigado!",
      "speaker": "Speaker 2"  // ← Speakers diferentes
    }
  ],
  "language": "pt"
}
```

---

## 📊 Casos de Uso

### 1. **Entrevistas**
- 2+ pessoas conversando
- Identificar entrevistador vs entrevistado
- Exportar falas separadas

### 2. **Podcasts**
- Múltiplos hosts
- Convidados
- Análise de tempo de fala

### 3. **Reuniões**
- Atas de reunião
- Identificar contribuições individuais
- Compliance e documentação

### 4. **Aulas e Palestras**
- Professor vs alunos
- Sessões de Q&A
- Debates

### 5. **Atendimento ao Cliente**
- Agente vs cliente
- Análise de qualidade
- Treinamento

---

## 💡 Dicas de Implementação

### Para Áudios de Alta Qualidade
- Use Pyannote + Whisper large-v2
- Ajuste threshold de diarization
- Pós-processamento para remover ruído

### Para Performance
- Use WhisperX com GPU
- Batch processing
- Cache de modelos
- Processamento assíncrono

### Para Áudios Desafiadores
- Múltiplos speakers (>4): considere ajustar parâmetros
- Sobreposição de falas: pode causar imprecisão
- Ruído de fundo: pré-processamento com noise reduction
- Sotaques diversos: Whisper large-v2 ou v3

---

## 🔗 Recursos e Referências

### Artigos e Tutoriais
- [Speaker Diarization using Whisper ASR and Pyannote (Medium)](https://medium.com/@xriteshsharmax/speaker-diarization-using-whisper-asr-and-pyannote-f0141c85d59a)
- [Whisper and Pyannote: The Ultimate Solution](https://scalastic.io/en/whisper-pyannote-ultimate-speech-transcription/)
- [Building a Custom Audio Transcription Pipeline](https://medium.com/@rafaelgalle1/building-a-custom-scalable-audio-transcription-pipeline-whisper-pyannote-ffmpeg-d0f03f884330)

### Repositórios GitHub
- [pyannote/pyannote-audio](https://github.com/pyannote/pyannote-audio)
- [m-bain/whisperX](https://github.com/m-bain/whisperX)
- [MahmoudAshraf97/whisper-diarization](https://github.com/MahmoudAshraf97/whisper-diarization)
- [Jose-Sabater/whisper-pyannote](https://github.com/Jose-Sabater/whisper-pyannote)

### Discussões
- [Whisper Discussions #264 - Diarization](https://github.com/openai/whisper/discussions/264)
- [OpenAI Community - Best Diarization Solutions](https://community.openai.com/t/best-solution-for-whisper-diarization-speaker-labeling/505922)

---

## ✅ Checklist de Implementação Frontend

- [x] Criar DiarizationToggle component
- [x] Adicionar estado diarizationEnabled no useTranscription
- [x] Passar parâmetro enableDiarization para transcribeAudio()
- [x] Enviar `diarization: 'true'` no FormData
- [x] Gerar mock segments com speakers
- [x] Exibir badges de speakers no TimestampedTranscription
- [x] Incluir speakers nos exports TXT
- [x] Incluir speakers nos exports JSON
- [x] Integrar DiarizationToggle no App.jsx
- [x] Adicionar cores únicas por speaker
- [x] Documentar funcionalidade

---

**Status do Frontend:** ✅ Implementação completa
**Status do Backend:** ⚠️ Aguardando implementação
**Data:** 2025-10-23
**Versão:** 3.0.0
