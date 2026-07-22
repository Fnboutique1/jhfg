import { useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

// IMPORTANT: Remplacez ce numéro par votre numéro WhatsApp professionnel
// (format international, sans "+" ni espaces).
const WHATSAPP_NUMBER = '33751326118';

interface OrderFormModalProps {
  open: boolean;
  onClose: () => void;
  courseName: string;
  formTitle?: string;
  hideCourseField?: boolean;
}

export default function OrderFormModal({ open, onClose, courseName, formTitle, hideCourseField }: OrderFormModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = hideCourseField
      ? `Bonjour, ${courseName}\nNom: ${name}\nTéléphone: ${phone}\nEmail: ${email}`
      : `Bonjour, je souhaite acheter le cours: ${courseName}\n` +
        `Nom: ${name}\n` +
        `Téléphone: ${phone}\n` +
        `Email: ${email}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[440px] rounded-2xl p-6 sm:p-8 relative"
            style={{ backgroundColor: '#FAF7F2' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full transition-colors"
              style={{ color: '#6B5B4F' }}
              aria-label="Fermer"
            >
              <X size={22} />
            </button>

            <h3 className="font-display font-semibold mb-1" style={{ fontSize: '1.5rem', color: '#1A1A1A' }}>
              {formTitle || t('form.buy.title')}
            </h3>
            <p className="text-sm mb-6" style={{ color: '#6B5B4F' }}>
              {courseName}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#1A1A1A' }}>
                  {t('form.name')}
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                  style={{ borderColor: 'rgba(27,67,50,0.2)', backgroundColor: 'white' }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#1A1A1A' }}>
                  {t('form.phone')}
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                  style={{ borderColor: 'rgba(27,67,50,0.2)', backgroundColor: 'white' }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#1A1A1A' }}>
                  {t('form.email')}
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                  style={{ borderColor: 'rgba(27,67,50,0.2)', backgroundColor: 'white' }}
                />
              </div>
              {!hideCourseField && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#1A1A1A' }}>
                    {t('form.course')}
                  </label>
                  <input
                    disabled
                    type="text"
                    value={courseName}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm"
                    style={{ borderColor: 'rgba(27,67,50,0.2)', backgroundColor: '#F0EBE2', color: '#6B5B4F' }}
                  />
                </div>
              )}

              <button type="submit" className="btn-whatsapp w-full mt-2">
                <WhatsAppIcon size={18} />
                {t('form.submit')}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
