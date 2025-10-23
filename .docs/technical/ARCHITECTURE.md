# Arquitetura do Projeto - Transcribe App

## Estrutura de Pastas

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── AnimatedBackground.jsx
│   ├── AuthModal.jsx
│   ├── FileUpload.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── ProfileView.jsx
│   ├── ToastMessage.jsx
│   ├── TranscriptionResult.jsx
│   └── index.js        # Barrel export
│
├── hooks/              # Custom React Hooks
│   ├── useAuth.js      # Gerenciamento de autenticação
│   ├── useHistory.js   # Gerenciamento de histórico
│   ├── useToast.js     # Gerenciamento de mensagens toast
│   ├── useTranscription.js  # Gerenciamento de transcrição
│   └── index.js        # Barrel export
│
├── services/           # Serviços e integrações externas
│   └── transcriptionService.js  # Integração com API de transcrição
│
├── utils/              # Funções utilitárias
│   ├── fileUtils.js    # Utilitários para manipulação de arquivos
│   ├── formatters.js   # Funções de formatação
│   └── validators.js   # Funções de validação
│
├── config/             # Configurações da aplicação
│   └── constants.js    # Constantes e configurações
│
└── App.jsx            # Componente principal (orquestrador)
```

## Princípios de Design

### 1. Separação de Responsabilidades

#### **Components**
- Componentes focados apenas em apresentação
- Recebem dados via props
- Não contêm lógica de negócio complexa
- Reutilizáveis e testáveis

#### **Hooks**
- Encapsulam lógica de estado e efeitos colaterais
- Fornecem interface clara para componentes
- Facilitam reuso de lógica
- Exemplos:
  - `useAuth`: Gerencia autenticação, login/logout
  - `useTranscription`: Gerencia upload e transcrição
  - `useHistory`: Gerencia histórico de transcrições
  - `useToast`: Gerencia mensagens de feedback

#### **Services**
- Encapsulam chamadas a APIs externas
- Contêm lógica de integração com serviços
- Isolam detalhes de implementação de rede
- Facilitam mocking em testes

#### **Utils**
- Funções puras e reutilizáveis
- Sem estado ou efeitos colaterais
- Facilitam testes unitários
- Categorias:
  - Formatação (datas, números, texto)
  - Validação (arquivos, formulários)
  - Manipulação de arquivos

#### **Config**
- Centralize todas as configurações
- Constantes da aplicação
- Facilita manutenção e alterações

### 2. Single Responsibility Principle

Cada módulo tem uma única responsabilidade bem definida:

- `Header.jsx`: Apenas renderiza o cabeçalho
- `useAuth.js`: Apenas gerencia autenticação
- `validators.js`: Apenas valida dados
- `transcriptionService.js`: Apenas comunica com API de transcrição

### 3. DRY (Don't Repeat Yourself)

- Lógica comum extraída para hooks e utils
- Componentes reutilizáveis
- Constantes centralizadas em `config/`

### 4. Composição sobre Herança

- Componentes compostos de componentes menores
- Hooks compostos de outros hooks quando necessário
- Props para customização e flexibilidade

## Fluxo de Dados

```
User Interaction
      ↓
   App.jsx (Handlers)
      ↓
Custom Hooks (State Management)
      ↓
Services (API Calls)
      ↓
Components (UI Updates)
```

## Vantagens da Nova Estrutura

### 1. **Manutenibilidade**
- Código organizado e fácil de localizar
- Alterações isoladas em módulos específicos
- Menos acoplamento entre partes do código

### 2. **Testabilidade**
- Funções puras fáceis de testar
- Hooks podem ser testados isoladamente
- Componentes testáveis via props

### 3. **Escalabilidade**
- Fácil adicionar novos componentes
- Estrutura clara para novos recursos
- Reutilização de código maximizada

### 4. **Legibilidade**
- Código mais limpo e focado
- Responsabilidades claras
- Menos linhas por arquivo

### 5. **Colaboração**
- Estrutura familiar para desenvolvedores React
- Padrões consistentes
- Fácil onboarding de novos desenvolvedores

## Exemplos de Uso

### Adicionar um novo componente

1. Criar arquivo em `src/components/NovoComponente.jsx`
2. Implementar componente
3. Exportar em `src/components/index.js`
4. Importar no App.jsx: `import { NovoComponente } from './components'`

### Adicionar um novo hook

1. Criar arquivo em `src/hooks/useNovoHook.js`
2. Implementar hook
3. Exportar em `src/hooks/index.js`
4. Usar no componente: `const { data } = useNovoHook()`

### Adicionar nova constante

1. Adicionar em `src/config/constants.js`
2. Importar onde necessário: `import { NOVA_CONSTANTE } from '../config/constants'`

## Boas Práticas

1. **Mantenha componentes pequenos** (< 200 linhas)
2. **Um hook por responsabilidade**
3. **Funções puras em utils**
4. **Props com nomes descritivos**
5. **Documente funções complexas**
6. **Use TypeScript para type safety** (próximo passo)
7. **Escreva testes** para hooks e utils
8. **Evite prop drilling** - considere Context API para estado global

## Próximos Passos

1. ✅ Refatoração completa da estrutura
2. ⏭️ Adicionar PropTypes ou migrar para TypeScript
3. ⏭️ Implementar testes unitários
4. ⏭️ Adicionar Context API para estado global (se necessário)
5. ⏭️ Implementar React Router para rotas
6. ⏭️ Otimizar performance com React.memo e useMemo
