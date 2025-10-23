# 🚀 Deploy no Vercel - Guia Completo

## ✅ Pré-requisitos

- [x] Build de produção testado (`npm run build`)
- [x] Variáveis de ambiente configuradas
- [x] Conta no Vercel (gratuita)
- [x] Código commitado no Git

---

## 🎯 Opção 1: Deploy via Dashboard (Mais Fácil)

### Passo 1: Conectar Repositório

1. Acesse https://vercel.com
2. Clique em **"Add New"** → **"Project"**
3. Conecte seu GitHub/GitLab/Bitbucket
4. Selecione o repositório `transcribe-app`
5. Clique em **"Import"**

### Passo 2: Configurar Projeto

Vercel detectará automaticamente que é um projeto Vite!

**Framework Preset:** Vite ✅ (detectado automaticamente)
**Build Command:** `npm run build` ✅
**Output Directory:** `dist` ✅
**Install Command:** `npm install` ✅

### Passo 3: Adicionar Variáveis de Ambiente

Na seção **Environment Variables**, adicione:

```env
VITE_SUPABASE_URL = https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY = sua-anon-key-aqui
```

**Onde encontrar:**
- Dashboard do Supabase → Settings → API
- Copie "Project URL" e "anon/public key"

### Passo 4: Deploy!

1. Clique em **"Deploy"**
2. Aguarde 1-2 minutos
3. Pronto! Seu app está no ar! 🎉

---

## 🎯 Opção 2: Deploy via CLI (Mais Rápido)

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Login

```bash
vercel login
```

Escolha seu método de autenticação (Email, GitHub, etc.)

### Passo 3: Deploy

```bash
# Na pasta do projeto
cd transcribe-app

# Primeiro deploy (vai fazer algumas perguntas)
vercel
```

**Perguntas que serão feitas:**

```
? Set up and deploy "~/transcribe-app"? [Y/n] Y
? Which scope do you want to deploy to? [sua-conta]
? Link to existing project? [y/N] N
? What's your project's name? transcribe-app
? In which directory is your code located? ./
```

### Passo 4: Adicionar Variáveis de Ambiente

```bash
# Adicionar SUPABASE_URL
vercel env add VITE_SUPABASE_URL

# Cole o valor quando solicitado
? What's the value of VITE_SUPABASE_URL? https://seu-projeto.supabase.co
? Add VITE_SUPABASE_URL to which Environments? Production, Preview, Development

# Adicionar SUPABASE_ANON_KEY
vercel env add VITE_SUPABASE_ANON_KEY

? What's the value of VITE_SUPABASE_ANON_KEY? sua-anon-key
? Add VITE_SUPABASE_ANON_KEY to which Environments? Production, Preview, Development
```

### Passo 5: Deploy de Produção

```bash
# Deploy de produção
vercel --prod
```

---

## 🔧 Configuração Automática

O arquivo `vercel.json` já está configurado com:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

Isso garante:
- ✅ Roteamento SPA correto
- ✅ Cache otimizado para assets
- ✅ Build automático

---

## 🌍 Domínio Personalizado (Opcional)

### Via Dashboard:

1. Acesse seu projeto no Vercel
2. **Settings** → **Domains**
3. **Add** → Digite seu domínio
4. Siga instruções para configurar DNS

### Via CLI:

```bash
vercel domains add seu-dominio.com
```

---

## 🔄 Deploy Automático

Após configuração inicial, **todo push na main** fará deploy automático!

```bash
git add .
git commit -m "Nova feature"
git push origin main

# Vercel detecta e faz deploy automaticamente! 🚀
```

---

## 📊 Monitoramento

### Ver Logs de Deploy:

**Via Dashboard:**
- Vercel Dashboard → Seu Projeto → Deployments → Clique no deploy → Logs

**Via CLI:**
```bash
vercel logs
```

### Ver Analytics:

Dashboard → Seu Projeto → Analytics

---

## ⚠️ Importante: Supabase Edge Functions

**A API Key da AssemblyAI NÃO vai para o Vercel!**

Ela deve estar configurada no **Supabase Edge Functions**:

```bash
# No Supabase (NÃO no Vercel)
supabase secrets set ASSEMBLY_AI_KEY=sua-chave-aqui
```

**Fluxo correto:**
1. Frontend (Vercel) → usa apenas `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
2. Frontend chama Edge Function no Supabase
3. Edge Function usa `ASSEMBLY_AI_KEY` (configurada no Supabase)
4. Edge Function chama AssemblyAI

---

## ✅ Checklist Pós-Deploy

- [ ] App está acessível na URL do Vercel
- [ ] Login/Cadastro funciona
- [ ] Upload de áudio funciona
- [ ] Transcrição funciona (testar com áudio pequeno primeiro)
- [ ] Speaker diarization aparece corretamente
- [ ] Exports TXT e JSON funcionam
- [ ] Dark mode funciona
- [ ] Responsivo (testar no mobile)

---

## 🐛 Troubleshooting

### Erro: "Environment variables not found"

**Solução:**
```bash
# Verificar variáveis
vercel env ls

# Adicionar se faltarem
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Redeploy
vercel --prod
```

### Erro: "Page not found" ao recarregar

**Causa:** Falta configuração de rewrites

**Solução:** Verifique que `vercel.json` tem:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Erro 401 ao transcrever

**Causa:** ASSEMBLY_AI_KEY não configurada no Supabase

**Solução:**
```bash
supabase secrets set ASSEMBLY_AI_KEY=sua-chave
supabase functions deploy dynamic-processor
```

### Build falha

**Verificar:**
```bash
# Testar build local
npm run build

# Ver erros
npm run build 2>&1 | grep -i error
```

---

## 📈 Performance

### Otimizações Automáticas do Vercel:

- ✅ **Compressão Gzip/Brotli**
- ✅ **CDN Global** (300+ localizações)
- ✅ **HTTP/2** e **HTTP/3**
- ✅ **Cache inteligente**
- ✅ **Image Optimization** (se usar)
- ✅ **Edge Functions** (se necessário)

### Tamanho da Build:

```
dist/index.html:     0.46 kB
dist/assets/css:    26.58 kB
dist/assets/js:    429.75 kB
Total:             ~457 kB
Gzip:              ~128 kB ✅
```

---

## 💰 Custos

### Plano Gratuito:

- ✅ **Projetos ilimitados**
- ✅ **100GB bandwidth/mês**
- ✅ **1000 builds/mês**
- ✅ **CDN global**
- ✅ **SSL automático**
- ✅ **Deploy preview** para cada PR

**Perfeito para este projeto!** 🎉

---

## 🔗 URLs Úteis

- **Dashboard:** https://vercel.com/dashboard
- **Documentação:** https://vercel.com/docs
- **Status:** https://www.vercel-status.com
- **CLI Docs:** https://vercel.com/docs/cli

---

## 📞 Suporte

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Discord:** https://vercel.com/discord
- **Supabase Docs:** https://supabase.com/docs

---

**Pronto para deploy!** 🚀

Escolha a opção que preferir (Dashboard ou CLI) e em 5 minutos seu app estará online!
