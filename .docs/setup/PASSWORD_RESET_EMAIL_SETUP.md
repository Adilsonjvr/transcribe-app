# 🔐 Setup Email de Reset de Senha

## Objetivo
Enviar email customizado quando um usuário solicita redefinir sua senha.

---

## 📋 Passo a Passo

### 1️⃣ Acessar Email Templates no Supabase

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication** → **Email Templates**
4. Selecione **Reset Password**

---

### 2️⃣ Configurar Template "Reset Password"

Cole este template em **Reset Password**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%);
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      box-shadow: 0 8px 24px rgba(168, 85, 247, 0.4);
    }
    .logo svg {
      width: 30px;
      height: 30px;
      fill: white;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 32px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px;
    }
    .alert-box {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
      border-left: 4px solid #ef4444;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 24px;
    }
    .alert-title {
      font-size: 16px;
      font-weight: 700;
      color: #dc2626;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .alert-text {
      color: #991b1b;
      font-size: 14px;
      line-height: 1.5;
    }
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 16px;
    }
    .message {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white !important;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    .info-box {
      background: #f7fafc;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
    }
    .info-item {
      display: flex;
      align-items: start;
      margin-bottom: 12px;
    }
    .info-item:last-child {
      margin-bottom: 0;
    }
    .info-icon {
      font-size: 20px;
      margin-right: 12px;
      min-width: 24px;
    }
    .info-text {
      color: #4a5568;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      padding: 32px;
      color: #a0aec0;
      font-size: 14px;
      border-top: 1px solid #e2e8f0;
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
      margin: 24px 0;
    }
    .expiry-notice {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
      border: 2px solid rgba(251, 191, 36, 0.3);
      border-radius: 8px;
      padding: 12px 16px;
      margin-top: 16px;
      text-align: center;
    }
    .expiry-text {
      color: #92400e;
      font-size: 13px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      </div>
      <h1>TRANSCRIBE</h1>
    </div>

    <div class="content">
      <div class="alert-box">
        <div class="alert-title">
          ⚠️ Solicitação de Reset de Senha
        </div>
        <div class="alert-text">
          Recebemos uma solicitação para redefinir a senha da sua conta.
        </div>
      </div>

      <div class="title">Olá!</div>

      <p class="message">
        Você está recebendo este email porque recebemos uma solicitação de redefinição de senha para sua conta <strong>{{ .Email }}</strong>.
      </p>

      <p class="message">
        Para criar uma nova senha, clique no botão abaixo:
      </p>

      <center>
        <a href="{{ .ConfirmationURL }}" class="button">
          🔐 Redefinir Minha Senha
        </a>
      </center>

      <div class="expiry-notice">
        <div class="expiry-text">
          ⏰ Este link expira em 1 hora
        </div>
      </div>

      <div class="divider"></div>

      <div class="info-box">
        <div class="info-item">
          <div class="info-icon">🛡️</div>
          <div class="info-text">
            <strong>Não solicitou esta alteração?</strong><br>
            Se você não solicitou a redefinição de senha, ignore este email. Sua senha permanecerá inalterada e sua conta está segura.
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">🔒</div>
          <div class="info-text">
            <strong>Dicas de Segurança:</strong><br>
            • Use uma senha forte com letras, números e símbolos<br>
            • Não compartilhe sua senha com ninguém<br>
            • Nunca use a mesma senha em múltiplos sites
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">💡</div>
          <div class="info-text">
            <strong>Link não funciona?</strong><br>
            Copie e cole este URL no seu navegador:<br>
            <span style="word-break: break-all; color: #667eea;">{{ .ConfirmationURL }}</span>
          </div>
        </div>
      </div>

      <p class="message" style="margin-top: 24px; font-size: 14px; color: #718096;">
        Se você está tendo problemas para redefinir sua senha, entre em contato conosco respondendo este email.
      </p>
    </div>

    <div class="footer">
      <p>
        Este email foi enviado porque você solicitou redefinir sua senha em<br>
        <strong>Transcribe - Transcrição com IA</strong>
      </p>
      <p style="margin-top: 16px; color: #cbd5e0;">
        Precisa de ajuda? Responda este email!
      </p>
    </div>
  </div>
</body>
</html>
```

---

## 🎨 Versão em Inglês (English Version)

Para criar uma versão em inglês, você pode criar um template alternativo. Basta duplicar o template acima e substituir os textos:

**Principais traduções:**
- `Solicitação de Reset de Senha` → `Password Reset Request`
- `Recebemos uma solicitação...` → `We received a request to reset your password`
- `Redefinir Minha Senha` → `Reset My Password`
- `Este link expira em 1 hora` → `This link expires in 1 hour`
- `Não solicitou esta alteração?` → `Didn't request this change?`
- `Dicas de Segurança` → `Security Tips`

---

## 🔧 Configuração no Supabase

### Opção 1: Template Único (Português)
1. Cole o template HTML acima em **Authentication** → **Email Templates** → **Reset Password**
2. Clique em **Save**
3. Teste enviando um reset de senha

### Opção 2: Detecção de Idioma (Avançado)
Para detectar o idioma do usuário, você pode usar metadata:

```html
<!-- No início do template -->
{{ if eq .UserMetaData.language "en" }}
  <!-- Versão em Inglês -->
{{ else }}
  <!-- Versão em Português -->
{{ end }}
```

---

## 📊 Variáveis Disponíveis

O Supabase fornece estas variáveis para o template:

- `{{ .Email }}` - Email do usuário
- `{{ .ConfirmationURL }}` - Link para redefinir senha
- `{{ .Token }}` - Token de reset
- `{{ .TokenHash }}` - Hash do token
- `{{ .SiteURL }}` - URL do site configurado
- `{{ .UserMetaData }}` - Metadados do usuário (se houver)

---

## ✅ Teste o Email

1. Na sua aplicação, clique em "Esqueci minha senha"
2. Digite seu email
3. Verifique a caixa de entrada (e spam)
4. Clique no botão "Redefinir Minha Senha"
5. Defina nova senha

**Verificar se funcionou:**
- Email chega em menos de 1 minuto
- Design está correto e responsivo
- Link redireciona para página de reset
- Nova senha funciona para login

---

## 🚨 Troubleshooting

### Email não chega:
1. Verificar pasta de spam/lixo eletrônico
2. Checar logs em **Authentication** → **Logs**
3. Verificar se SMTP está configurado (se usando customizado)
4. Confirmar que o email está cadastrado no sistema

### Link não funciona:
1. Verificar **Redirect URLs** em **Authentication** → **URL Configuration**
2. Adicionar URLs permitidas:
   ```
   https://seu-dominio.com/**
   http://localhost:5173/**
   ```
3. Verificar se link não expirou (válido por 1 hora)

### Link expira muito rápido:
1. Não é possível alterar tempo de expiração via dashboard
2. Padrão do Supabase: 1 hora
3. Para alterar, é necessário configuração via código no backend

---

## 🎯 Próximos Passos

Depois do email de reset de senha, considere customizar:

1. **Email de Mudança de Email** (Change Email)
2. **Email de Convite** (Invite User) - se usar sistema de convites
3. **Email de Confirmação de Email Alterado** (Email Change Confirmation)
4. **Email de Notificação** (quando transcrição completar)

---

## 🔐 Segurança

**Boas práticas implementadas no template:**

✅ Link expira em 1 hora
✅ Aviso se não foi o usuário que solicitou
✅ Dicas de senha forte
✅ Link alternativo em texto (se botão não funcionar)
✅ Instruções claras de contato para suporte

**Recomendações adicionais:**

- Configure rate limiting para evitar spam de solicitações
- Monitore tentativas de reset suspeitas
- Use CAPTCHA no formulário de reset (se muito spam)
- Log todas as solicitações de reset para auditoria

---

**Pronto!** Agora seus usuários receberão um email profissional e seguro ao solicitar reset de senha! 🔐
