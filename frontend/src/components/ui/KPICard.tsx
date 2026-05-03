import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'orange' | 'green' | 'red';
}

const colorStyles = {
  blue: 'from-blue-500/20 to-blue-600/5 text-blue-600',
  purple: 'from-purple-500/20 to-purple-600/5 text-purple-600',
  orange: 'from-orange-500/20 to-orange-600/5 text-orange-600',
  green: 'from-green-500/20 to-green-600/5 text-green-600',
  red: 'from-red-500/20 to-red-600/5 text-red-600',
};

const iconBgStyles = {
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
};

export function KPICard({ title, value, trend, trendType, icon: Icon, color }: KPICardProps) {
  const renderIcon = (size: number, className?: string) => {
    if (!Icon) return null;
    // Check if Icon is a function (component) or a valid React element
    if (typeof Icon === 'function') {
      return <Icon size={size} className={className} />;
    }
    return Icon;
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-[2rem] border border-border shadow-sm group transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-2xl transition-colors", iconBgStyles[color])}>
          {renderIcon(24)}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full",
          trendType === 'up' ? "bg-green-50 text-green-600" : 
          trendType === 'down' ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-500"
        )}>
          {trendType === 'up' && <TrendingUp size={12} />}
          {trendType === 'down' && <TrendingDown size={12} />}
          {trendType === 'neutral' && <Minus size={12} />}
          {trend}
        </div>
      </div>
      
      <div>
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-syne font-black text-text-primary mt-1">{value}</h3>
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-border flex items-center justify-between">
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">Current Month</span>
        <button className="p-1 hover:bg-surface-1 rounded-lg transition-colors">
          {renderIcon(14, 'text-text-muted')}
        </button>
      </div>
    </motion.div>
  );
}
