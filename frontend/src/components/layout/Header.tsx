'use client';

import { Bell, Search, Menu, User, Settings as SettingsIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, setLanguage } from '@/store/slices/uiSlice';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const language = useSelector((state: RootState) => (state as any).ui.language);

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 hover:bg-surface-2 rounded-lg transition-colors text-text-secondary"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface-2 rounded-lg border border-border w-64">
          <Search className="w-4 h-4 text-text-muted" />
          <input 
            placeholder="Search everything..." 
            className="bg-transparent border-none text-sm focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button className="p-2 hover:bg-surface-2 rounded-lg transition-colors text-text-secondary relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
        </button>
        <button className="hidden sm:block p-2 hover:bg-surface-2 rounded-lg transition-colors text-text-secondary">
          <SettingsIcon className="w-5 h-5" />
        </button>
        
        <div className="flex bg-surface-2 p-1 rounded-lg border border-border scale-90 sm:scale-100">
          <button 
            onClick={() => dispatch(setLanguage('en'))}
            className={cn(
              "px-2 py-1 text-[10px] font-bold rounded-md transition-all",
              language === 'en' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
            )}
          >
            EN
          </button>
          <button 
            onClick={() => dispatch(setLanguage('bn'))}
            className={cn(
              "px-2 py-1 text-[10px] font-bold rounded-md transition-all",
              language === 'bn' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
            )}
          >
            BN
          </button>
        </div>

        <div className="h-8 w-px bg-border mx-0 md:mx-1" />

        <div className="flex items-center gap-2 md:gap-3 ml-1 cursor-pointer hover:bg-surface-2 p-1 md:p-1.5 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-text-primary leading-none">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-text-muted mt-1 leading-none font-medium uppercase tracking-wider">{user?.role || 'Super Admin'}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary border border-primary/20">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
