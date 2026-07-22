import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1B4332' }}
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(45,106,79,0.6) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-[800px] mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base font-extrabold tracking-[0.2em] uppercase mb-6"
          style={{ color: '#FF3B3B' }}
        >
          {t('hero.label')}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-bold text-white mb-6"
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            textShadow: '0 4px 30px rgba(0,0,0,0.35)',
          }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-base sm:text-lg mb-10 max-w-[560px] mx-auto"
          style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}
        >
          {t('hero.desc')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/courses" className="btn-primary">
            {t('hero.btn1')}
          </Link>
          <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-[#1B4332]">
            {t('hero.btn2')}
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="animate-bounce-down inline-block">
          <ChevronDown size={28} style={{ color: 'rgba(255,255,255,0.5)' }} />
        </a>
      </motion.div>
    </section>
  );
}
