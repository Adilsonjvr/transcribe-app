import React, { useState, useRef } from 'react';
import { X, Upload, User, Briefcase, Phone, Building2, Loader2, Camera } from 'lucide-react';

export const ProfileEditModal = ({
  show,
  onClose,
  profile,
  userEmail,
  onSave,
  onUploadAvatar,
  onDeleteAvatar,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    company: profile?.company || '',
    job_title: profile?.job_title || '',
    phone: profile?.phone || ''
  });

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  if (!show) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingAvatar(true);
      await onUploadAvatar(file);
      setUploadingAvatar(false);
    }
  };

  const handleAvatarDelete = async () => {
    if (window.confirm('Tem certeza que deseja remover seu avatar?')) {
      await onDeleteAvatar();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-bold mb-8">Editar Perfil</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center border-4 border-white/20">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>

              {/* Upload overlay */}
              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              >
                {uploadingAvatar ? (
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <Camera className="w-8 h-8 text-white" />
                )}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
              >
                {profile?.avatar_url ? 'Alterar foto' : 'Adicionar foto'}
              </button>

              {profile?.avatar_url && (
                <>
                  <span className="text-white/30">•</span>
                  <button
                    type="button"
                    onClick={handleAvatarDelete}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remover
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Email
            </label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/50 cursor-not-allowed"
            />
            <p className="text-xs text-white/40 mt-1">O email não pode ser alterado</p>
          </div>

          {/* Nome completo */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-white/70 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Nome Completo
            </label>
            <input
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={(e) => handleChange('full_name', e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Seu nome completo"
            />
          </div>

          {/* Empresa */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-2">
              <Building2 className="w-4 h-4 inline mr-2" />
              Empresa
            </label>
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Nome da empresa"
            />
          </div>

          {/* Cargo */}
          <div>
            <label htmlFor="job_title" className="block text-sm font-medium text-white/70 mb-2">
              <Briefcase className="w-4 h-4 inline mr-2" />
              Cargo
            </label>
            <input
              id="job_title"
              type="text"
              value={formData.job_title}
              onChange={(e) => handleChange('job_title', e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Seu cargo"
            />
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="+55 (11) 99999-9999"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
