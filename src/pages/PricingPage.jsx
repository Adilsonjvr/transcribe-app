import React, { useState } from 'react';
import { Check, X, Zap, Crown, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PLANS, PLAN_TYPES, formatPrice } from '../config/plans';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const PricingPage = ({ user, onAuthClick, onLogout, isDarkMode, onToggleDarkMode, onSelectPlan }) => {
  const navigate = useNavigate();
  const [billingInterval, setBillingInterval] = useState('monthly');

  const handleSelectPlan = (planId) => {
    if (!user) {
      // Se não estiver logado, abrir modal de login
      onAuthClick();
      return;
    }

    if (planId === PLAN_TYPES.FREE) {
      // Plano free, só precisa estar logado
      navigate('/app');
      return;
    }

    if (planId === PLAN_TYPES.ENTERPRISE) {
      // Plano enterprise, abrir contato
      window.location.href = 'mailto:contato@transcribe.app?subject=Plano Enterprise';
      return;
    }

    // Plano Pro - redirecionar para checkout (será implementado com Stripe)
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
  };

  const getPlanIcon = (planId) => {
    switch (planId) {
      case PLAN_TYPES.FREE:
        return <Zap className="w-8 h-8" />;
      case PLAN_TYPES.PRO:
        return <Crown className="w-8 h-8" />;
      case PLAN_TYPES.ENTERPRISE:
        return <Building2 className="w-8 h-8" />;
      default:
        return <Zap className="w-8 h-8" />;
    }
  };

  const getButtonText = (planId) => {
    if (!user) {
      return 'Começar Agora';
    }

    switch (planId) {
      case PLAN_TYPES.FREE:
        return 'Usar Grátis';
      case PLAN_TYPES.PRO:
        return 'Assinar Pro';
      case PLAN_TYPES.ENTERPRISE:
        return 'Falar com Vendas';
      default:
        return 'Selecionar';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white relative overflow-hidden transition-colors duration-500">
      <AnimatedBackground />

      <Header
        user={user}
        onAuthClick={onAuthClick}
        onLogout={onLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
              Planos e Preços
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Escolha o plano perfeito para suas necessidades. Comece grátis e faça upgrade quando precisar.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-1 inline-flex">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingInterval === 'monthly'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingInterval === 'yearly'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Anual
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {Object.values(PLANS).map((plan) => {
              const isPopular = plan.popular;
              const price = billingInterval === 'yearly' && plan.price > 0
                ? plan.price * 12 * 0.8 / 12 // 20% desconto anual
                : plan.price;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white/10 backdrop-blur-sm border rounded-2xl p-8 transition-all hover:scale-105 ${
                    isPopular
                      ? 'border-purple-500 shadow-2xl shadow-purple-500/20'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                    isPopular
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-white/10'
                  }`}>
                    {getPlanIcon(plan.id)}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/60 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.isCustom ? (
                      <div>
                        <p className="text-4xl font-black">Personalizado</p>
                        <p className="text-white/60 text-sm mt-2">Entre em contato</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black">
                            {formatPrice(price, plan.currency)}
                          </span>
                          {plan.price > 0 && (
                            <span className="text-white/60">/mês</span>
                          )}
                        </div>
                        {billingInterval === 'yearly' && plan.price > 0 && (
                          <p className="text-sm text-green-400 mt-2">
                            Economize {formatPrice(plan.price * 12 * 0.2, plan.currency)}/ano
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {getButtonText(plan.id)}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>

            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  Posso mudar de plano a qualquer momento?
                  <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-white/70 mt-4">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
                  As mudanças são aplicadas imediatamente e o valor é calculado proporcionalmente.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  O que acontece se eu exceder meu limite?
                  <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-white/70 mt-4">
                  Você será notificado quando atingir 80% do seu limite. Ao exceder, você pode fazer
                  upgrade para o plano Pro ou aguardar o próximo mês para usar novamente.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  Como funciona o plano Enterprise?
                  <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-white/70 mt-4">
                  O plano Enterprise é personalizado de acordo com suas necessidades.
                  Entre em contato conosco para discutir volume, recursos especiais e integrações customizadas.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  Há reembolso?
                  <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-white/70 mt-4">
                  Oferecemos garantia de 7 dias. Se não estiver satisfeito, devolveremos 100% do seu dinheiro,
                  sem perguntas.
                </p>
              </details>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
