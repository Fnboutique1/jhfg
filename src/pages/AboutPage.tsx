import { BookOpen, Target, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import CTA from '@/sections/CTA';

const stats = [
  { num: '500+', label: 'about.stat1.label' },
  { num: '5+', label: 'about.stat2.label' },
  { num: '98%', label: 'about.stat3.label' },
  { num: '4', label: 'courses.title' },
];

const team = [
  { name: 'Mahmudur Rahman FAHIM', role: 'CEO & Enseignant de DELF A1 - B2', image: 'team/fahim.jpg' },
  { name: 'Mahmudul Hasan MARUF', role: 'Administrateur & Enseignant de DELF A1 - A2', image: 'team/maruf.jpg' },
  { name: 'Taib UMAR', role: 'Marketing Manager & IT Manager', image: null },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);

  return (
    <main>
      {/* Header */}
      <section
        ref={headerRef}
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
              {t('about.label')}
            </p>
            <h1
              className="font-display font-semibold"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                letterSpacing: '-0.01em',
              }}
            >
              {t('aboutpage.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section
        ref={storyRef}
        className="section-light"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={24} style={{ color: '#2D6A4F' }} />
                <h2
                  className="font-display font-semibold"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#1A1A1A' }}
                >
                  {t('aboutpage.story.title')}
                </h2>
              </div>
              <p className="text-base mb-6" style={{ color: '#6B5B4F', lineHeight: 1.7 }}>
                {t('aboutpage.story.desc')}
              </p>
              <div className="flex items-center gap-3">
                <Target size={24} style={{ color: '#2D6A4F' }} />
                <h3 className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                  {t('aboutpage.mission.title')}
                </h3>
              </div>
              <p className="text-sm mt-2" style={{ color: '#6B5B4F', lineHeight: 1.7 }}>
                {t('aboutpage.mission.desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                alt="FN Formation"
                className="w-full rounded-2xl shadow-lg object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={statsRef}
        className="section-dark"
        style={{ padding: 'clamp(3rem, 6vw, 5rem) 0' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p
                  className="font-display font-light"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </p>
                <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {t(stat.label)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        ref={teamRef}
        className="section-light"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users size={24} style={{ color: '#2D6A4F' }} />
            </div>
            <h2
              className="font-display font-semibold"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: '#1A1A1A', letterSpacing: '-0.01em' }}
            >
              {t('aboutpage.team.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-light text-center"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-display font-semibold text-white"
                    style={{ backgroundColor: '#1B4332' }}
                  >
                    {member.name.charAt(0)}
                  </div>
                )}
                <h3 className="text-base font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                  {member.name}
                </h3>
                <p className="text-sm" style={{ color: '#6B5B4F' }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
