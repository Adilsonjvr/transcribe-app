# 📧 Setup Email de Boas-Vindas

## Objetivo
Enviar email automático quando um novo usuário se cadastra na plataforma.

---

## 📋 Passo a Passo

### 1️⃣ Habilitar Email Templates no Supabase

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication** → **Email Templates**

---

### 2️⃣ Configurar Template "Confirm Signup"

Cole este template em **Confirm signup**:

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
    .welcome {
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
    .features {
      background: #f7fafc;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
    }
    .feature {
      display: flex;
      align-items: start;
      margin-bottom: 16px;
    }
    .feature:last-child {
      margin-bottom: 0;
    }
    .feature-icon {
      font-size: 24px;
      margin-right: 12px;
    }
    .feature-text {
      flex: 1;
    }
    .feature-title {
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 4px;
    }
    .feature-desc {
      color: #718096;
      font-size: 14px;
    }
    .footer {
      text-align: center;
      padding: 32px;
      color: #a0aec0;
      font-size: 14px;
      border-top: 1px solid #e2e8f0;
    }
    .stats {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin: 24px 0;
    }
    .stat {
      flex: 1;
      text-align: center;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border: 2px solid rgba(102, 126, 234, 0.2);
      border-radius: 12px;
      padding: 20px 16px;
    }
    .stat-value {
      font-size: 32px;
      font-weight: 900;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }
    .stat-label {
      color: #4a5568;
      font-size: 13px;
      font-weight: 600;
      margin-top: 4px;
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
      <div class="welcome">Bem-vindo ao Transcribe! 🎉</div>

      <p class="message">
        Olá <strong>{{ .Email }}</strong>,
      </p>

      <p class="message">
        Estamos muito felizes em ter você conosco! Você acabou de se juntar a milhares de usuários que estão transformando áudio em texto com inteligência artificial.
      </p>

      <div class="stats">
        <div class="stat">
          <div class="stat-value">95%</div>
          <div class="stat-label">Precisão</div>
        </div>
        <div class="stat">
          <div class="stat-value">&lt;5s</div>
          <div class="stat-label">Processamento</div>
        </div>
        <div class="stat">
          <div class="stat-value">6+</div>
          <div class="stat-label">Idiomas</div>
        </div>
      </div>

      <p class="message">
        Para começar, confirme seu email clicando no botão abaixo:
      </p>

      <center>
        <a href="{{ .ConfirmationURL }}" class="button">
          ✨ Confirmar Email e Começar
        </a>
      </center>

      <div class="features">
        <div class="feature">
          <div class="feature-icon">🎤</div>
          <div class="feature-text">
            <div class="feature-title">Identificação de Palestrantes</div>
            <div class="feature-desc">Saiba quem está falando em cada momento</div>
          </div>
        </div>

        <div class="feature">
          <div class="feature-icon">⏱️</div>
          <div class="feature-text">
            <div class="feature-title">Timestamps Precisos</div>
            <div class="feature-desc">Navegue facilmente pelo áudio transcrito</div>
          </div>
        </div>

        <div class="feature">
          <div class="feature-icon">📄</div>
          <div class="feature-text">
            <div class="feature-title">Múltiplos Formatos</div>
            <div class="feature-desc">Exporte em TXT, JSON, PDF ou DOCX</div>
          </div>
        </div>

        <div class="feature">
          <div class="feature-icon">🎁</div>
          <div class="feature-text">
            <div class="feature-title">60 Minutos Grátis</div>
            <div class="feature-desc">No primeiro mês, sem cartão de crédito</div>
          </div>
        </div>
      </div>

      <p class="message">
        <strong>Dica:</strong> Comece fazendo upload de um áudio curto (1-2 minutos) para testar a qualidade da transcrição!
      </p>
    </div>

    <div class="footer">
      <p>
        Este email foi enviado porque você criou uma conta em<br>
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

### 3️⃣ Configurar SMTP (Opcional - Para Email Customizado)

**Opção 1: Usar Email Padrão do Supabase** (Mais fácil)
- ✅ Já funciona automaticamente
- ⚠️ Emails vêm de `noreply@mail.app.supabase.io`

**Opção 2: Configurar seu próprio SMTP** (Recomendado para produção)

1. Vá em **Settings** → **Auth** → **SMTP Settings**
2. Configure com:
   - **Gmail:** smtp.gmail.com (porta 587)
   - **SendGrid:** smtp.sendgrid.net (porta 587)
   - **Mailgun:** smtp.mailgun.org (porta 587)

**Exemplo com Gmail:**
```
Host: smtp.gmail.com
Port: 587
User: seu-email@gmail.com
Password: [App Password - não a senha normal]
Sender name: Transcribe
Sender email: noreply@seudominio.com
```

---

### 4️⃣ Testar o Email

1. Crie uma nova conta no seu app
2. Verifique o email
3. Clique no botão de confirmação

**Verificar se funcionou:**
- Email deve chegar em 1-2 minutos
- Link deve redirecionar para `/` com confirmação
- Usuário deve poder fazer login

---

### 5️⃣ Customizar Redirect URL (Opcional)

No Supabase Dashboard:
1. **Authentication** → **URL Configuration**
2. **Site URL:** `https://seu-dominio.com`
3. **Redirect URLs:**
   ```
   https://seu-dominio.com/**
   http://localhost:5173/**
   ```

---

## 🎨 Personalização do Template

### Variáveis Disponíveis:
- `{{ .Email }}` - Email do usuário
- `{{ .ConfirmationURL }}` - Link de confirmação
- `{{ .Token }}` - Token de confirmação
- `{{ .TokenHash }}` - Hash do token

### Dicas de Customização:
1. **Cores:** Altere `#667eea` e `#764ba2` para suas cores de marca
2. **Logo:** Troque 🎙️ por URL da sua logo (`<img src="...">`)
3. **Stats:** Atualize com suas métricas reais
4. **Features:** Adicione ou remova recursos conforme necessário

---

## 📊 Métricas para Acompanhar

Monitore no Supabase:
1. **Taxa de Confirmação**: % de usuários que confirmam email
2. **Tempo para Confirmar**: Quanto tempo levam
3. **Taxa de Abertura**: % que abrem o email (requer tracking)

---

## 🚨 Troubleshooting

### Email não chega:
1. Verificar pasta de spam
2. Checar logs em **Authentication** → **Users** (clicar no usuário)
3. Verificar se SMTP está configurado corretamente

### Link não funciona:
1. Verificar Redirect URLs no Supabase
2. Checar se Site URL está correto
3. Ver console do navegador para erros

### Email vai para spam:
1. Configurar SMTP próprio (não usar padrão do Supabase)
2. Adicionar SPF, DKIM records no DNS
3. Usar domínio verificado

---

## ✅ Checklist

- [ ] Template configurado no Supabase
- [ ] SMTP configurado (opcional)
- [ ] Redirect URLs configuradas
- [ ] Testado com conta nova
- [ ] Email chega e design está correto
- [ ] Link de confirmação funciona
- [ ] Usuário consegue fazer login após confirmar

---

## 🎯 Próximos Passos

Depois do email de boas-vindas, considere adicionar:
1. **Email de Reset de Senha** ✅ - [Ver documentação](./PASSWORD_RESET_EMAIL_SETUP.md)
2. **Email de Notificação** (transcrição completa)
3. **Email Semanal** (resumo de uso)
4. **Email de Reengajamento** (usuários inativos)

---

## 📝 Changelog

### Versão 2.0 (Atualizada)
✅ Cor do botão alterada para branco (`color: white !important;`)
✅ Logo atualizado para ícone SVG de microfone (matching com o app)
✅ Stats em caixas individuais com bordas e background gradient
✅ Texto corrigido: "60 min grátis no primeiro mês" (não todo mês)
✅ Espaçamento melhorado entre stats
✅ Paleta de cores alinhada com o site (roxo/rosa/azul)

### Versão 1.0 (Original)
- Template inicial com emoji 🎙️
- Stats em linha simples
- Botão sem cor explícita

---

**Pronto!** Seus usuários agora receberão um email de boas-vindas profissional e bonito! 🎉
