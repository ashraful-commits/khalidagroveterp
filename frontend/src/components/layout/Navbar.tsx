'use client';

import { Bell, Search, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  // Very basic breadcrumb generator based on pathname
  const generateBreadcrumb = () => {
    if (pathname === '/') return 'Dashboard';
    const paths = pathname.split('/').filter(Boolean);
    return paths.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ');
  };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-text-secondary">
          <span className="text-text-muted">Home / </span> {generateBreadcrumb()}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-1.5 bg-surface-3 border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
          />
        </div>
        
        <button className="relative p-2 text-text-secondary hover:bg-surface-3 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
        </button>

        <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
