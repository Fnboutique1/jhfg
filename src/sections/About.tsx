import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const stats = [
    { num: lang === 'bn' ? '৫০০+' : '500+', raw: 500, suffix: '+', label: t('about.stat1.label') },
    { num: lang === 'bn' ? '৫+' : '5+', raw: 5, suffix: '+', label: t('about.stat2.label') },
    { num: lang === 'bn' ? '৯৮%' : '98%', raw: 98, suffix: '%', label: t('about.stat3.label') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-light"
      style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: '#D00000' }}>
              {t('about.label')}
            </p>

            {/* Heading */}
            <h2
              className="font-display font-semibold mb-6"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                color: '#1A1A1A',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              {t('about.title')}
            </h2>

            {/* Description */}
            <p className="text-base mb-6" style={{ color: '#6B5B4F', lineHeight: 1.7 }}>
              {t('about.desc')}
            </p>

            {/* Link */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] uppercase transition-colors hover:gap-3"
              style={{ color: '#2D6A4F' }}
            >
              {t('about.link')}
              <ArrowRight size={16} />
            </Link>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 lg:gap-12 mt-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <p
                    className="font-display font-light"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      color: '#1B4332',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {lang === 'bn' ? (
                      stat.num
                    ) : (
                      <>
                        <AnimatedCounter target={stat.raw} suffix={stat.suffix} />
                      </>
                    )}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#6B5B4F' }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - YouTube Tutorials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col gap-4"
          >
            {[
              { id: 'CEd1OyuGuGo', title: 'Tutoriel français #1' },
              { id: 'tILT8HR-VAI', title: 'Tutoriel français #2' },
              { id: 'WdqpZKsOngY', title: 'Tutoriel français #3' },
            ].map((video, i) => (
              <div
                key={i}
                className="youtube-container w-full rounded-2xl overflow-hidden shadow-lg"
                style={{ aspectRatio: '16/9' }}
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
