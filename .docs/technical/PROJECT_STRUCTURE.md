# Estrutura do Projeto - Transcribe App

## Estrutura de Arquivos

```
transcribe-app/
│
├── src/
│   │
│   ├── components/                   # 🎨 Componentes UI Reutilizáveis
│   │   ├── AnimatedBackground.jsx    # Background com animações
│   │   ├── AuthModal.jsx             # Modal de login/signup
│   │   ├── FileUpload.jsx            # Upload com drag & drop
│   │   ├── Footer.jsx                # Rodapé
│   │   ├── Header.jsx                # Cabeçalho com navegação
│   │   ├── HeroSection.jsx           # Hero da página inicial
│   │   ├── ProfileView.jsx           # Página de perfil
│   │   ├── ToastMessage.jsx          # Mensagens de feedback
│   │   ├── TranscriptionResult.jsx   # Resultado da transcrição
│   │   └── index.js                  # Barrel export
│   │
│   ├── hooks/                        # 🎣 Custom React Hooks
│   │   ├── useAuth.js                # Hook de autenticação
│   │   ├── useHistory.js             # Hook de histórico
│   │   ├── useToast.js               # Hook de mensagens
│   │   ├── useTranscription.js       # Hook de transcrição
│   │   └── index.js                  # Barrel export
│   │
│   ├── services/                     # 🌐 Serviços e APIs
│   │   └── transcriptionService.js   # Serviço de transcrição
│   │
│   ├── utils/                        # 🔧 Utilitários
│   │   ├── fileUtils.js              # Utils de arquivos
│   │   ├── formatters.js             # Formatação de dados
│   │   └── validators.js             # Validações
│   │
│   ├── config/                       # ⚙️ Configurações
│   │   └── constants.js              # Constantes da aplicação
│   │
│   ├── App.jsx                       # 🚀 Componente raiz
│   ├── main.jsx                      # 🎯 Entry point
│   └── index.css                     # 🎨 Estilos globais
│
├── public/                           # 📁 Arquivos públicos
├── dist/                             # 📦 Build de produção
│
├── ARCHITECTURE.md                   # 📖 Documentação da arquitetura
├── REFACTORING_SUMMARY.md            # 📊 Resumo da refatoração
├── PROJECT_STRUCTURE.md              # 📋 Este arquivo
├── README.md                         # 📘 README do projeto
│
├── package.json                      # 📦 Dependências
├── vite.config.js                    # ⚡ Config do Vite
├── tailwind.config.js                # 🎨 Config do Tailwind
├── postcss.config.js                 # 🎨 Config do PostCSS
└── eslint.config.js                  # 📏 Config do ESLint
```

## Contagem de Arquivos

| Categoria | Arquivos | Linhas (aprox) |
|-----------|----------|----------------|
| **Componentes** | 10 | 550 |
| **Hooks** | 5 | 280 |
| **Serviços** | 1 | 50 |
| **Utils** | 3 | 95 |
| **Config** | 1 | 25 |
| **App Principal** | 1 | 195 |
| **TOTAL** | **21** | **~1195** |

## Arquivos por Diretório

### 📂 components/ (10 arquivos)
```
AnimatedBackground.jsx    40 linhas    # Background animado
AuthModal.jsx            70 linhas    # Modal de autenticação
FileUpload.jsx          100 linhas    # Upload de arquivos
Footer.jsx               12 linhas    # Rodapé
Header.jsx               80 linhas    # Cabeçalho
HeroSection.jsx          20 linhas    # Hero section
ProfileView.jsx         130 linhas    # Página de perfil
ToastMessage.jsx         25 linhas    # Mensagens toast
TranscriptionResult.jsx  60 linhas    # Resultado
index.js                 10 linhas    # Exports
```

### 📂 hooks/ (5 arquivos)
```
useAuth.js              70 linhas    # Gerencia autenticação
useHistory.js           60 linhas    # Gerencia histórico
useToast.js             30 linhas    # Gerencia toasts
useTranscription.js    100 linhas    # Gerencia transcrição
index.js                 5 linhas    # Exports
```

