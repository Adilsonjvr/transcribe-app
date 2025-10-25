import React, { useState } from 'react';
import {
  Mic,
  Zap,
  Globe,
  FileText,
  Clock,
  Users,
  Shield,
  Check,
  ArrowRight,
  ChevronDown,
  Sparkles,
  BarChart3,
  Languages,
  Play
} from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Footer } from '../components/Footer';

export const LandingPage = ({ onGetStarted }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white relative overflow-hidden">
      <AnimatedBackground />

      {/* Header Simples */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">TRANSCRIBE</h1>
              <p className="text-xs text-white/50">IA de Áudio para Texto</p>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Começar Agora
          </button>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Powered by AssemblyAI</span>
            </div>

            {/* Main Title com Gradient Animado */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 animate-gradient">
                A Plataforma de
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-slow">
                Transcrição de Áudio
              </span>
              <br />
              <span className="text-white/90">Mais Inteligente</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transforme seus áudios em transcrições precisas com{' '}
              <span className="text-purple-300 font-semibold">identificação de palestrantes</span>,{' '}
              <span className="text-blue-300 font-semibold">100+ idiomas</span> e{' '}
              <span className="text-pink-300 font-semibold">timestamps</span> em segundos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/50"
              >
                Começar a Transcrever Grátis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 border-2 border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm">
                <Play className="w-5 h-5" />
                Ver Demonstração
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  95%
                </div>
                <div className="text-sm text-white/60">Taxa de Precisão</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  100+
                </div>
                <div className="text-sm text-white/60">Idiomas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                  &lt;5s
                </div>
                <div className="text-sm text-white/60">Tempo de Processamento</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-white/60">Disponível</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Recursos Poderosos
              </h2>
              <p className="text-xl text-white/70">Tudo que você precisa para transcrições perfeitas</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Identificação de Palestrantes</h3>
                <p className="text-white/70 leading-relaxed">
                  Identifique e separe automaticamente diferentes palestrantes no seu áudio com precisão de IA.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Timestamps Precisos</h3>
                <p className="text-white/70 leading-relaxed">
                  Obtenha timestamps precisos para cada segmento, perfeito para navegação e referência.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Languages className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">100+ Idiomas</h3>
                <p className="text-white/70 leading-relaxed">
                  Suporte para mais de 100 idiomas com detecção automática e alta precisão.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Ultra Rápido</h3>
                <p className="text-white/70 leading-relaxed">
                  Processe seus arquivos de áudio em segundos com nossa infraestrutura otimizada na nuvem.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Múltiplos Formatos</h3>
                <p className="text-white/70 leading-relaxed">
                  Exporte suas transcrições como TXT, JSON, PDF ou DOCX com um clique.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Seguro e Privado</h3>
                <p className="text-white/70 leading-relaxed">
                  Seus dados são criptografados e seguros. Nunca compartilhamos ou vendemos suas informações.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection onGetStarted={onGetStarted} />

        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-4">
              <FAQItem
                question="Qual a precisão da transcrição?"
                answer="Nosso serviço de transcrição com IA atinge até 95% de precisão usando os modelos de última geração da AssemblyAI. A precisão pode variar com base na qualidade do áudio, sotaques e ruído de fundo."
                isActive={activeFaq === 0}
                onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
              />

              <FAQItem
                question="Quais formatos de áudio são suportados?"
                answer="Suportamos todos os formatos de áudio comuns incluindo MP3, WAV, M4A, AAC, OGG, FLAC e mais. O tamanho máximo do arquivo é 500MB."
                isActive={activeFaq === 1}
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
              />

              <FAQItem
                question="Quanto tempo leva a transcrição?"
                answer="A maioria das transcrições é concluída em menos de 5 segundos. Arquivos mais longos podem levar proporcionalmente mais tempo, mas otimizamos para velocidade sem sacrificar a qualidade."
                isActive={activeFaq === 2}
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
              />

              <FAQItem
                question="Posso experimentar gratuitamente?"
                answer="Sim! Oferecemos um plano gratuito com 100 minutos de transcrição por mês. Não é necessário cartão de crédito para começar."
                isActive={activeFaq === 3}
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
              />

              <FAQItem
                question="Quais idiomas são suportados?"
                answer="Suportamos mais de 100 idiomas incluindo Inglês, Espanhol, Francês, Alemão, Português, Chinês, Japonês, Coreano e muitos mais. Detecção automática de idioma também está disponível."
                isActive={activeFaq === 4}
                onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
              />

              <FAQItem
                question="Meus dados estão seguros?"
                answer="Absolutamente. Todos os dados são criptografados em trânsito e em repouso. Seguimos as melhores práticas de segurança da indústria e nunca compartilhamos seus dados com terceiros."
                isActive={activeFaq === 5}
                onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}
              />
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Pronto para Transformar seu Áudio?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Comece a transcrever hoje com nossa plataforma de IA
            </p>
            <button
              onClick={onGetStarted}
              className="px-12 py-5 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-2xl"
            >
              Começar Gratuitamente
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Componente de Pricing
const PricingSection = ({ onGetStarted }) => {
  const plans = [
    {
      name: 'Gratuito',
      price: 'R$0',
      period: 'para sempre',
      description: 'Perfeito para experimentar nosso serviço',
      features: [
        '100 minutos/mês',
        'Transcrição básica',
        'Detecção automática de idioma',
        'Exportar para TXT e JSON',
        'Suporte por email'
      ],
      cta: 'Começar Grátis',
      highlighted: false
    },
    {
      name: 'Pro',
      price: 'R$79',
      period: 'por mês',
      description: 'Para profissionais e empresas',
      features: [
        '1.000 minutos/mês',
        'Identificação de palestrantes',
        'Timestamps precisos',
        'Todos formatos (PDF, DOCX)',
        'Suporte prioritário',
        'Acesso à API'
      ],
      cta: 'Começar Agora',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Customizado',
      period: 'entre em contato',
      description: 'Para grandes equipes e organizações',
      features: [
        'Minutos ilimitados',
        'Modelos customizados',
        'Suporte dedicado',
        'Garantia de SLA',
        'Opções on-premise',
        'Analytics avançado'
      ],
      cta: 'Falar com Vendas',
      highlighted: false
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Preços Simples e Transparentes
          </h2>
          <p className="text-xl text-white/70">Escolha o plano que se adapta às suas necessidades</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 scale-105 shadow-2xl shadow-purple-500/50'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-black text-sm font-bold rounded-full">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-white/60">/ {plan.period}</span>
                </div>
                <p className="text-white/70">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onGetStarted}
                className={`w-full py-3 rounded-full font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Note sobre AssemblyAI Pricing */}
        <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg mb-2">Preços Justos e Transparentes</h4>
              <p className="text-white/70 leading-relaxed">
                Nossos preços são baseados no uso real da poderosa API da AssemblyAI. Adicionamos uma pequena taxa de serviço para cobrir infraestrutura e fornecer a melhor experiência de transcrição. Sem taxas ocultas, sem surpresas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente FAQ Item
const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all hover:bg-white/10"
    >
      <button
        onClick={onClick}
        className="w-full p-6 flex items-center justify-between text-left"
      >
        <span className="font-bold text-lg pr-8">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-white/70 transition-transform flex-shrink-0 ${
            isActive ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isActive && (
        <div className="px-6 pb-6">
          <p className="text-white/70 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};
