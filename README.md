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
- 💾 **Exports** - TXT e JSON com timestamps e speakers

### 👤 Autenticação e Usuários
- 🔐 **Autenticação real** - Supabase Auth (Email/Password)
- 👥 **Perfis de usuário** - Dados persistentes
- 📊 **Histórico** - Todas as transcrições salvas
- 🔄 **Sessões** - Login automático em múltiplos dispositivos

### 🎨 UX/UI
- 🌓 **Dark Mode** - Tema escuro/claro com preferência do sistema
- 📱 **Responsivo** - Design adaptativo mobile-first
- 🎨 **Design moderno** - Gradientes, glassmorphism, animações
- ♿ **Acessível** - ARIA labels, navegação por teclado
- 🎯 **Loading states** - Feedback visual em todas as ações

---

## 🚀 Tech Stack

| Categoria | Tecnologia |
|-----------|------------|
| **Frontend** | React 18.3 + Vite 7.1 |
| **Styling** | Tailwind CSS 3.4 |
| **Backend** | Supabase (Edge Functions + PostgreSQL) |
| **AI/ML** | AssemblyAI API (Transcrição + Diarization) |
| **Auth** | Supabase Auth |
| **Icons** | Lucide React |
| **Hosting** | Vercel (recomendado) |

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

2. **AssemblyAI:**
   - Crie conta em https://www.assemblyai.com
   - Copie API Key do dashboard
   - Adicione como Secret no Supabase Edge Functions
   - Ver: [Guia de Configuração](./.docs/development/ASSEMBLYAI_API_KEY_SETUP.md)

3. **Edge Function:**
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

### 🏗️ Arquitetura
- [Visão Geral](./.docs/technical/ARCHITECTURE.md)
- [Estrutura do Projeto](./.docs/technical/PROJECT_STRUCTURE.md)
- [Refatoração](./.docs/technical/REFACTORING_SUMMARY.md)

### 💻 Desenvolvimento
- [Guia do Desenvolvedor](./.docs/development/DEVELOPER_GUIDE.md)
- [Debugging](./.docs/development/DEBUG_INSTRUCTIONS.md)
- [API Key Setup](./.docs/development/ASSEMBLYAI_API_KEY_SETUP.md)

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

- **Componentes:** 15+ componentes reutilizáveis
- **Hooks:** 6 custom hooks
- **Serviços:** 3 serviços especializados
- **Redução de complexidade:** 75% comparado à versão inicial
- **Tamanho médio por arquivo:** ~60 linhas
- **Cobertura de funcionalidades:** 95%

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
