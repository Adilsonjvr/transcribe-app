/**
 * Configuração dos planos de assinatura
 */

export const PLAN_TYPES = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise'
};

export const PLANS = {
  [PLAN_TYPES.FREE]: {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'BRL',
    interval: 'month',
    description: 'Perfeito para começar',
    features: [
      '10 transcrições por mês',
      'Até 30 minutos por áudio',
      'Formatos: TXT, JSON',
      'Identificação de idioma',
      'Suporte por email'
    ],
    limits: {
      transcriptionsPerMonth: 10,
      maxAudioDurationMinutes: 30,
      maxFileSizeMB: 100,
      canExportPDF: false,
      canExportDOCX: false,
      hasSpeakerDiarization: false,
      hasTimestamps: true,
      hasPriorityQueue: false
    },
    badge: null,
    popular: false
  },

  [PLAN_TYPES.PRO]: {
    id: 'pro',
    name: 'Pro',
    price: 49.90,
    currency: 'BRL',
    interval: 'month',
    description: 'Para profissionais e criadores',
    features: [
      '500 transcrições por mês',
      'Até 2 horas por áudio',
      'Todos os formatos (TXT, JSON, PDF, DOCX)',
      'Identificação de falantes',
      'Timestamps precisos',
      'Fila prioritária',
      'Suporte prioritário'
    ],
    limits: {
      transcriptionsPerMonth: 500,
      maxAudioDurationMinutes: 120,
      maxFileSizeMB: 500,
      canExportPDF: true,
      canExportDOCX: true,
      hasSpeakerDiarization: true,
      hasTimestamps: true,
      hasPriorityQueue: true
    },
    badge: 'Mais Popular',
    popular: true,
    stripeProductId: null, // Será configurado quando integrar Stripe
    stripePriceId: null
  },

  [PLAN_TYPES.ENTERPRISE]: {
    id: 'enterprise',
    name: 'Enterprise',
    price: null, // Preço customizado
    currency: 'BRL',
    interval: 'custom',
    description: 'Para empresas e equipes',
    features: [
      'Transcrições ilimitadas',
      'Sem limite de duração',
      'Todos os formatos',
      'Identificação de falantes',
      'API dedicada',
      'Integração personalizada',
      'Suporte 24/7',
      'SLA garantido',
      'Gerenciamento de equipe'
    ],
    limits: {
      transcriptionsPerMonth: -1, // -1 = ilimitado
      maxAudioDurationMinutes: -1,
      maxFileSizeMB: -1,
      canExportPDF: true,
      canExportDOCX: true,
      hasSpeakerDiarization: true,
      hasTimestamps: true,
      hasPriorityQueue: true
    },
    badge: 'Enterprise',
    popular: false,
    isCustom: true
  }
};

/**
 * Obter plano por ID
 */
export const getPlanById = (planId) => {
  return PLANS[planId] || PLANS[PLAN_TYPES.FREE];
};

/**
 * Verificar se usuário pode realizar ação baseado no plano
 */
export const canUserPerformAction = (userPlan, action, currentUsage = {}) => {
  const plan = getPlanById(userPlan);

  switch (action) {
    case 'transcribe':
      // Verificar se ainda tem transcrições disponíveis no mês
      if (plan.limits.transcriptionsPerMonth === -1) return true;
      return (currentUsage.transcriptionsThisMonth || 0) < plan.limits.transcriptionsPerMonth;

    case 'export_pdf':
      return plan.limits.canExportPDF;

    case 'export_docx':
      return plan.limits.canExportDOCX;

    case 'speaker_diarization':
      return plan.limits.hasSpeakerDiarization;

    case 'priority_queue':
      return plan.limits.hasPriorityQueue;

    default:
      return true;
  }
};

/**
 * Obter limite restante
 */
export const getRemainingLimit = (userPlan, currentUsage = {}) => {
  const plan = getPlanById(userPlan);

  if (plan.limits.transcriptionsPerMonth === -1) {
    return {
      unlimited: true,
      remaining: -1,
      total: -1,
      percentage: 100
    };
  }

  const used = currentUsage.transcriptionsThisMonth || 0;
  const total = plan.limits.transcriptionsPerMonth;
  const remaining = Math.max(0, total - used);
  const percentage = total > 0 ? Math.round((remaining / total) * 100) : 0;

  return {
    unlimited: false,
    remaining,
    used,
    total,
    percentage
  };
};

/**
 * Formatar preço
 */
export const formatPrice = (price, currency = 'BRL') => {
  if (price === null || price === undefined) {
    return 'Personalizado';
  }

  if (price === 0) {
    return 'Grátis';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency
  }).format(price);
};
