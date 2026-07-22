import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const students = [
  'রাহিম — DELF B1 পাস',
  'Rahim — Réussi DELF B1',
  'ফাতেমা — DELF A2 পাস',
  'Fatima — Réussi DELF A2',
  'করিম — DELF B2 পাস',
  'Karim — Réussi DELF B2',
  'আয়েশা — DELF A1 পাস',
  'Ayesha — Réussi DELF A1',
  'তাসনিম — DELF B1 পাস',
  'Tasnim — Réussi DELF B1',
  'সায়েম — DELF B2 পাস',
  'Sayem — Réussi DELF B2',
];

// TODO: Remplacez "image" par le chemin de vos vraies captures d'écran
// d'avis étudiants (ex: '/reviews/rahim.jpg' placé dans le dossier public/).
const reviews = [
  { name: 'Rahim Ahmed', batch: 'Batch 12', course: 'DELF B1', image: 'https://images.unsplash.com/photo-1633613286848-e6f43bded211?w=500&h=350&fit=crop' },
  { name: 'Fatima Begum', batch: 'Batch 10', course: 'DELF A2', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=500&h=350&fit=crop' },
  { name: 'Karim Uddin', batch: 'Batch 14', course: 'DELF B2', image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&h=350&fit=crop' },
  { name: 'Ayesha Khatun', batch: 'Batch 9', course: 'DELF A1', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=350&fit=crop' },
  { name: 'Tasnim Islam', batch: 'Batch 13', course: 'DELF B1', image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&h=350&fit=crop' },
  { name: 'Sayem Rahman', batch: 'Batch 11', course: 'DELF B2', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=350&fit=crop' },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const row1 = [...students, ...students];
  const row2 = [...students.slice(6), ...students.slice(0, 6), ...students.slice(6), ...students.slice(0, 6)];

  return (
    <section
      ref={sectionRef}
      className="section-dark overflow-hidden"
      style={{ padding: 'clamp(4rem, 8vw, 8rem) 0 4rem' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display font-semibold text-center"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {t('trust.title')}
        </motion.h2>
      </div>

      {/* Marquee Row 1 - Left */}
      <div className="relative mb-6">
        <div className="flex animate-marquee-left whitespace-nowrap" style={{ width: 'max-content' }}>
          {row1.map((name, i) => (
            <span key={`r1-${i}`} className="flex items-center mx-6">
              <span className="text-sm font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {name}
              </span>
              <span className="ml-6 text-[#D00000]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Right */}
      <div className="relative mb-14">
        <div className="flex animate-marquee-right whitespace-nowrap" style={{ width: 'max-content' }}>
          {row2.map((name, i) => (
            <span key={`r2-${i}`} className="flex items-center mx-6">
              <span className="text-sm font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {name}
              </span>
              <span className="ml-6 text-[#D00000]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Auto-scrolling Review Cards (right to left) */}
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-left" style={{ width: 'max-content' }}>
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={`review-${i}`}
              className="mx-3 flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: '280px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <img
                src={review.image}
                alt={`Avis de ${review.name}`}
                className="w-full object-cover"
                style={{ aspectRatio: '4/3' }}
                loading="lazy"
              />
              <div className="p-4">
                <p className="text-sm font-bold text-white">{review.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#D00000', color: 'white' }}
                  >
                    {review.batch}
                  </span>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                  >
                    {review.course}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
