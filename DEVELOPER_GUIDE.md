# 👨‍💻 Guia do Desenvolvedor - Transcribe App

## 🚀 Quick Start

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
# Acesse: http://localhost:5173
```

### Build
```bash
npm run build
npm run preview
```

---

## 📖 Guia de Contribuição

### 1. Adicionar um Novo Componente

**Passo a passo:**

```bash
# 1. Criar o arquivo do componente
src/components/NovoComponente.jsx
```

```javascript
// 2. Implementar o componente
import React from 'react';

export const NovoComponente = ({ prop1, prop2, onAction }) => {
  return (
    <div>
      <h2>{prop1}</h2>
      <button onClick={onAction}>{prop2}</button>
    </div>
  );
};
```

```javascript
// 3. Adicionar export em src/components/index.js
export { NovoComponente } from './NovoComponente';
```

```javascript
// 4. Usar no App.jsx
import { NovoComponente } from './components';

// No JSX:
<NovoComponente
  prop1="Título"
  prop2="Clique aqui"
  onAction={handleAction}
/>
```

---

### 2. Criar um Custom Hook

**Passo a passo:**

```bash
# 1. Criar o arquivo do hook
src/hooks/useNovoHook.js
```

```javascript
// 2. Implementar o hook
import { useState, useEffect } from 'react';

