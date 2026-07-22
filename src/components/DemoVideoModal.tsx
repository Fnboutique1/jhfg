import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface DemoVideoModalProps {
  open: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

export default function DemoVideoModal({ open, onClose, videoId, title }: DemoVideoModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[860px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 p-1 text-white"
              aria-label="Fermer"
            >
              <X size={28} />
            </button>
            <div className="youtube-container w-full rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
