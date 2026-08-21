// Supabase auth hata mesajlarını Türkçeleştirir.
export function mapAuthError(error) {
  const message = error?.message || ''

  if (message.includes('Invalid login credentials')) {
    return 'E-posta veya şifre hatalı.'
  }
  if (message.includes('Email not confirmed')) {
    return 'Hesabınızı kullanmak için e-postanızı doğrulayın.'
  }
  if (message.includes('User already registered')) {
    return 'Bu e-posta adresi zaten kayıtlı.'
  }
  if (message.includes('Password should be at least')) {
    return 'Şifre en az 6 karakter olmalıdır.'
  }
  if (message.includes('Unable to validate email address')) {
    return 'Geçerli bir e-posta adresi girin.'
  }
  if (message.includes('Signup requires a valid password')) {
    return 'Geçerli bir şifre girin.'
  }
  if (message.includes('Database error saving new user')) {
    return 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.'
  }

  return message || 'Bir hata oluştu. Lütfen tekrar deneyin.'
}