export const useNovoHook = (parametroInicial) => {
  const [data, setData] = useState(parametroInicial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Lógica aqui
      setData(resultado);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
```

```javascript
// 3. Adicionar export em src/hooks/index.js
export { useNovoHook } from './useNovoHook';
```

```javascript
// 4. Usar no componente
import { useNovoHook } from './hooks';

const MeuComponente = () => {
  const { data, loading, error } = useNovoHook('valor inicial');

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return <div>{data}</div>;
};
```

---

### 3. Adicionar uma Função Utilitária

**Passo a passo:**

```javascript
// 1. Adicionar em src/utils/validators.js (ou outro arquivo apropriado)
export const validarCPF = (cpf) => {
  // Lógica de validação
  const cpfLimpo = cpf.replace(/\D/g, '');

  if (cpfLimpo.length !== 11) {
    return { isValid: false, error: 'CPF deve ter 11 dígitos' };
  }

  // Resto da validação...

  return { isValid: true };
};
```

```javascript
// 2. Usar onde precisar
import { validarCPF } from '../utils/validators';

const handleValidation = (cpf) => {
  const result = validarCPF(cpf);
  if (!result.isValid) {
    toast.showError(result.error);
  }
};
```

---

### 4. Adicionar Nova Configuração/Constante

```javascript
// 1. Adicionar em src/config/constants.js
export const NOVA_FEATURE_CONFIG = {
  ENABLE: true,
  MAX_ITEMS: 50,
  API_ENDPOINT: 'https://api.exemplo.com'
};
```

```javascript
// 2. Usar onde precisar
import { NOVA_FEATURE_CONFIG } from '../config/constants';

const Component = () => {
  if (NOVA_FEATURE_CONFIG.ENABLE) {
    // Lógica da feature
  }
};
```

---

### 5. Criar um Novo Serviço

**Exemplo: Serviço de Email**

```javascript
// 1. Criar src/services/emailService.js
export const sendEmail = async (to, subject, body) => {
  const response = await fetch('https://api.email.com/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({ to, subject, body })
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar email');
  }

  return await response.json();
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

```javascript
// 2. Usar no hook ou componente
import { sendEmail } from '../services/emailService';

const handleSendEmail = async () => {
  try {
    await sendEmail('user@example.com', 'Assunto', 'Corpo');
    toast.showSuccess('Email enviado!');
  } catch (error) {
    toast.showError('Erro ao enviar email');
  }
};
```

---

## 🎨 Padrões de Código

### Nomenclatura

**Componentes:**
```javascript
// PascalCase para componentes
export const MeuComponente = () => {};
export const CardUsuario = () => {};
```

**Hooks:**
```javascript
// use + PascalCase
export const useAuth = () => {};
export const useNovoRecurso = () => {};
```

**Funções:**
```javascript
// camelCase
export const validarEmail = () => {};
export const formatarData = () => {};
```

**Constantes:**
```javascript
// UPPER_SNAKE_CASE
export const API_BASE_URL = 'https://api.com';
export const MAX_FILE_SIZE = 1024;
```

**Arquivos:**
```javascript
// Componentes: PascalCase.jsx
Header.jsx
AuthModal.jsx

// Hooks/Utils: camelCase.js
useAuth.js
validators.js

// Configurações: camelCase.js
constants.js
```

---

### Estrutura de Componente

```javascript
import React, { useState, useEffect } from 'react';
import { Icon } from 'lucide-react';
import { useCustomHook } from '../hooks';
import { helperFunction } from '../utils/helpers';

/**
 * Descrição do componente
 * @param {string} prop1 - Descrição da prop1
 * @param {function} onAction - Callback para ação
 */
export const MeuComponente = ({ prop1, prop2, onAction }) => {
  // 1. Hooks
  const { data } = useCustomHook();
  const [state, setState] = useState(null);

  // 2. Effects
  useEffect(() => {
    // Lógica
  }, []);

  // 3. Handlers
  const handleClick = () => {
    onAction(state);
  };

  // 4. Render helpers (se necessário)
  const renderContent = () => {
    return <div>Conteúdo</div>;
  };

  // 5. JSX
  return (
    <div className="container">
      <h1>{prop1}</h1>
      {renderContent()}
      <button onClick={handleClick}>{prop2}</button>
    </div>
  );
};
```

---

### Estrutura de Hook

```javascript
import { useState, useEffect } from 'react';
import { service } from '../services/myService';

/**
 * Descrição do hook
 * @param {any} param - Parâmetro inicial
 * @returns {object} Estado e funções
 */
export const useCustomHook = (param) => {
  // 1. Estados
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Efeitos
  useEffect(() => {
    fetchData();
  }, [param]);

  // 3. Funções
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await service.getData(param);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Return
  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};
```

---

## 🧪 Testes (TODO)

### Testar Componente
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { MeuComponente } from './MeuComponente';

describe('MeuComponente', () => {
  it('deve renderizar corretamente', () => {
    render(<MeuComponente prop1="Teste" />);
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('deve chamar onAction ao clicar', () => {
    const handleAction = jest.fn();
    render(<MeuComponente onAction={handleAction} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleAction).toHaveBeenCalled();
  });
});
```

### Testar Hook
```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('deve retornar dados iniciais', () => {
    const { result } = renderHook(() => useCustomHook('valor'));
    expect(result.current.data).toBe('valor');
  });
});
```

### Testar Util
```javascript
import { validarEmail } from './validators';

describe('validarEmail', () => {
  it('deve validar email correto', () => {
    expect(validarEmail('test@example.com')).toBe(true);
  });

  it('deve rejeitar email inválido', () => {
    expect(validarEmail('invalid')).toBe(false);
  });
});
```

---

## 🐛 Debugging

### React DevTools
1. Instalar React DevTools no navegador
2. Inspecionar componentes e props
3. Ver hierarquia de componentes

### Console Logs
```javascript
// Desenvolvimento
console.log('Debug:', data);

// Produção (remover antes do commit)
// Use debugger; para breakpoints
```

### Erros Comuns

**1. Import errado**
```javascript
// ❌ Errado
import { Component } from './Component.jsx';

// ✅ Correto
import { Component } from './Component';
```

**2. Hook fora do componente**
```javascript
// ❌ Errado
const data = useState(null); // fora do componente

// ✅ Correto
const Component = () => {
  const [data, setData] = useState(null);
};
```

**3. Props não destructuradas**
```javascript
// ❌ Evitar
const Component = (props) => {
  return <div>{props.title}</div>;
};

// ✅ Melhor
const Component = ({ title }) => {
  return <div>{title}</div>;
};
```

---

## 📋 Checklist antes do Commit

- [ ] Código formatado (Prettier)
- [ ] Sem console.logs desnecessários
- [ ] Imports organizados
- [ ] Componentes testados visualmente
- [ ] Sem warnings no console
- [ ] Build funcionando (`npm run build`)
- [ ] Documentação atualizada (se necessário)

---

## 🔗 Recursos Úteis

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hooks](https://react.dev/reference/react)

---

## 💡 Dicas

1. **Mantenha componentes pequenos** (< 200 linhas)
2. **Um hook por responsabilidade**
3. **Use TypeScript** para maior segurança (próximo passo)
4. **Documente funções complexas**
5. **Evite prop drilling** - use Context quando necessário
6. **Otimize com React.memo** apenas quando necessário
7. **Prefira composição** sobre prop drilling

---

## 🤝 Convenções da Equipe

- **Commits:** Use Conventional Commits (feat:, fix:, docs:, etc.)
- **Branches:** feature/nome-da-feature, fix/nome-do-bug
- **PRs:** Descreva o que foi feito e por quê
- **Code Review:** Sempre revisar antes de merge

---

**Última atualização:** 2024
**Versão da Arquitetura:** 2.0.0
