'use client';

import { cn } from '@/lib/utils';
import { Package, Search, FileText } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  type?: 'default' | 'search' | 'data';
  className?: string;
}

export function EmptyState({ icon, title, description, action, type = 'default', className }: EmptyStateProps) {
  const defaultIcon = type === 'search' ? <Search className="w-10 h-10" /> :
    type === 'data' ? <FileText className="w-10 h-10" /> :
    <Package className="w-10 h-10" />;

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center px-4', className)}>
      <div className="w-20 h-20 rounded-full bg-surface-3 flex items-center justify-center text-text-muted mb-4">
        {icon || defaultIcon}
      </div>
      <h3 className="text-base font-syne font-bold text-text-secondary mb-1.5">
        {title || 'No data found'}
      </h3>
      <p className="text-sm text-text-muted max-w-xs mb-5">
        {description || 'There are no records to display at the moment.'}
      </p>
      {action}
    </div>
  );
}
