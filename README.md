# 🎙️ Transcribe - Audio to Text

Plataforma moderna de transcrição de áudio usando IA.

## ✨ Features

- 🎵 Upload de áudio (MP3, WAV, M4A, FLAC, OGG)
- 🤖 Transcrição automática com IA (AssemblyAI)
- 📝 Editor de texto integrado
- 💾 Download em múltiplos formatos (TXT, JSON)
- 👤 Sistema de autenticação
- 📊 Histórico de transcrições
- 🎨 Design moderno e responsivo

## 🚀 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Supabase Edge Functions
- **Database:** PostgreSQL (Supabase)
- **IA:** AssemblyAI API
- **Icons:** Lucide React

## 🛠️ Como Rodar Localmente
```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev
```

## 📦 Deploy
```bash
# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🔑 Configuração

1. Configure suas credenciais do Supabase
2. Adicione sua API Key da AssemblyAI no Supabase
3. Configure as variáveis de ambiente

## 📄 Licença

MIT
```

---

## 📂 Estrutura do Projeto

O projeto foi completamente refatorado para seguir as melhores práticas de React:

```
transcribe-app/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── hooks/              # Custom React Hooks
│   ├── services/           # Serviços e APIs
│   ├── utils/              # Funções utilitárias
│   ├── config/             # Configurações
│   ├── App.jsx             # Componente raiz
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globais
├── public/
├── ARCHITECTURE.md         # Documentação detalhada
├── REFACTORING_SUMMARY.md  # Resumo da refatoração
├── PROJECT_STRUCTURE.md    # Estrutura detalhada
└── README.md               # Este arquivo
```

### 📚 Documentação Adicional

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitetura detalhada e princípios de design
- **[REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)** - Comparação antes/depois e métricas
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Estrutura completa de arquivos

### ✨ Destaques da Arquitetura

- ✅ **Modular:** Código separado em 20+ arquivos especializados
- ✅ **Testável:** Componentes e funções isoladas
- ✅ **Escalável:** Fácil adicionar novos recursos
- ✅ **Manutenível:** Responsabilidades claras
- ✅ **Reutilizável:** Componentes e hooks compartilháveis

### 🎯 Redução de Complexidade

- **Antes:** 1 arquivo com 778 linhas
- **Depois:** 21 arquivos com média de 60 linhas cada
- **Redução:** 75% no tamanho do arquivo principal