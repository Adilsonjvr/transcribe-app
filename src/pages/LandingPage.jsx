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
import { Logo } from '../components/Logo';
import { UILanguageSelector } from '../components/UILanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';

export const LandingPage = ({ onGetStarted }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white relative overflow-hidden">
      <AnimatedBackground />

      {/* Header Simples */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Logo size="medium" showText={true} animated={true} />

          <div className="flex items-center gap-3">
            {/* Seletor de idioma - versão compacta no mobile, padrão no desktop */}
            <div className="hidden sm:block">
              <UILanguageSelector variant="default" />
            </div>
            <div className="block sm:hidden">
              <UILanguageSelector variant="compact" />
            </div>

            <button
              onClick={onGetStarted}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-blue-600 transition-all hover-lift hover-glow shadow-lg text-sm sm:text-base"
            >
              {t.header.getStarted}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Main Title com Gradient Animado */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 animate-gradient">
                {t.hero.title.line1}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-slow">
                {t.hero.title.line2}
              </span>
              <br />
              <span className="text-white/90">{t.hero.title.line3}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.hero.subtitle.split('{speakers}')[0]}
              <span className="text-purple-300 font-semibold">{t.hero.subtitleHighlights.speakers}</span>
              {t.hero.subtitle.split('{speakers}')[1].split('{languages}')[0]}
              <span className="text-blue-300 font-semibold">{t.hero.subtitleHighlights.languages}</span>
              {t.hero.subtitle.split('{languages}')[1].split('{timestamps}')[0]}
              <span className="text-pink-300 font-semibold">{t.hero.subtitleHighlights.timestamps}</span>
              {t.hero.subtitle.split('{timestamps}')[1]}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/50"
              >
                {t.hero.cta.primary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 border-2 border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm">
                <Play className="w-5 h-5" />
                {t.hero.cta.secondary}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {t.hero.stats.accuracy.value}
                </div>
                <div className="text-sm text-white/60">{t.hero.stats.accuracy.label}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  {t.hero.stats.languages.value}
                </div>
                <div className="text-sm text-white/60">{t.hero.stats.languages.label}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                  {t.hero.stats.speed.value}
                </div>
                <div className="text-sm text-white/60">{t.hero.stats.speed.label}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                  {t.hero.stats.availability.value}
                </div>
                <div className="text-sm text-white/60">{t.hero.stats.availability.label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                {t.features.title}
              </h2>
              <p className="text-xl text-white/70">{t.features.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mapeando as features das traduções */}
              {[
                { icon: Users, gradient: 'from-purple-500 to-pink-500' },
                { icon: Clock, gradient: 'from-blue-500 to-cyan-500' },
                { icon: Languages, gradient: 'from-green-500 to-emerald-500' },
                { icon: Zap, gradient: 'from-yellow-500 to-orange-500' },
                { icon: FileText, gradient: 'from-red-500 to-pink-500' },
                { icon: Shield, gradient: 'from-indigo-500 to-purple-500' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{t.features.list[index].title}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {t.features.list[index].description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection onGetStarted={onGetStarted} t={t} />

        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                {t.faq.title}
              </h2>
            </div>

            <div className="space-y-4">
              {t.faq.items.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isActive={activeFaq === index}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {t.finalCta.title}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t.finalCta.subtitle}
            </p>
            <button
              onClick={onGetStarted}
              className="px-12 py-5 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-2xl"
            >
              {t.finalCta.cta}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Componente de Pricing
const PricingSection = ({ onGetStarted, t }) => {
  const plans = [
    {
      ...t.pricing.plans.free,
      highlighted: false
    },
    {
      ...t.pricing.plans.pro,
      highlighted: true
    },
    {
      ...t.pricing.plans.enterprise,
      highlighted: false
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-white/70">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 md:p-8 rounded-2xl transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 md:scale-105 shadow-2xl shadow-purple-500/50'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-black text-sm font-bold rounded-full">
                  {t.pricing.popularBadge}
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
              <h4 className="font-bold text-lg mb-2">{t.pricing.note.title}</h4>
              <p className="text-white/70 leading-relaxed">
                {t.pricing.note.description}
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
