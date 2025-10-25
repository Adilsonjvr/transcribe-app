import { supabase } from './supabase';

/**
 * Obter perfil do usuário
 */
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // Se perfil não existe, criar um
      if (error.code === 'PGRST116') {
        return await createUserProfile(userId);
      }
      throw error;
    }

    return { success: true, profile: data };
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Criar perfil do usuário
 */
export const createUserProfile = async (userId, profileData = {}) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: userId,
          ...profileData
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return { success: true, profile: data };
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Atualizar perfil do usuário
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, profile: data };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Upload de avatar
 */
export const uploadAvatar = async (userId, file) => {
  try {
    // Validar arquivo
    if (!file) {
      throw new Error('Nenhum arquivo selecionado');
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      throw new Error('Apenas imagens são permitidas');
    }

    // Validar tamanho (máximo 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      throw new Error('Imagem muito grande. Máximo: 2MB');
    }

    // Nome do arquivo: userId/timestamp.extensão
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Upload para storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    const avatarUrl = urlData.publicUrl;

    // Atualizar perfil com nova URL
    await updateUserProfile(userId, { avatar_url: avatarUrl });

    return { success: true, url: avatarUrl };
  } catch (error) {
    console.error('Erro ao fazer upload do avatar:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Deletar avatar
 */
export const deleteAvatar = async (userId, avatarUrl) => {
  try {
    // Extrair path do arquivo da URL
    const urlParts = avatarUrl.split('/avatars/');
    if (urlParts.length < 2) {
      throw new Error('URL inválida');
    }

    const filePath = urlParts[1];

    // Deletar do storage
    const { error } = await supabase.storage
      .from('avatars')
      .remove([filePath]);

    if (error) throw error;

    // Atualizar perfil removendo URL
    await updateUserProfile(userId, { avatar_url: null });

    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar avatar:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Atualizar preferências
 */
export const updatePreferences = async (userId, preferences) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ preferences })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, profile: data };
  } catch (error) {
    console.error('Erro ao atualizar preferências:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Completar onboarding
 */
export const completeOnboarding = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        onboarding_completed: true,
        onboarding_step: 0
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, profile: data };
  } catch (error) {
    console.error('Erro ao completar onboarding:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Atualizar step do onboarding
 */
export const updateOnboardingStep = async (userId, step) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ onboarding_step: step })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, profile: data };
  } catch (error) {
    console.error('Erro ao atualizar step do onboarding:', error);
    return { success: false, error: error.message };
  }
};
