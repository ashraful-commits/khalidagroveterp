'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, Wrench, DollarSign, AlertTriangle, 
  Plus, Search, Filter, Download,
  Activity, ClipboardList
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function AssetsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Asset ID' },
    { accessorKey: 'name', header: 'Asset Name' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'value', header: 'Book Value' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'AST-F-001', name: 'Automatic Mixing Machine', category: 'Factory', value: '৳4,500,000', status: 'Active' },
    { id: 'AST-V-042', name: 'Distribution Van #4', category: 'Vehicle', value: '৳1,200,000', status: 'Maintenance' },
    { id: 'AST-O-102', name: 'HQ Server Cluster', category: 'IT', value: '৳850,000', status: 'Active' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Fixed Assets</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Tracking lifecycle, depreciation, and maintenance schedules.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <ClipboardList size={16} /> Asset Register
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> Register New Asset
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Assets" 
          value="142" 
          trend="82% Lifecycle" 
          trendType="neutral"
          icon={Box}
          color="blue"
        />
        <KPICard 
          title="Total Asset Value" 
          value="৳42.8M" 
          trend="-2.1%" 
          trendType="down"
          icon={DollarSign}
          color="green"
        />
        <KPICard 
          title="Maintenance Due" 
          value="4" 
          trend="Critical" 
          trendType="down"
          icon={Wrench}
          color="orange"
        />
        <KPICard 
          title="Depreciation Rate" 
          value="12.4%" 
          trend="Annual" 
          trendType="neutral"
          icon={Activity}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main Asset Table */}
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
              <h3 className="text-xl font-syne font-bold text-text-primary">Asset Ledger</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by ID or Name..." 
                    className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="p-2 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
            {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
          </div>
        </div>

        <div className="space-y-8">
          {/* Maintenance Summary */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <h3 className="font-syne font-bold text-lg mb-6">Maintenance Logs</h3>
            <div className="space-y-6">
              {[
                { name: 'Mixing Unit 01', date: 'In 2 days', urgency: 'High' },
                { name: 'Distribution Van 04', date: 'Tomorrow', urgency: 'Immediate' },
                { name: 'Labeling Machine', date: 'Completed', urgency: 'None' },
              ].map((log, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{log.name}</p>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${log.urgency === 'Immediate' ? 'bg-red-100 text-red-600' : 'bg-surface-2 text-text-muted'}`}>{log.urgency}</span>
                  </div>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{log.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Report Card */}
          <div className="bg-text-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-10 -mb-10 blur-2xl" />
            <h4 className="font-syne font-bold text-lg mb-2">Annual Audit</h4>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">The physical asset verification audit for 2026 is due in 12 days.</p>
            <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Generate Audit List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
