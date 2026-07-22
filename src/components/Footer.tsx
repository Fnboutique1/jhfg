import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

// TikTok isn't part of lucide-react, so we use a small inline glyph instead.
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6 5.82c-.94-.85-1.5-2.06-1.55-3.41h-3.05v13.02c0 1.62-1.32 2.94-2.95 2.94a2.95 2.95 0 01-2.95-2.94 2.95 2.95 0 012.95-2.95c.28 0 .55.04.8.11v-3.1a6.1 6.1 0 00-.8-.05A6.05 6.05 0 003 15.43a6.05 6.05 0 006.05 6.04 6.05 6.05 0 006.05-6.04V9.01a8.16 8.16 0 004.9 1.63V7.6a4.85 4.85 0 01-3.4-1.78z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/share/1c5MsXZj2t/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/fn_formation?igsh=cm5jZW5sbXh4am92', label: 'Instagram' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@fnformation', label: 'TikTok' },
  { icon: Youtube, href: 'https://www.youtube.com/@FNFormation-l3b', label: 'YouTube' },
];

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/courses', label: t('nav.courses') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/portal', label: t('nav.portal') },
  ];

  return (
    <footer style={{ backgroundColor: '#0F2A1D' }} className="text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12"
        >
          {/* Column 1 - Brand */}
          <div>
            <Link to="/">
              <img
                src="logo.jpg"
                alt="FN Formation"
                className="h-14 w-auto rounded-md mb-4"
              />
            </Link>
            <p className="text-sm italic font-bold mb-6 text-white">
              {t('footer.tagline')}
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <a
                href="mailto:contact@fnformation.com"
                className="flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity text-white"
              >
                <Mail size={16} />
                contact@fnformation.com
              </a>
              <a
                href="tel:+33751326118"
                className="flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity text-white"
              >
                <Phone size={16} />
                +33 7 51 32 61 18
              </a>
            </div>

            {/* Social Media */}
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase mb-3 text-white">
              {t('footer.social')}
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase mb-6 text-white">
              {t('footer.nav')}
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-bold transition-opacity hover:opacity-80 text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase mb-6 text-white">
              {t('footer.legal')}
            </h4>
            <div className="flex flex-col gap-2 text-sm font-bold text-white">
              <p>{t('footer.siret')}</p>
              <p>{t('footer.tva')}</p>
              <p>{t('footer.phone')}</p>
              <a
                href="mailto:contact@fnformation.com"
                className="hover:opacity-80 transition-opacity"
              >
                contact@fnformation.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
        >
          <p className="text-sm font-bold text-white">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-sm font-bold text-white">
            <span className="cursor-pointer hover:opacity-80 transition-opacity">
              {t('footer.privacy')}
            </span>
            <span className="text-white/30">|</span>
            <span className="cursor-pointer hover:opacity-80 transition-opacity">
              {t('footer.legal2')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
