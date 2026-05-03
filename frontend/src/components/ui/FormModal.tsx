'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function FormModal({ open, onClose, title, subtitle, children, footer, size = 'md' }: FormModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn('relative w-full bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]', sizeMap[size])}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-border flex-shrink-0">
              <div>
                <h2 className="text-lg font-syne font-bold text-text-primary">{title}</h2>
                {subtitle && <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-2 rounded-lg transition-colors -mt-1 -mr-1">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
            {/* Footer */}
            {footer && <div className="p-6 border-t border-border flex justify-end gap-3 flex-shrink-0">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
