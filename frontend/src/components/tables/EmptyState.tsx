import { motion } from 'framer-motion';
import { SearchX, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mb-6 text-text-muted">
        <SearchX size={40} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-syne font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-xs leading-relaxed mb-8">{description}</p>
      
      {actionLabel && (
        <button 
          onClick={onAction}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
        >
          <Plus size={18} /> {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
