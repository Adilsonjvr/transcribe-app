import { useState, useEffect, useCallback } from 'react';
import {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  deleteAvatar,
  updatePreferences,
  completeOnboarding,
  updateOnboardingStep
} from '../services/profileService';

export const useProfile = (user) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Carregar perfil quando usuário mudar
  useEffect(() => {
    if (user?.id) {
      loadProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user?.id]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const result = await getUserProfile(user.id);

      if (result.success) {
        setProfile(result.profile);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = useCallback(async (updates) => {
    if (!user?.id) return { success: false, error: 'Usuário não autenticado' };

    try {
      setUpdating(true);
      const result = await updateUserProfile(user.id, updates);

      if (result.success) {
        setProfile(result.profile);
        return { success: true, message: 'Perfil atualizado com sucesso!' };
      }

      return result;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { success: false, error: error.message };
    } finally {
      setUpdating(false);
    }
  }, [user?.id]);

  const handleUploadAvatar = useCallback(async (file) => {
    if (!user?.id) return { success: false, error: 'Usuário não autenticado' };

    try {
      setUpdating(true);
      const result = await uploadAvatar(user.id, file);

      if (result.success) {
        // Recarregar perfil para pegar nova URL
        await loadProfile();
        return { success: true, message: 'Avatar atualizado com sucesso!' };
      }

      return result;
    } catch (error) {
      console.error('Erro ao fazer upload do avatar:', error);
      return { success: false, error: error.message };
    } finally {
      setUpdating(false);
    }
  }, [user?.id]);

  const handleDeleteAvatar = useCallback(async () => {
    if (!user?.id || !profile?.avatar_url) {
      return { success: false, error: 'Nenhum avatar para deletar' };
    }

    try {
      setUpdating(true);
      const result = await deleteAvatar(user.id, profile.avatar_url);

      if (result.success) {
        await loadProfile();
        return { success: true, message: 'Avatar removido com sucesso!' };
      }

      return result;
    } catch (error) {
      console.error('Erro ao deletar avatar:', error);
      return { success: false, error: error.message };
    } finally {
      setUpdating(false);
    }
  }, [user?.id, profile?.avatar_url]);

  const handleUpdatePreferences = useCallback(async (newPreferences) => {
    if (!user?.id) return { success: false, error: 'Usuário não autenticado' };

    try {
      setUpdating(true);
      const result = await updatePreferences(user.id, newPreferences);

      if (result.success) {
        setProfile(result.profile);
        return { success: true, message: 'Preferências atualizadas!' };
      }

      return result;
    } catch (error) {
      console.error('Erro ao atualizar preferências:', error);
      return { success: false, error: error.message };
    } finally {
      setUpdating(false);
    }
  }, [user?.id]);

  const handleCompleteOnboarding = useCallback(async () => {
    if (!user?.id) return { success: false, error: 'Usuário não autenticado' };

    try {
      const result = await completeOnboarding(user.id);

      if (result.success) {
        setProfile(result.profile);
        return { success: true };
      }

      return result;
    } catch (error) {
      console.error('Erro ao completar onboarding:', error);
      return { success: false, error: error.message };
    }
  }, [user?.id]);

  const handleUpdateOnboardingStep = useCallback(async (step) => {
    if (!user?.id) return { success: false, error: 'Usuário não autenticado' };

    try {
      const result = await updateOnboardingStep(user.id, step);

      if (result.success) {
        setProfile(result.profile);
        return { success: true };
      }

      return result;
    } catch (error) {
      console.error('Erro ao atualizar step do onboarding:', error);
      return { success: false, error: error.message };
    }
  }, [user?.id]);

  return {
    profile,
    loading,
    updating,
    updateProfile,
    uploadAvatar: handleUploadAvatar,
    deleteAvatar: handleDeleteAvatar,
    updatePreferences: handleUpdatePreferences,
    completeOnboarding: handleCompleteOnboarding,
    updateOnboardingStep: handleUpdateOnboardingStep,
    reloadProfile: loadProfile
  };
};