### 📂 services/ (1 arquivo)
```
transcriptionService.js  50 linhas    # API de transcrição
```

### 📂 utils/ (3 arquivos)
```
fileUtils.js            30 linhas    # Download, clipboard, JSON
formatters.js           20 linhas    # Formatação de dados
validators.js           45 linhas    # Validações
```

### 📂 config/ (1 arquivo)
```
constants.js            25 linhas    # Todas as constantes
```

### 📂 root (1 arquivo)
```
App.jsx                195 linhas    # Orquestrador principal
```

## Redução de Complexidade

### Antes ❌
```
App.jsx: 778 linhas
├── Toda lógica de autenticação
├── Toda lógica de transcrição
├── Toda lógica de histórico
├── Todos os componentes
├── Todas as validações
├── Todos os formatadores
└── Todas as constantes
```

### Depois ✅
```
App.jsx: 195 linhas (75% menor)
├── Importa hooks
├── Importa componentes
├── Orquestra interações
└── Handlers de eventos

Lógica distribuída em 21 arquivos especializados
```

## Dependências Entre Módulos

```
App.jsx
  ├── components/
  │   ├── Header
  │   ├── AuthModal
  │   ├── FileUpload
  │   ├── TranscriptionResult
  │   ├── ProfileView
  │   ├── ToastMessage
  │   ├── AnimatedBackground
  │   ├── HeroSection
  │   └── Footer
  │
  ├── hooks/
  │   ├── useAuth
  │   ├── useTranscription
  │   ├── useHistory
  │   └── useToast
  │
  └── utils/
      ├── fileUtils
      ├── formatters
      └── validators

hooks/
  ├── useTranscription → services/transcriptionService
  ├── useHistory → config/constants
  ├── useAuth → config/constants, utils/validators
  └── useToast → config/constants

services/
  └── transcriptionService → config/constants

utils/
  ├── validators → config/constants
  └── formatters → (nenhuma dependência)
```

## Fluxo de Dados

```
1. User Action (UI)
        ↓
2. Event Handler (App.jsx)
        ↓
3. Custom Hook (hooks/)
        ↓
4. Service/Utils (services/, utils/)
        ↓
5. Update State (hooks/)
        ↓
6. Re-render Component (components/)
```

## Arquivos Principais

### 🎯 App.jsx
- **Responsabilidade:** Orquestrador principal
- **Importa:** Todos os componentes e hooks
- **Exporta:** Componente App
- **Linhas:** 195

### 🎨 components/index.js
- **Responsabilidade:** Barrel export de componentes
- **Facilita:** Imports limpos
```javascript
import { Header, Footer, FileUpload } from './components';
```

### 🎣 hooks/index.js
- **Responsabilidade:** Barrel export de hooks
- **Facilita:** Imports limpos
```javascript
import { useAuth, useTranscription } from './hooks';
```

### ⚙️ config/constants.js
- **Responsabilidade:** Centralize configurações
- **Contém:** APIs, limites, storage keys, etc.

## Padrões de Import

### Componentes
```javascript
import { Header, Footer } from './components';
```

### Hooks
```javascript
import { useAuth, useToast } from './hooks';
```

### Utils
```javascript
import { validateFile } from '../utils/validators';
import { formatDate } from '../utils/formatters';
import { downloadFile } from '../utils/fileUtils';
```

### Config
```javascript
import { API_CONFIG, FILE_CONFIG } from '../config/constants';
```

## Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Inicia dev server
npm run build        # Build de produção
npm run preview      # Preview do build
```

### Estrutura
```bash
# Ver estrutura de arquivos
find src -type f -name "*.jsx" -o -name "*.js" | sort

# Contar linhas de código
find src -name "*.jsx" -o -name "*.js" | xargs wc -l

# Ver tamanho do build
du -sh dist/
```

## Status

✅ **Build:** Sucesso
✅ **Estrutura:** Organizada
✅ **Documentação:** Completa
✅ **Padrões:** Implementados
✅ **Manutenibilidade:** Alta

---

**Última atualização:** Refatoração completa concluída
**Versão:** 2.0.0 (Modular)
