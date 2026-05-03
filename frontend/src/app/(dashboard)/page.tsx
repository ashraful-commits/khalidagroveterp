'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  TrendingUp, Users, Package, ShoppingCart, 
  ArrowUpRight, ArrowDownRight, Activity, 
  Calendar, ChevronRight, Bell
} from 'lucide-react';
import { WelcomeCard } from '@/components/dashboard/WelcomeCard';
import { KPICard } from '@/components/ui/KPICard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export default function DashboardPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 pb-12">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <WelcomeCard />
        </div>
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-border shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl"><Activity size={24} /></div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">+12.5%</span>
            </div>
            <h3 className="text-xl font-syne font-bold text-text-primary">System Health</h3>
            <p className="text-sm text-text-muted mt-2">All production lines are operational. 4 nodes active.</p>
          </div>
          <button className="mt-8 flex items-center gap-2 text-sm font-bold text-primary group">
            View Analytics <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Monthly Revenue" 
          value="৳4,250,000" 
          trend="+8.2%" 
          trendType="up"
          icon={TrendingUp}
          color="blue"
        />
        <KPICard 
          title="Active MPOs" 
          value="142" 
          trend="+3" 
          trendType="up"
          icon={Users}
          color="purple"
        />
        <KPICard 
          title="Pending Orders" 
          value="28" 
          trend="-5.1%" 
          trendType="down"
          icon={ShoppingCart}
          color="orange"
        />
        <KPICard 
          title="Stock Items" 
          value="1,240" 
          trend="Stable" 
          trendType="neutral"
          icon={Package}
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        <div className="xl:col-span-2 space-y-6 md:space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-border shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-xl font-syne font-bold text-text-primary">Revenue Performance</h3>
                <p className="text-sm text-text-muted mt-1">Actual vs Target for the current quarter</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-xs font-bold bg-surface-2 rounded-xl text-text-secondary hover:bg-surface-3 transition-colors">Weekly</button>
                <button className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-xl shadow-lg shadow-primary/20">Monthly</button>
              </div>
            </div>
            <div className="h-[250px] md:h-[350px]">
              <SalesChart />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-border shadow-sm">
              <h4 className="font-syne font-bold text-lg mb-6">Production Queue</h4>
              <div className="space-y-6">
                {[
                  { name: 'Paracetamol 500mg', batch: 'B-290', status: 'In Progress', progress: 65 },
                  { name: 'Vitamin C Syrup', batch: 'B-291', status: 'Waiting', progress: 0 },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm font-bold text-text-primary">{item.name}</p>
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{item.batch}</p>
                      </div>
                      <span className="text-[10px] font-black text-primary uppercase">{item.status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-border shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-syne font-bold text-lg mb-4 text-text-primary">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'New Invoice', icon: ShoppingCart },
                    { label: 'Add Stock', icon: Package },
                    { label: 'Leave Req', icon: Calendar },
                    { label: 'Report', icon: Activity },
                  ].map((btn, i) => (
                    <button key={i} className="p-4 bg-surface-1 hover:bg-surface-2 border border-border rounded-2xl flex flex-col items-center gap-2 transition-all group">
                      <div className="p-2 bg-white rounded-lg text-text-muted group-hover:text-primary transition-colors">
                        {(() => {
                          const Icon = btn.icon;
                          if (!Icon) return null;
                          if (typeof Icon === 'function' || typeof Icon === 'object') {
                            return <Icon size={18} />;
                          }
                          return Icon;
                        })()}
                      </div>
                      <span className="text-[10px] font-bold text-text-secondary uppercase">{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <RecentActivity />
          
          <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
            <h4 className="font-syne font-bold text-lg mb-2">Need Support?</h4>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">Contact our system administrators for any technical issues or permissions.</p>
            <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              Open Support Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
