'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, DollarSign, 
  ShoppingCart, ArrowUpRight, Download,
  Filter, Calendar, Search
} from 'lucide-react';
import api from '@/lib/api';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function SalesDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Invoice #' },
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'date', header: 'Date' },
  ];

  const dummyData = [
    { id: 'INV-2024-001', customer: 'Lazz Pharma', amount: '৳45,000', status: 'Paid', date: '2024-05-01' },
    { id: 'INV-2024-002', customer: 'Model Pharmacy', amount: '৳12,500', status: 'Pending', date: '2024-05-02' },
    { id: 'INV-2024-003', customer: 'Popular Drug', amount: '৳8,900', status: 'Overdue', date: '2024-05-03' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Sales Ecosystem</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Real-time revenue and MPO performance analytics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-border rounded-2xl text-text-muted hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Daily Sales" 
          value="৳85,420" 
          trend="+12.5%" 
          trendType="up"
          icon={DollarSign}
          color="green"
        />
        <KPICard 
          title="Active Customers" 
          value="842" 
          trend="+24" 
          trendType="up"
          icon={Users}
          color="blue"
        />
        <KPICard 
          title="Avg. Order Value" 
          value="৳12,500" 
          trend="-2.1%" 
          trendType="down"
          icon={TrendingUp}
          color="purple"
        />
        <KPICard 
          title="Conversion Rate" 
          value="64.2%" 
          trend="Stable" 
          trendType="neutral"
          icon={ArrowUpRight}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Revenue Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-syne font-bold text-text-primary">Revenue Velocity</h3>
              <div className="flex bg-surface-1 p-1 rounded-xl">
                {['D', 'W', 'M', 'Y'].map((t) => (
                  <button key={t} className={`w-10 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${t === 'M' ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[350px]">
              <SalesChart />
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex items-center justify-between bg-surface-1/30">
              <h3 className="text-xl font-syne font-bold text-text-primary">Recent Transaction Stream</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Filter invoices..." 
                  className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
          </div>
        </div>

        <div className="space-y-8">
          {/* MPO Performance */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-syne font-bold text-lg">Top Regional Managers</h3>
              <TrendingUp size={18} className="text-primary" />
            </div>
            <div className="space-y-6">
              {[
                { name: 'Kariul Islam', region: 'Dhaka West', achievement: 92, amount: '৳4.2M' },
                { name: 'Sabbir Ahmed', region: 'Chittagong', achievement: 88, amount: '৳3.8M' },
                { name: 'Nabil Haque', region: 'Sylhet North', achievement: 75, amount: '৳2.9M' },
              ].map((mpo, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{mpo.name}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{mpo.region}</p>
                    </div>
                    <p className="text-sm font-black text-text-primary">{mpo.amount}</p>
                  </div>
                  <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${mpo.achievement}%` }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-surface-1 hover:bg-surface-2 border border-border rounded-xl text-xs font-bold text-text-secondary transition-all">
              View Detailed Rankings
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-600/20">
              <ShoppingCart size={24} className="mb-4 opacity-50" />
              <p className="text-xs font-bold uppercase opacity-70">Total Orders</p>
              <h4 className="text-xl font-black mt-1">1,482</h4>
            </div>
            <div className="bg-text-primary p-6 rounded-[2rem] text-white shadow-xl shadow-black/10">
              <Calendar size={24} className="mb-4 opacity-50" />
              <p className="text-xs font-bold uppercase opacity-70">Schedules</p>
              <h4 className="text-xl font-black mt-1">12</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
