import { Check, Play, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MousePointer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import CTA from '@/sections/CTA';
import DemoVideoModal from '@/components/DemoVideoModal';
import { courses } from '@/data/courses';

const steps = [
  { key: 'coursespage.step1', icon: MousePointer },
  { key: 'coursespage.step2', icon: CreditCard },
  { key: 'coursespage.step3', icon: Play },
];

export default function CoursesPage() {
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const howRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const howInView = useInView(howRef, { once: true, amount: 0.3 });

  const [demoModal, setDemoModal] = useState<{ videoId: string; title: string } | null>(null);

  const features = [
    t('course.feature1'),
    t('course.feature2'),
    t('course.feature3'),
    t('course.feature4'),
  ];

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
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('courses.label')}
            </p>
            <h1
              className="font-display font-semibold mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.01em',
              }}
            >
              {t('coursespage.title')}
            </h1>
            <p className="text-base max-w-[640px] mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('coursespage.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Cards Grid */}
      <section
        ref={gridRef}
        className="section-light"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-light overflow-hidden"
              >
                {/* Image */}
                <div className="relative -mx-8 -mt-8 mb-6 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={course.image}
                    alt={t(`${course.key}.title`)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Level Badge */}
                  <span
                    className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white"
                    style={{ backgroundColor: '#D00000' }}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-display font-semibold mb-3"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: '#1A1A1A' }}
                >
                  {t(`${course.key}.title`)}
                </h2>

                {/* Description */}
                <p className="text-sm mb-4" style={{ color: '#6B5B4F', lineHeight: 1.6 }}>
                  {t(`${course.key}.desc`)}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-2 mb-5">
                  {features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm font-bold" style={{ color: '#1A1A1A' }}>
                      <Check size={16} style={{ color: '#2D6A4F' }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <p
                  className="font-display font-semibold mb-5"
                  style={{ fontSize: '2rem', color: '#D00000' }}
                >
                  €{course.price}
                </p>

                {/* CTA - split into Demo + Buy */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setDemoModal({ videoId: course.demoVideoId, title: t(`${course.key}.title`) })}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase border-2 transition-all duration-300"
                    style={{ borderColor: '#1B4332', color: '#1B4332' }}
                  >
                    <Play size={16} />
                    {t('course.demo')}
                  </button>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="btn-primary flex-1"
                  >
                    {t('course.buy2')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={howRef}
        className="section-light"
        style={{ padding: '0 0 clamp(4rem, 8vw, 8rem)' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display font-semibold text-center mb-14"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              color: '#1A1A1A',
              letterSpacing: '-0.01em',
            }}
          >
            {t('coursespage.how')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={howInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center"
                >
                  {/* Number Circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-xl font-display font-semibold text-white"
                    style={{ backgroundColor: '#1B4332' }}
                  >
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <Icon size={28} className="mx-auto mb-3" style={{ color: '#2D6A4F' }} />

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                    {t(step.key)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm" style={{ color: '#6B5B4F' }}>
                    {t(`${step.key}d`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />

      <DemoVideoModal
        open={demoModal !== null}
        onClose={() => setDemoModal(null)}
        videoId={demoModal?.videoId || ''}
        title={demoModal?.title || ''}
      />
    </main>
  );
}
