import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import DemoVideoModal from '@/components/DemoVideoModal';
import { courses } from '@/data/courses';

export default function Courses() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [demoModal, setDemoModal] = useState<{ videoId: string; title: string } | null>(null);

  return (
    <section
      ref={sectionRef}
      className="section-dark"
      style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {t('courses.label')}
          </p>
          <h2
            className="font-display font-semibold mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              letterSpacing: '-0.01em',
            }}
          >
            {t('courses.title')}
          </h2>
          <p className="text-base max-w-[640px] mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {t('courses.desc')}
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="card-dark overflow-hidden group"
            >
              {/* Image */}
              <div className="relative -mx-8 -mt-8 mb-5 overflow-hidden" style={{ aspectRatio: '3/2' }}>
                <img
                  src={course.image}
                  alt={t(`${course.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Category */}
              <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: '#D00000' }}>
                DELF {course.id.toUpperCase()}
              </p>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {t(`${course.key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-sm mb-4 line-clamp-2 font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {t(`${course.key}.desc`)}
              </p>

              {/* Price */}
              <p className="text-xl font-display font-semibold mb-4" style={{ color: '#D00000' }}>
                €{course.price}
              </p>

              {/* CTA - split into Demo + Buy */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setDemoModal({ videoId: course.demoVideoId, title: t(`${course.key}.title`) })}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border-2 border-white/50 text-white transition-all duration-300"
                >
                  <Play size={13} />
                  {t('course.demo')}
                </button>
                <Link
                  to={`/courses/${course.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300"
                  style={{ backgroundColor: '#D00000', color: 'white' }}
                >
                  {t('course.buy')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/courses"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase border border-white/40 text-white hover:bg-white hover:text-[#1B4332] transition-all duration-300"
          >
            {t('courses.btn')}
          </Link>
        </motion.div>
      </div>

      <DemoVideoModal
        open={demoModal !== null}
        onClose={() => setDemoModal(null)}
        videoId={demoModal?.videoId || ''}
        title={demoModal?.title || ''}
      />
    </section>
  );
}
