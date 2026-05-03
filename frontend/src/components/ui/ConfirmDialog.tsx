'use client';

import { AlertTriangle, Trash2, Info, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  confirmLabel?: string;
  loading?: boolean;
}

const variants = {
  danger:  { icon: Trash2,        iconBg: 'bg-red-100',    iconColor: 'text-red-600',    btn: 'bg-red-600 hover:bg-red-700' },
  warning: { icon: AlertTriangle, iconBg: 'bg-amber-100',  iconColor: 'text-amber-600',  btn: 'bg-amber-600 hover:bg-amber-700' },
  info:    { icon: Info,          iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   btn: 'bg-blue-600 hover:bg-blue-700' },
  success: { icon: CheckCircle,   iconBg: 'bg-green-100',  iconColor: 'text-green-600',  btn: 'bg-primary hover:bg-primary-dark' },
};

export function ConfirmDialog({ open, onClose, onConfirm, title, message, variant = 'danger', confirmLabel = 'Confirm', loading }: ConfirmDialogProps) {
  const v = variants[variant];
  const Icon = v.icon;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center"
          >
            <div className={cn('w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4', v.iconBg)}>
              <Icon className={cn('w-7 h-7', v.iconColor)} />
            </div>
            <h3 className="text-lg font-syne font-bold text-text-primary mb-2">{title}</h3>
            <p className="text-sm text-text-secondary mb-6">{message}</p>
            <div className="flex gap-3">
              <button onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-2 transition-colors">
                Cancel
              </button>
              <button onClick={onConfirm} disabled={loading}
                className={cn('flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-60', v.btn)}>
                {loading ? 'Processing...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
