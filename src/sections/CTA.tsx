import { MessageCircle, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTA() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="section-light"
      style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-[700px] mx-auto px-4 sm:px-6 text-center"
      >
        {/* Heading */}
        <h2
          className="font-display font-semibold mb-4"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
            color: '#1A1A1A',
            letterSpacing: '-0.01em',
          }}
        >
          {t('cta.title')}
        </h2>

        {/* Description */}
        <p className="text-base mb-8" style={{ color: '#6B5B4F', lineHeight: 1.7 }}>
          {t('cta.desc')}
        </p>

        {/* Contact Button */}
        <a
          href="https://wa.me/33751326118?text=Bonjour, j'ai une question concernant vos cours DELF."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base tracking-wider uppercase transition-all duration-300"
          style={{ backgroundColor: '#D00000', color: 'white' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B00000')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D00000')}
        >
          <MessageCircle size={20} />
          {t('cta.whatsapp')}
        </a>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
          <a
            href="mailto:contact@fnformation.com"
            className="flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
            style={{ color: '#D00000' }}
          >
            <Mail size={16} />
            contact@fnformation.com
          </a>
          <a
            href="tel:+33751326118"
            className="flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
            style={{ color: '#D00000' }}
          >
            <Phone size={16} />
            +33 7 51 32 61 18
          </a>
        </div>
      </motion.div>
    </section>
  );
}
