import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function WelcomeCard() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="relative bg-text-primary rounded-[2.5rem] p-6 md:p-10 overflow-hidden group min-h-[280px] flex flex-col justify-center">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px] -ml-16 -mb-16" />

      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-xs font-bold mb-6"
        >
          <Sparkles size={14} className="text-primary" />
          <span>System Status: Optimal</span>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black text-white leading-tight">
          Welcome back,<br />
          <span className="text-primary">{user?.name || 'Administrator'}</span>
        </h1>
        
        <p className="text-white/50 mt-4 max-w-md text-xs md:text-sm leading-relaxed">
          The AgroVet ERP system is synchronized. You have 4 pending approvals and 2 low-stock alerts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
            View Reports <ArrowRight size={18} />
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-2xl font-bold text-sm backdrop-blur-md transition-all">
            Settings
          </button>
        </div>
      </div>

      {/* Decorative Icon */}
      <div className="absolute right-12 bottom-12 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles size={120} className="text-white" />
      </div>
    </div>
  );
}
