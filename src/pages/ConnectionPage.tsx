import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export default function ConnectionPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("Email ou mot de passe incorrect. Contactez-nous si vous n'avez pas encore reçu vos identifiants.");
      return;
    }
    navigate('/portal');
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Entrez votre email ci-dessus, puis cliquez sur "Mot de passe oublié".');
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
    if (resetError) {
      alert("Une erreur s'est produite. Réessayez plus tard.");
    } else {
      alert(`Un email de réinitialisation a été envoyé à ${email}.`);
    }
  };

  return (
    <main>
      {/* Header */}
      <section
        className="section-dark"
        style={{ paddingTop: 'calc(72px + 4rem)', paddingBottom: '4rem' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('nav.connection')}
            </p>
            <h1
              className="font-display font-semibold"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                letterSpacing: '-0.01em',
              }}
            >
              {t('connection.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Login Form */}
      <section
        className="section-light"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[480px] mx-auto px-4 sm:px-6"
        >
          <div className="card-light">
            {/* Logo */}
            <div className="text-center mb-6">
              <img
                src="logo.jpg"
                alt="FN Formation"
                className="h-16 w-auto rounded-md mx-auto mb-4"
              />
              <h2
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: '#1A1A1A' }}
              >
                {t('connection.welcome')}
              </h2>
            </div>

            {error && (
              <div
                className="text-center text-sm rounded-xl px-4 py-3 mb-6 font-semibold"
                style={{ backgroundColor: 'rgba(208,0,0,0.08)', color: '#D00000' }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              {/* Email */}
              <div>
                <label
                  className="block text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  {t('connection.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-300 focus:outline-none"
                  style={{
                    border: '1px solid rgba(27,67,50,0.15)',
                    backgroundColor: 'white',
                    color: '#1A1A1A',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2D6A4F';
                    e.target.style.boxShadow = '0 0 0 3px rgba(45,106,79,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(27,67,50,0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  {t('connection.password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-lg text-sm transition-all duration-300 focus:outline-none"
                    style={{
                      border: '1px solid rgba(27,67,50,0.15)',
                      backgroundColor: 'white',
                      color: '#1A1A1A',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2D6A4F';
                      e.target.style.boxShadow = '0 0 0 3px rgba(45,106,79,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(27,67,50,0.15)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: '#6B5B4F' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                {loading ? '...' : t('connection.login')}
              </button>
            </form>

            {/* Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm mt-6">
              <button
                type="button"
                className="transition-colors hover:opacity-80"
                style={{ color: '#6B5B4F' }}
                onClick={handleForgotPassword}
              >
                {t('connection.forgot')}
              </button>
              <button
                type="button"
                className="transition-colors hover:opacity-80"
                style={{ color: '#2D6A4F' }}
                onClick={() => navigate('/courses')}
              >
                {t('connection.new')}
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
