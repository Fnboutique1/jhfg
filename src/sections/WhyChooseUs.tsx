import { BookOpen, Award, Headphones, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  { key: 'why.1', icon: BookOpen },
  { key: 'why.2', icon: Award },
  { key: 'why.3', icon: Headphones },
  { key: 'why.4', icon: TrendingUp },
];

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="section-light"
      style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: '#D00000' }}>
            {t('why.label')}
          </p>
          <h2
            className="font-display font-semibold"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              color: '#1A1A1A',
              letterSpacing: '-0.01em',
            }}
          >
            {t('why.title')}
          </h2>
        </motion.div>

        {/* Feature Cards - Staggered Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isOffset = i === 1 || i === 3;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="card-light"
                style={{ marginTop: isOffset ? '2rem' : 0 }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(45,106,79,0.1)' }}
                >
                  <Icon size={22} style={{ color: '#2D6A4F' }} />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold tracking-wide mb-3" style={{ color: '#1A1A1A' }}>
                  {t(`${feature.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-sm" style={{ color: '#6B5B4F', lineHeight: 1.6 }}>
                  {t(`${feature.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
