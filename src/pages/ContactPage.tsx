import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import OrderFormModal from '@/components/OrderFormModal';

export default function ContactPage() {
  const { t } = useLanguage();
  const [chatFormOpen, setChatFormOpen] = useState(false);

  const contactMethods = [
    {
      icon: WhatsAppIcon,
      title: t('contact.whatsapp.title'),
      value: '+33 7 51 32 61 18',
      href: '#',
      isForm: true,
      btnText: t('contact.whatsapp.btn'),
      color: '#25D366',
    },
    {
      icon: Mail,
      title: t('contact.email.title'),
      value: 'contact@fnformation.com',
      href: 'mailto:contact@fnformation.com',
      color: '#2D6A4F',
    },
    {
      icon: Phone,
      title: t('contact.phone.title'),
      value: '+33 7 51 32 61 18',
      href: 'tel:+33751326118',
      color: '#2D6A4F',
    },
    {
      icon: MapPin,
      title: t('contact.address.title'),
      value: t('contact.address'),
      href: '#',
      color: '#2D6A4F',
    },
  ];

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
              {t('nav.contact')}
            </p>
            <h1
              className="font-display font-semibold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.01em',
              }}
            >
              {t('contact.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section
        className="section-light"
        style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left - Contact Methods */}
            <div className="flex flex-col gap-5">
              {contactMethods.map((method, i) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-light flex items-start gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${method.color}15` }}
                    >
                      <Icon size={22} style={{ color: method.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                        {method.title}
                      </h3>
                      {method.isForm ? (
                        <span className="text-sm" style={{ color: '#6B5B4F' }}>{method.value}</span>
                      ) : (
                        <a
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm transition-colors hover:opacity-80"
                          style={{ color: '#6B5B4F' }}
                        >
                          {method.value}
                        </a>
                      )}
                      {method.btnText && (
                        <div className="mt-3">
                          {method.isForm ? (
                            <button
                              onClick={() => setChatFormOpen(true)}
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-white transition-all duration-300 hover:opacity-90"
                              style={{ backgroundColor: method.color }}
                            >
                              <WhatsAppIcon size={14} />
                              {method.btnText}
                            </button>
                          ) : (
                            <a
                              href={method.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-white transition-all duration-300 hover:opacity-90"
                              style={{ backgroundColor: method.color }}
                            >
                              <WhatsAppIcon size={14} />
                              {method.btnText}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right - Quick WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card-light flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: '#1B4332' }}
            >
              <WhatsAppIcon size={48} className="mb-5" style={{ color: '#25D366' }} />
              <h3
                className="font-display font-semibold text-white mb-4"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
              >
                WhatsApp
              </h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {t('contact.quick')}
              </p>
              <button onClick={() => setChatFormOpen(true)} className="btn-whatsapp">
                <WhatsAppIcon size={18} />
                {t('contact.whatsapp.btn')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <OrderFormModal
        open={chatFormOpen}
        onClose={() => setChatFormOpen(false)}
        courseName="j'ai une question concernant vos cours DELF."
        formTitle={t('contact.whatsapp.btn')}
        hideCourseField
      />
    </main>
  );
}
