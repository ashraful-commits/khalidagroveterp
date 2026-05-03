'use client';

import { ReactNode } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumb, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-1.5">
            <Link href="/" className="hover:text-primary transition-colors">
              <Home className="w-3.5 h-3.5" />
            </Link>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
                ) : (
                  <span className="text-text-secondary font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-syne font-bold text-text-primary">{title}</h1>
        {subtitle && <p className="text-text-secondary mt-0.5 text-sm">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
    </div>
  );
}
