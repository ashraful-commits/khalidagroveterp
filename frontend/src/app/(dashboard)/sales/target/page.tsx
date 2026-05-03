'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Users, TrendingUp, Award, 
  BarChart, Calendar, ChevronRight, Plus, Filter, Search 
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { AmountDisplay } from '@/components/ui/AmountDisplay';

export default function SalesTargetsPage() {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for sales targets
    setTargets([
      { name: 'Rahim Uddin', role: 'MPO', target: 500000, achievement: 420000, area: 'Dhaka West' },
      { name: 'Karim Ahmed', role: 'MPO', target: 450000, achievement: 480000, area: 'Chittagong South' },
      { name: 'Sufia Begum', role: 'AM', target: 2000000, achievement: 1850000, area: 'Sylhet Region' },
    ] as any);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Sales Targets" 
        subtitle="Track field force performance and regional goals"
        breadcrumb={[{ label: 'Sales', href: '/sales' }, { label: 'Targets' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Set New Target
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Target size={20} /></div>
            <span className="text-xs font-bold text-green-600">+5.2% vs LW</span>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase">Global Target</p>
          <h4 className="text-2xl font-syne font-bold text-text-primary mt-1">৳12,500,000</h4>
          <div className="mt-4 h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[72%]" />
          </div>
          <p className="text-[10px] text-text-muted mt-2">72% of monthly goal reached</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Award size={20} /></div>
            <span className="text-xs font-bold text-primary">Top Performer</span>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase">Leaderboard</p>
          <h4 className="text-xl font-syne font-bold text-text-primary mt-1">Karim Ahmed</h4>
          <p className="text-[10px] text-text-muted mt-1">106.6% Achievement</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase">Avg Achievement</p>
          <h4 className="text-2xl font-syne font-bold text-text-primary mt-1">84.5%</h4>
          <p className="text-[10px] text-text-muted mt-2">Across 42 active MPOs</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-syne font-bold text-lg text-text-primary">Field Force Targets</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-surface-2 rounded-lg transition-colors"><Filter size={18} className="text-text-muted" /></button>
            <button className="p-2 hover:bg-surface-2 rounded-lg transition-colors"><Search size={18} className="text-text-muted" /></button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {targets.map((t: any, i) => {
            const percentage = Math.min((t.achievement / t.target) * 100, 100);
            return (
              <div key={i} className="p-6 hover:bg-surface-1 transition-colors flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-text-secondary font-bold">
                  {t.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-text-primary">{t.name}</h4>
                      <p className="text-xs text-text-muted">{t.role} • {t.area}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-text-primary">৳{t.achievement.toLocaleString()} / ৳{t.target.toLocaleString()}</p>
                      <p className={`text-xs font-bold ${percentage >= 100 ? 'text-green-600' : 'text-primary'}`}>
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full ${percentage >= 100 ? 'bg-green-500' : 'bg-primary'}`}
                    />
                  </div>
                </div>
                <button className="p-2 hover:bg-surface-2 rounded-full transition-colors">
                  <ChevronRight size={20} className="text-text-muted" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


