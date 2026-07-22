import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/courses', label: t('nav.courses') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/portal', label: t('nav.portal') },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? '#1B4332' : 'transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="logo.jpg"
                alt="FN Formation"
                className="h-10 w-auto rounded-md"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative text-[15px] font-bold tracking-[0.06em] uppercase text-white transition-all duration-300 rounded-full border-2 px-4 py-2"
                  style={{
                    borderColor: isActive(link.to) ? '#D00000' : 'rgba(208,0,0,0.55)',
                    backgroundColor: isActive(link.to) ? 'rgba(208,0,0,0.18)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#D00000';
                    e.currentTarget.style.backgroundColor = 'rgba(208,0,0,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isActive(link.to) ? '#D00000' : 'rgba(208,0,0,0.55)';
                    e.currentTarget.style.backgroundColor = isActive(link.to) ? 'rgba(208,0,0,0.18)' : 'transparent';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side: Language + Connection */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 text-[12px] font-medium tracking-wider">
                <button
                  onClick={() => setLang('bn')}
                  className={`px-2 py-1 rounded transition-colors ${
                    lang === 'bn'
                      ? 'text-white bg-white/20'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t('lang.bn')}
                </button>
                <span className="text-white/30">/</span>
                <button
                  onClick={() => setLang('fr')}
                  className={`px-2 py-1 rounded transition-colors ${
                    lang === 'fr'
                      ? 'text-white bg-white/20'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t('lang.fr')}
                </button>
              </div>

              {/* Connection Button */}
              <Link
                to="/connection"
                className="px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-[0.1em] uppercase border border-white text-white hover:bg-white hover:text-[#1B4332] transition-all duration-300"
              >
                {t('nav.connection')}
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] bg-[#1B4332] flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 text-white p-2"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-bold uppercase tracking-wide text-white rounded-full border-2 px-6 py-2 transition-colors"
                style={{
                  borderColor: isActive(link.to) ? '#D00000' : 'rgba(208,0,0,0.55)',
                  backgroundColor: isActive(link.to) ? 'rgba(208,0,0,0.18)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/connection"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase border border-white text-white hover:bg-white hover:text-[#1B4332] transition-all duration-300"
            >
              {t('nav.connection')}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setLang('bn')}
                className={`px-4 py-2 rounded transition-colors ${
                  lang === 'bn' ? 'text-white bg-white/20' : 'text-white/50'
                }`}
              >
                {t('lang.bn')}
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-4 py-2 rounded transition-colors ${
                  lang === 'fr' ? 'text-white bg-white/20' : 'text-white/50'
                }`}
              >
                {t('lang.fr')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
