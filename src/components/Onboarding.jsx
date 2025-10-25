import React, { useState } from 'react';
import { Zap, Upload, FileText, Sparkles, CheckCircle2, ArrowRight, X } from 'lucide-react';

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Bem-vindo ao Transcribe!',
    description: 'Transforme áudio em texto com IA de forma rápida e precisa',
    icon: Sparkles,
    content: (
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <p className="text-lg text-white/80 mb-4">
          Nossa plataforma usa tecnologia de ponta para transcrever seus áudios em segundos.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-3xl font-bold text-purple-400">95%</p>
            <p className="text-sm text-white/60">Precisão</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-3xl font-bold text-blue-400">100+</p>
            <p className="text-sm text-white/60">Idiomas</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-3xl font-bold text-indigo-400">&lt;5s</p>
            <p className="text-sm text-white/60">Processamento</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'Como Funciona',
    description: 'Apenas 3 passos simples',
    icon: Upload,
    content: (
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-purple-400">1</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Faça Upload do Áudio</h4>
            <p className="text-white/70">
              Arraste e solte ou selecione arquivos MP3, WAV, M4A e mais
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-blue-400">2</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">IA Processa</h4>
            <p className="text-white/70">
              Nossa IA transcreve com identificação de falantes e timestamps
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-indigo-400">3</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Exporte e Use</h4>
            <p className="text-white/70">
              Baixe em TXT, JSON, PDF ou DOCX. Edite e compartilhe
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Recursos Principais',
    description: 'Tudo que você precisa em um só lugar',
    icon: FileText,
    content: (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="font-semibold mb-2">Identificação de Falantes</h4>
          <p className="text-sm text-white/70">Separa automaticamente quem está falando</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="font-semibold mb-2">Timestamps Precisos</h4>
          <p className="text-sm text-white/70">Cada palavra com marcação de tempo</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="font-semibold mb-2">Múltiplos Formatos</h4>
          <p className="text-sm text-white/70">Exporte em TXT, JSON, PDF, DOCX</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="font-semibold mb-2">Histórico Salvo</h4>
          <p className="text-sm text-white/70">Acesse suas transcrições a qualquer momento</p>
        </div>
      </div>
    )
  }
];

export const Onboarding = ({ show, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!show) return null;

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;
  const Icon = step.icon;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-2xl relative">
        {/* Skip button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            {ONBOARDING_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index <= currentStep ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-white/50 mt-2 text-right">
            {currentStep + 1} de {ONBOARDING_STEPS.length}
          </p>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">{step.title}</h2>
          <p className="text-white/70 mb-8">{step.description}</p>

          <div className="text-left">{step.content}</div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 text-white/60 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <div className="flex gap-3">
            {!isLastStep && (
              <button
                onClick={onSkip}
                className="px-6 py-3 text-white/60 hover:text-white transition-all"
              >
                Pular
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-all flex items-center gap-2 font-medium"
            >
              {isLastStep ? 'Começar' : 'Próximo'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
