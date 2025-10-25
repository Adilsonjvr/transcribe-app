# 🎙️ Transcribe App - Audio to Text with AI

<div align="center">

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Edge_Functions-green?logo=supabase)
![AssemblyAI](https://img.shields.io/badge/AssemblyAI-Powered-orange)

Plataforma moderna e profissional de transcrição de áudio com **Speaker Diarization** (identificação de quem está falando)

[Demo](#) · [Documentação](./.docs/INDEX.md) · [Deploy](#deploy)

</div>

---

## ✨ Funcionalidades

### 🎯 Core Features
- 🎵 **Upload de áudio** - MP3, WAV, M4A, FLAC, OGG (até 25MB)
- 🤖 **Transcrição com IA** - Powered by AssemblyAI
- 🎙️ **Speaker Diarization** - Identifica automaticamente quem está falando
- 🌍 **Múltiplos idiomas** - PT, EN, ES, FR, DE, IT + auto-detecção
- ⏱️ **Timestamps precisos** - Navegação sincronizada com player de áudio
- 📝 **Editor integrado** - Edite a transcrição em tempo real
- 💾 **Exports Avançados** - TXT, JSON, PDF e DOCX com timestamps e speakers
- 💿 **Persistência permanente** - Banco de dados Supabase com backup automático
- 🔄 **Migração automática** - Dados do localStorage migrados para a nuvem

### 👤 Autenticação e Usuários
- 🔐 **Autenticação completa** - Supabase Auth (Email/Password + OAuth Google)
- 👥 **Perfis expandidos** - Nome completo, empresa, cargo, telefone, avatar
- 📊 **Histórico persistente** - Todas as transcrições salvas no Supabase
- 🔄 **Multi-device sync** - Acesse suas transcrições de qualquer dispositivo
- 🎯 **Onboarding guiado** - Experiência inicial para novos usuários

### 🎨 UX/UI
- 🌓 **Dark Mode** - Tema escuro/claro com preferência do sistema
- 📱 **Responsivo** - Design adaptativo mobile-first otimizado
- 🎨 **Design moderno** - Gradientes animados, glassmorphism, micro-interações
- ✨ **Animações fluidas** - Float, pulse, slide, bounce, scale effects
- 🎭 **Logo profissional** - Componente animado com gradiente e sparkle
- ♿ **Acessível** - ARIA labels, navegação por teclado
- 🎯 **Loading states** - Feedback visual em todas as ações
- 🌐 **100% Português** - Interface completa traduzida incluindo landing page

---

## 🆕 Atualizações Recentes

### v2.0 - Major Update (Outubro 2024)

#### 🎨 UX/UI Completo
- Interface 100% traduzida para Português (incluindo Landing Page)
- Logo profissional animado com gradientes e sparkles
- 10+ animações CSS customizadas (float, pulse, slide, bounce, wiggle)
- Glassmorphism e efeitos modernos em todos os componentes
- Hover effects e micro-interações

#### 💾 Persistência de Dados
- Migração de localStorage para PostgreSQL (Supabase)
- Tabela `transcriptions` com 16 campos
- Migração automática de dados antigos
- Backup automático e sincronização multi-device
- Row Level Security (RLS) habilitado

#### 👤 Perfis Expandidos
- Campos adicionais: nome completo, empresa, cargo, telefone
- Upload de avatar com Supabase Storage
- Sistema de preferências do usuário
- Onboarding tracking

#### 🔐 OAuth Google
- Login social com Google implementado
- Fluxo de autenticação simplificado
- Perfil automático a partir dos dados do Google

#### 📄 Exports Avançados
- PDF com formatação profissional (jsPDF)
- DOCX com estilos e parágrafos (docx)
- JSON e TXT já existentes
- Suporte a timestamps e speakers em todos os formatos

#### 🔧 Melhorias Técnicas
- React Router 6.28 implementado
- Navegação corrigida (home acessível quando logado)
- Componentes refatorados e otimizados
- Performance melhorada

---

## 🚀 Tech Stack

| Categoria | Tecnologia |
|-----------|------------|
| **Frontend** | React 18.3 + Vite 7.1 + React Router 6.28 |
| **Styling** | Tailwind CSS 3.4 + Custom CSS Animations |
| **Backend** | Supabase (Edge Functions + PostgreSQL) |
| **Database** | PostgreSQL com RLS (Row Level Security) |
| **Storage** | Supabase Storage (avatars e áudios) |
| **AI/ML** | AssemblyAI API (Transcrição + Diarization) |
| **Auth** | Supabase Auth (Email/Password + OAuth Google) |
| **Export** | jsPDF (PDF) + docx (DOCX) |
| **Icons** | Lucide React |
| **Hosting** | Vercel (Frontend) + Supabase (Backend) |

---

## 🎬 Quick Start

### Pré-requisitos
- Node.js 18+ e npm
- Conta no [Supabase](https://supabase.com)
- API Key da [AssemblyAI](https://www.assemblyai.com) (100min grátis/mês)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/transcribe-app.git
cd transcribe-app

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Inicie o servidor de desenvolvimento
npm run dev
```

### Configuração

1. **Supabase:**
   - Crie um projeto em https://supabase.com
   - Copie URL e Anon Key
   - Configure no `.env`

2. **Database:**
   - Execute os SQL scripts em ordem:
     - `user_profiles_fixed.sql` (perfis de usuário)
     - `FIX_TRANSCRIPTIONS.sql` (tabela de transcrições)
     - `storage_policies.sql` (políticas de storage)
   - Ver: [Database Setup](./.docs/database/README.md)

3. **OAuth Google (Opcional):**
   - Configure OAuth no Google Cloud Console
   - Adicione credenciais no Supabase Auth
   - Ver: [OAuth Setup](./.docs/development/OAUTH_SETUP.md)

4. **AssemblyAI:**
   - Crie conta em https://www.assemblyai.com
   - Copie API Key do dashboard
   - Adicione como Secret no Supabase Edge Functions
   - Ver: [Guia de Configuração](./.docs/development/ASSEMBLYAI_API_KEY_SETUP.md)

5. **Edge Function:**
   - Deploy da função `dynamic-processor`
   - Ver: [Guia de Deploy](./.docs/deployment/EDGE_FUNCTION_GUIDE.md)

---

## 📦 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/transcribe-app)

```bash
# Via CLI
npm install -g vercel
vercel
```

### Variáveis de Ambiente Necessárias

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

**Importante:** A API Key da AssemblyAI deve estar configurada no **Supabase Edge Functions**, não no Vercel!

---

## 📚 Documentação

### 📖 Guias Principais
- **[Documentação Completa](./.docs/INDEX.md)** - Índice de toda documentação
- **[Speaker Diarization](./SPEAKER_DIARIZATION.md)** - Guia completo da funcionalidade
- **[Próximos Passos](./PROXIMOS_PASSOS.md)** - Roadmap de funcionalidades

### 💾 Database
- **[Database Setup](./.docs/database/README.md)** - Configuração completa do banco
- [Transcriptions Setup](./.docs/database/TRANSCRIPTIONS_SETUP.md) - Guia detalhado
- [Setup Guide](./.docs/database/SETUP_GUIDE.md) - Guia geral

### 🏗️ Arquitetura
- [Visão Geral](./.docs/technical/ARCHITECTURE.md)
- [Estrutura do Projeto](./.docs/technical/PROJECT_STRUCTURE.md)
- [Refatoração](./.docs/technical/REFACTORING_SUMMARY.md)

### 💻 Desenvolvimento
- [Guia do Desenvolvedor](./.docs/development/DEVELOPER_GUIDE.md)
- [Debugging](./.docs/development/DEBUG_INSTRUCTIONS.md)
- [API Key Setup](./.docs/development/ASSEMBLYAI_API_KEY_SETUP.md)
- [OAuth Setup](./.docs/development/OAUTH_SETUP.md)

### 🚀 Deploy
- [Edge Functions](./.docs/deployment/EDGE_FUNCTION_GUIDE.md)
- [Correções CORS](./.docs/deployment/EDGE_FUNCTION_FIX.md)
- [Autenticação](./.docs/deployment/AUTH_IMPROVEMENTS.md)

---

## 🎯 Casos de Uso

### 🎙️ Entrevistas
- Identifica entrevistador vs entrevistado
- Exporta falas separadas por speaker
- Timestamps para navegação rápida

### 🎧 Podcasts
- Múltiplos hosts e convidados
- Análise de tempo de fala por pessoa
- Busca por segmentos específicos

### 💼 Reuniões
- Atas automáticas com quem disse o quê
- Compliance e documentação
- Busca por tópicos discutidos

### 📞 Atendimento ao Cliente
- Separação agente vs cliente
- Análise de qualidade
- Treinamento de equipes

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Iniciar servidor dev (http://localhost:5173)

# Build
npm run build        # Build de produção
npm run preview      # Preview da build

# Qualidade
npm run lint         # ESLint
```

---

## 📊 Estatísticas do Projeto

- **Componentes:** 20+ componentes reutilizáveis (incluindo Logo, modais, cards)
- **Hooks:** 8 custom hooks (useAuth, useProfile, useHistory, useTranscription, etc)
- **Serviços:** 5 serviços especializados (API, Storage, Auth, Profile, Transcription)
- **Animações CSS:** 10+ animações customizadas (float, pulse, slide, bounce, scale)
- **Exports:** 4 formatos (TXT, JSON, PDF, DOCX)
- **Idiomas suportados:** 6+ (PT-BR, EN, ES, FR, DE, IT)
- **Database:** PostgreSQL com RLS + auto-migration
- **Redução de complexidade:** 75% comparado à versão inicial
- **Tamanho médio por arquivo:** ~80 linhas
- **Cobertura de funcionalidades:** 98%
- **Interface:** 100% em Português

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Ver arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

- [AssemblyAI](https://www.assemblyai.com) - API de transcrição e diarization
- [Supabase](https://supabase.com) - Backend as a Service
- [React](https://react.dev) - Framework frontend
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Lucide](https://lucide.dev) - Biblioteca de ícones

---

## 📞 Suporte

- 📖 [Documentação Completa](./.docs/INDEX.md)
- 🐛 [Reportar Bug](https://github.com/seu-usuario/transcribe-app/issues)
- 💡 [Solicitar Feature](https://github.com/seu-usuario/transcribe-app/issues)

---

<div align="center">

**Desenvolvido com ❤️ usando React, Supabase e AssemblyAI**

⭐ Deixe uma estrela se este projeto foi útil!

</div>
