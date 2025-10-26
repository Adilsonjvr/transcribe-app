import { createClient } from '@supabase/supabase-js';

// Inicializar cliente Supabase
// IMPORTANTE: As variáveis de ambiente devem ser configuradas
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fbxdfjkptlfyexhhsgpy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Registrar novo usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @param {string} fullName - Nome completo do usuário (opcional)
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const signUp = async (email, password, fullName = '') => {
  try {
    const { data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName || email.split('@')[0] // Usar email como fallback
        }
      }
    });

    if (error) {
      return {
        success: false,
        error: translateAuthError(error.message)
      };
    }

    return {
      success: true,
      user: data.user,
      session: data.session
    };
  } catch (error) {
    console.error('Erro no signup:', error);
    return {
      success: false,
      error: 'Erro ao criar conta. Tente novamente.'
    };
  }
};

/**
 * Fazer login
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return {
        success: false,
        error: translateAuthError(error.message)
      };
    }

    return {
      success: true,
      user: data.user,
      session: data.session
    };
  } catch (error) {
    console.error('Erro no signin:', error);
    return {
      success: false,
      error: 'Erro ao fazer login. Tente novamente.'
    };
  }
};

/**
 * Login com OAuth (Google, Apple, etc)
 * @param {string} provider - Provider name ('google', 'apple', etc)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const signInWithOAuth = async (provider) => {
  try {
    const { data, error} = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: window.location.origin,
        skipBrowserRedirect: false,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error('OAuth Error:', error);
      return {
        success: false,
        error: translateAuthError(error.message)
      };
    }

    // Supabase vai redirecionar automaticamente
    // O navegador vai para a URL do Google
    console.log('OAuth redirect URL:', data.url);
    return {
      success: true,
      url: data.url
    };
  } catch (error) {
    console.error('Erro no OAuth:', error);
    return {
      success: false,
      error: `Erro ao fazer login com ${provider}`
    };
  }
};

/**
 * Fazer logout
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: 'Erro ao fazer logout'
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Erro no signout:', error);
    return {
      success: false,
      error: 'Erro ao fazer logout'
    };
  }
};

/**
 * Recuperar senha
 * @param {string} email - Email do usuário
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      return {
        success: false,
        error: translateAuthError(error.message)
      };
    }

    return {
      success: true,
      message: 'Email de recuperação enviado! Confira sua caixa de entrada.'
    };
  } catch (error) {
    console.error('Erro ao recuperar senha:', error);
    return {
      success: false,
      error: 'Erro ao enviar email de recuperação'
    };
  }
};

/**
 * Atualizar senha
 * @param {string} newPassword - Nova senha
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return {
        success: false,
        error: translateAuthError(error.message)
      };
    }

    return {
      success: true,
      message: 'Senha atualizada com sucesso!'
    };
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return {
      success: false,
      error: 'Erro ao atualizar senha'
    };
  }
};

/**
 * Obter usuário atual
 * @returns {Promise<{user: object | null}>}
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return { user };
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return { user: null };
  }
};

/**
 * Obter sessão atual
 * @returns {Promise<{session: object | null}>}
 */
export const getSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return { session };
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return { session: null };
  }
};

/**
 * Listener para mudanças de autenticação
 * @param {function} callback - Função chamada quando o estado de auth muda
 * @returns {object} Subscription object para cleanup
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
};

/**
 * Traduzir mensagens de erro do Supabase para português
 * @param {string} errorMessage - Mensagem de erro original
 * @returns {string} Mensagem traduzida
 */
const translateAuthError = (errorMessage) => {
  const errorMap = {
    'Invalid login credentials': 'Email ou senha incorretos',
    'Email not confirmed': 'Por favor, confirme seu email antes de fazer login',
    'User already registered': 'Este email já está cadastrado',
    'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres',
    'Invalid email': 'Email inválido',
    'Email rate limit exceeded': 'Muitas tentativas. Tente novamente mais tarde',
    'Signup requires a valid password': 'A senha é obrigatória',
    'Unable to validate email address': 'Email inválido',
    'User not found': 'Usuário não encontrado'
  };

  return errorMap[errorMessage] || errorMessage || 'Erro desconhecido';
};

/**
 * Verificar se o usuário está autenticado
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
  const { session } = await getSession();
  return !!session;
};
