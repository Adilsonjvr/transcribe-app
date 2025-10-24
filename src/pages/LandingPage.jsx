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
              <p className="text-xs text-white/50">Audio to Text AI</p>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Get Started
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
                The AI-powered
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-slow">
                Speech-to-Text
              </span>
              <br />
              <span className="text-white/90">Platform</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your audio into accurate transcriptions with{' '}
              <span className="text-purple-300 font-semibold">speaker identification</span>,{' '}
              <span className="text-blue-300 font-semibold">100+ languages</span>, and{' '}
              <span className="text-pink-300 font-semibold">timestamps</span> in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/50"
              >
                Start Transcribing Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 border-2 border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  95%
                </div>
                <div className="text-sm text-white/60">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  100+
                </div>
                <div className="text-sm text-white/60">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                  &lt;5s
                </div>
                <div className="text-sm text-white/60">Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-white/60">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Powerful Features
              </h2>
              <p className="text-xl text-white/70">Everything you need for perfect transcriptions</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Speaker Diarization</h3>
                <p className="text-white/70 leading-relaxed">
                  Automatically identify and separate different speakers in your audio with AI-powered precision.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Precise Timestamps</h3>
                <p className="text-white/70 leading-relaxed">
                  Get accurate timestamps for every segment, perfect for navigation and reference.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Languages className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">100+ Languages</h3>
                <p className="text-white/70 leading-relaxed">
                  Support for over 100 languages with automatic language detection and high accuracy.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-white/70 leading-relaxed">
                  Process your audio files in seconds with our optimized cloud infrastructure.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Multiple Formats</h3>
                <p className="text-white/70 leading-relaxed">
                  Export your transcriptions as TXT, JSON, PDF, or DOCX with one click.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Secure & Private</h3>
                <p className="text-white/70 leading-relaxed">
                  Your data is encrypted and secure. We never share or sell your information.
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
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <FAQItem
                question="How accurate is the transcription?"
                answer="Our AI-powered transcription service achieves up to 95% accuracy using AssemblyAI's state-of-the-art models. Accuracy may vary based on audio quality, accents, and background noise."
                isActive={activeFaq === 0}
                onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
              />

              <FAQItem
                question="What audio formats are supported?"
                answer="We support all common audio formats including MP3, WAV, M4A, AAC, OGG, FLAC, and more. Maximum file size is 500MB."
                isActive={activeFaq === 1}
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
              />

              <FAQItem
                question="How long does transcription take?"
                answer="Most transcriptions are completed in under 5 seconds. Longer files may take proportionally more time, but we optimize for speed without sacrificing quality."
                isActive={activeFaq === 2}
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
              />

              <FAQItem
                question="Can I try it for free?"
                answer="Yes! We offer a free tier with 100 minutes of transcription per month. No credit card required to start."
                isActive={activeFaq === 3}
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
              />

              <FAQItem
                question="What languages are supported?"
                answer="We support over 100 languages including English, Spanish, French, German, Portuguese, Chinese, Japanese, Korean, and many more. Automatic language detection is also available."
                isActive={activeFaq === 4}
                onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
              />

              <FAQItem
                question="Is my data secure?"
                answer="Absolutely. All data is encrypted in transit and at rest. We follow industry best practices for security and never share your data with third parties."
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
              Ready to Transform Your Audio?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start transcribing today with our AI-powered platform
            </p>
            <button
              onClick={onGetStarted}
              className="px-12 py-5 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-2xl"
            >
              Get Started Free
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
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our service',
      features: [
        '100 minutes/month',
        'Basic transcription',
        'Auto language detection',
        'Export to TXT & JSON',
        'Email support'
      ],
      cta: 'Start Free',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For professionals and businesses',
      features: [
        '1,000 minutes/month',
        'Speaker diarization',
        'Timestamp precision',
        'All export formats (PDF, DOCX)',
        'Priority support',
        'API access'
      ],
      cta: 'Get Started',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large teams and organizations',
      features: [
        'Unlimited minutes',
        'Custom models',
        'Dedicated support',
        'SLA guarantee',
        'On-premise options',
        'Advanced analytics'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-white/70">Choose the plan that fits your needs</p>
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
                  Most Popular
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
              <h4 className="font-bold text-lg mb-2">Fair & Transparent Pricing</h4>
              <p className="text-white/70 leading-relaxed">
                Our pricing is based on actual usage of AssemblyAI's powerful API. We add a small service fee to cover infrastructure and provide you with the best transcription experience. No hidden fees, no surprises.
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
