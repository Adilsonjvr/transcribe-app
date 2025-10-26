export const translations = {
  'pt-BR': {
    // Header
    header: {
      getStarted: 'Começar Agora'
    },

    // Hero Section
    hero: {
      badge: 'Powered by AssemblyAI',
      title: {
        line1: 'Transcreva Áudio',
        line2: 'com Inteligência Artificial',
        line3: 'em Segundos'
      },
      subtitle: 'Transforme seus áudios em texto com precisão de até 95%. Suporte para {speakers}, {languages} e {timestamps}.',
      subtitleHighlights: {
        speakers: 'múltiplos palestrantes',
        languages: 'diversos idiomas',
        timestamps: 'timestamps precisos'
      },
      cta: {
        primary: 'Começar a Transcrever Grátis',
        secondary: 'Ver Demonstração'
      },
      stats: {
        accuracy: { value: '95%', label: 'Precisão' },
        languages: { value: '6+', label: 'Idiomas' },
        speed: { value: '<5s', label: 'Processamento' },
        availability: { value: '24/7', label: 'Disponível' }
      }
    },

    // Features Section
    features: {
      title: 'Recursos Poderosos',
      subtitle: 'Tudo que você precisa para transcrições perfeitas',
      list: [
        {
          title: 'Identificação de Palestrantes',
          description: 'Identifique e separe automaticamente diferentes palestrantes no seu áudio com precisão de IA.'
        },
        {
          title: 'Timestamps Precisos',
          description: 'Obtenha timestamps precisos para cada segmento, perfeito para navegação e referência.'
        },
        {
          title: 'Múltiplos Idiomas',
          description: 'Suporte para Português, Inglês, Espanhol, Francês, Alemão, Italiano e mais, com detecção automática.'
        },
        {
          title: 'Ultra Rápido',
          description: 'Processe seus arquivos de áudio em segundos com nossa infraestrutura otimizada na nuvem.'
        },
        {
          title: 'Múltiplos Formatos',
          description: 'Exporte suas transcrições como TXT, JSON, PDF ou DOCX com um clique.'
        },
        {
          title: 'Seguro e Privado',
          description: 'Seus dados são criptografados e seguros. Nunca compartilhamos ou vendemos suas informações.'
        }
      ]
    },

    // Pricing Section
    pricing: {
      title: 'Preços Simples e Transparentes',
      subtitle: 'Escolha o plano que se adapta às suas necessidades',
      popularBadge: 'Mais Popular',
      plans: {
        free: {
          name: 'Gratuito',
          price: 'R$0',
          period: 'para sempre',
          description: 'Perfeito para experimentar nosso serviço',
          features: [
            '60 minutos/mês',
            'Transcrição com IA',
            'Detecção automática de idioma',
            'Exportar TXT, JSON, PDF, DOCX',
            'Suporte por email'
          ],
          cta: 'Começar Grátis'
        },
        pro: {
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
          cta: 'Começar Agora'
        },
        enterprise: {
          name: 'Enterprise',
          price: 'Customizado',
          period: 'contato',
          description: 'Para grandes equipes e organizações',
          features: [
            'Minutos ilimitados',
            'Modelos customizados',
            'Suporte dedicado',
            'Garantia de SLA',
            'Opções on-premise',
            'Analytics avançado'
          ],
          cta: 'Falar com Vendas'
        }
      },
      note: {
        title: 'Preços Justos e Transparentes',
        description: 'Nossos preços são baseados no uso real da poderosa API da AssemblyAI. Adicionamos uma pequena taxa de serviço para cobrir infraestrutura e fornecer a melhor experiência de transcrição. Sem taxas ocultas, sem surpresas.'
      }
    },

    // FAQ Section
    faq: {
      title: 'Perguntas Frequentes',
      items: [
        {
          question: 'Qual a precisão da transcrição?',
          answer: 'Nosso serviço de transcrição com IA atinge até 95% de precisão usando os modelos de última geração da AssemblyAI. A precisão pode variar com base na qualidade do áudio, sotaques e ruído de fundo.'
        },
        {
          question: 'Quais formatos de áudio são suportados?',
          answer: 'Suportamos todos os formatos de áudio comuns incluindo MP3, WAV, M4A, AAC, OGG, FLAC e mais. O tamanho máximo do arquivo é 25MB.'
        },
        {
          question: 'Quanto tempo leva a transcrição?',
          answer: 'A maioria das transcrições é concluída em menos de 5 segundos. Arquivos mais longos podem levar proporcionalmente mais tempo, mas otimizamos para velocidade sem sacrificar a qualidade.'
        },
        {
          question: 'Posso experimentar gratuitamente?',
          answer: 'Sim! Oferecemos um plano gratuito com 60 minutos de transcrição por mês. Não é necessário cartão de crédito para começar.'
        },
        {
          question: 'Quais idiomas são suportados?',
          answer: 'Suportamos Português (Brasil), Inglês (US), Espanhol, Francês, Alemão, Italiano e detecção automática de idioma. A transcrição funciona com alta precisão em todos esses idiomas.'
        },
        {
          question: 'Meus dados estão seguros?',
          answer: 'Absolutamente. Todos os dados são criptografados em trânsito e em repouso. Seguimos as melhores práticas de segurança da indústria e nunca compartilhamos seus dados com terceiros.'
        }
      ]
    },

    // Final CTA
    finalCta: {
      title: 'Pronto para Transformar seu Áudio?',
      subtitle: 'Comece a transcrever hoje com nossa plataforma de IA',
      cta: 'Começar Gratuitamente'
    }
  },

  'en': {
    // Header
    header: {
      getStarted: 'Get Started'
    },

    // Hero Section
    hero: {
      badge: 'Powered by AssemblyAI',
      title: {
        line1: 'Transcribe Audio',
        line2: 'with Artificial Intelligence',
        line3: 'in Seconds'
      },
      subtitle: 'Transform your audio into text with up to 95% accuracy. Support for {speakers}, {languages}, and {timestamps}.',
      subtitleHighlights: {
        speakers: 'multiple speakers',
        languages: 'multiple languages',
        timestamps: 'precise timestamps'
      },
      cta: {
        primary: 'Start Transcribing Free',
        secondary: 'Watch Demo'
      },
      stats: {
        accuracy: { value: '95%', label: 'Accuracy' },
        languages: { value: '6+', label: 'Languages' },
        speed: { value: '<5s', label: 'Processing' },
        availability: { value: '24/7', label: 'Available' }
      }
    },

    // Features Section
    features: {
      title: 'Powerful Features',
      subtitle: 'Everything you need for perfect transcriptions',
      list: [
        {
          title: 'Speaker Identification',
          description: 'Automatically identify and separate different speakers in your audio with AI precision.'
        },
        {
          title: 'Precise Timestamps',
          description: 'Get accurate timestamps for each segment, perfect for navigation and reference.'
        },
        {
          title: 'Multiple Languages',
          description: 'Support for Portuguese, English, Spanish, French, German, Italian and more, with automatic detection.'
        },
        {
          title: 'Ultra Fast',
          description: 'Process your audio files in seconds with our optimized cloud infrastructure.'
        },
        {
          title: 'Multiple Formats',
          description: 'Export your transcriptions as TXT, JSON, PDF, or DOCX with one click.'
        },
        {
          title: 'Safe and Private',
          description: 'Your data is encrypted and secure. We never share or sell your information.'
        }
      ]
    },

    // Pricing Section
    pricing: {
      title: 'Simple and Transparent Pricing',
      subtitle: 'Choose the plan that fits your needs',
      popularBadge: 'Most Popular',
      plans: {
        free: {
          name: 'Free',
          price: '$0',
          period: 'forever',
          description: 'Perfect for trying out our service',
          features: [
            '60 minutes/month',
            'AI Transcription',
            'Automatic language detection',
            'Export TXT, JSON, PDF, DOCX',
            'Email support'
          ],
          cta: 'Start Free'
        },
        pro: {
          name: 'Pro',
          price: '$19',
          period: 'per month',
          description: 'For professionals and businesses',
          features: [
            '1,000 minutes/month',
            'Speaker identification',
            'Precise timestamps',
            'All formats (PDF, DOCX)',
            'Priority support',
            'API access'
          ],
          cta: 'Get Started'
        },
        enterprise: {
          name: 'Enterprise',
          price: 'Custom',
          period: 'contact',
          description: 'For large teams and organizations',
          features: [
            'Unlimited minutes',
            'Custom models',
            'Dedicated support',
            'SLA guarantee',
            'On-premise options',
            'Advanced analytics'
          ],
          cta: 'Contact Sales'
        }
      },
      note: {
        title: 'Fair and Transparent Pricing',
        description: 'Our prices are based on the actual usage of AssemblyAI\'s powerful API. We add a small service fee to cover infrastructure and provide the best transcription experience. No hidden fees, no surprises.'
      }
    },

    // FAQ Section
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'How accurate is the transcription?',
          answer: 'Our AI transcription service achieves up to 95% accuracy using AssemblyAI\'s state-of-the-art models. Accuracy may vary based on audio quality, accents, and background noise.'
        },
        {
          question: 'What audio formats are supported?',
          answer: 'We support all common audio formats including MP3, WAV, M4A, AAC, OGG, FLAC, and more. The maximum file size is 25MB.'
        },
        {
          question: 'How long does transcription take?',
          answer: 'Most transcriptions are completed in less than 5 seconds. Longer files may take proportionally more time, but we optimize for speed without sacrificing quality.'
        },
        {
          question: 'Can I try it for free?',
          answer: 'Yes! We offer a free plan with 60 minutes of transcription per month. No credit card required to get started.'
        },
        {
          question: 'Which languages are supported?',
          answer: 'We support Portuguese (Brazil), English (US), Spanish, French, German, Italian, and automatic language detection. Transcription works with high accuracy in all these languages.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Absolutely. All data is encrypted in transit and at rest. We follow industry-standard security best practices and never share your data with third parties.'
        }
      ]
    },

    // Final CTA
    finalCta: {
      title: 'Ready to Transform Your Audio?',
      subtitle: 'Start transcribing today with our AI platform',
      cta: 'Get Started Free'
    }
  }
};

export const getTranslation = (lang, key) => {
  const keys = key.split('.');
  let value = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};
