import { useState } from 'react';
import { Lock, Play, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

// Mock data for video recordings
const recordings = [
  { id: 1, title: 'DELF A1 — Class 1: Introduction', level: 'DELF A1', date: '2026-07-10', duration: '45 min', thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop' },
  { id: 2, title: 'DELF A1 — Class 2: Les Salutations', level: 'DELF A1', date: '2026-07-12', duration: '50 min', thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop' },
  { id: 3, title: 'DELF A2 — Class 1: La Famille', level: 'DELF A2', date: '2026-07-11', duration: '55 min', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop' },
  { id: 4, title: 'DELF B1 — Class 1: Les Voyages', level: 'DELF B1', date: '2026-07-13', duration: '60 min', thumbnail: 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?w=400&h=250&fit=crop' },
  { id: 5, title: 'DELF B2 — Class 1: L\'Environnement', level: 'DELF B2', date: '2026-07-14', duration: '65 min', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop' },
  { id: 6, title: 'DELF A1 — Class 3: Les Nombres', level: 'DELF A1', date: '2026-07-14', duration: '40 min', thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop' },
];

const levels = ['All', 'DELF A1', 'DELF A2', 'DELF B1', 'DELF B2'];

export default function PortalPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const isLoggedIn = !!user;
  const [activeLevel, setActiveLevel] = useState('All');

  const handleSignOut = async () => {
    await signOut();
    navigate('/connection');
  };

  const filteredRecordings = activeLevel === 'All'
    ? recordings
    : recordings.filter(r => r.level === activeLevel);

  if (loading) {
    return (
      <main>
        <section className="section-light" style={{ paddingTop: 'calc(72px + 6rem)', paddingBottom: '6rem' }}>
          <p className="text-center" style={{ color: '#6B5B4F' }}>...</p>
        </section>
      </main>
    );
  }

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
              {t('nav.portal')}
            </p>
            <h1
              className="font-display font-semibold mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                letterSpacing: '-0.01em',
              }}
            >
              {t('portal.title')}
            </h1>
            <p className="text-base max-w-[640px] mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('portal.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section
        className="section-light"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {!isLoggedIn ? (
            /* Login Required */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card-light max-w-[500px] mx-auto text-center py-16"
            >
              <Lock size={56} className="mx-auto mb-6" style={{ color: '#2D6A4F' }} />
              <h2
                className="font-display font-semibold mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#1A1A1A' }}
              >
                {t('portal.login.title')}
              </h2>
              <p className="text-sm mb-8" style={{ color: '#6B5B4F' }}>
                {t('portal.login.desc')}
              </p>
              <Link to="/connection" className="btn-primary">
                {t('portal.login.btn')}
              </Link>
            </motion.div>
          ) : (
            /* Video Library */
            <div>
              {/* Welcome bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <p className="text-sm" style={{ color: '#6B5B4F' }}>
                  {t('portal.welcome')} <span className="font-semibold" style={{ color: '#1A1A1A' }}>{user?.email}</span>
                </p>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: '#D00000' }}
                >
                  <LogOut size={16} />
                  {t('portal.signout')}
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeLevel === level
                        ? 'text-white'
                        : 'border hover:border-[#1B4332]'
                    }`}
                    style={{
                      backgroundColor: activeLevel === level ? '#1B4332' : 'transparent',
                      borderColor: activeLevel === level ? '#1B4332' : 'rgba(27,67,50,0.2)',
                      color: activeLevel === level ? 'white' : '#6B5B4F',
                    }}
                  >
                    {level === 'All' ? t('portal.all') : level}
                  </button>
                ))}
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecordings.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-light overflow-hidden cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="relative -mx-8 -mt-8 mb-4 overflow-hidden" style={{ aspectRatio: '16/10' }}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                        >
                          <Play size={24} style={{ color: '#1B4332', marginLeft: '2px' }} />
                        </div>
                      </div>
                      {/* Duration Badge */}
                      <span
                        className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                      >
                        {video.duration}
                      </span>
                    </div>

                    {/* Level Badge */}
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider mb-2"
                      style={{ backgroundColor: 'rgba(208,0,0,0.1)', color: '#D00000' }}
                    >
                      {video.level}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                      {video.title}
                    </h3>

                    {/* Date */}
                    <p className="text-xs" style={{ color: '#6B5B4F' }}>
                      {video.date}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
