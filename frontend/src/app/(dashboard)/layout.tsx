'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Unifying the state access with the fix applied in Sidebar/Header
  const isOpen = useSelector((state: RootState) => (state as any).ui.isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-surface-1">
      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out min-h-screen",
        isOpen ? "md:pl-72" : "md:pl-20"
      )}>
        <Header />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 xl:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="py-6 px-10 border-t border-border text-center">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
            AgroVet ERP © 2026 • Enterprise Quality Excellence
          </p>
        </footer>
      </div>
    </div>
  );
}
