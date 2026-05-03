'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, Package, CheckCircle2, AlertCircle,
  Play, Pause, Plus, FileText,
  Search, Filter, Settings, Activity
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function ProductionPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'batch', header: 'Batch ID' },
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'stage', header: 'Current Stage' },
    { accessorKey: 'progress', header: 'Progress' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { batch: 'B-2024-402', product: 'Paracetamol Syrup', stage: 'Mixing', progress: '65%', status: 'Active' },
    { batch: 'B-2024-403', product: 'Vitamin C Tablet', stage: 'Granulation', progress: '20%', status: 'Delayed' },
    { batch: 'B-2024-398', product: 'Calcium Syrup', stage: 'Packaging', progress: '98%', status: 'Checking' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Factory Operations</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">BOM control, batch tracking, and real-time production analytics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <Activity size={16} /> Live Feed
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> New Production Order
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Active Batches" 
          value="14" 
          trend="+2" 
          trendType="up"
          icon={Play}
          color="blue"
        />
        <KPICard 
          title="Daily Output" 
          value="12,500 units" 
          trend="+8%" 
          trendType="up"
          icon={Package}
          color="green"
        />
        <KPICard 
          title="Quality Failures" 
          value="0" 
          trend="0.0%" 
          trendType="neutral"
          icon={CheckCircle2}
          color="green"
        />
        <KPICard 
          title="Resource Downtime" 
          value="42 mins" 
          trend="+12m" 
          trendType="down"
          icon={AlertCircle}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main Production Table */}
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
              <h3 className="text-xl font-syne font-bold text-text-primary">Live Production Stream</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search Batch ID..." 
                    className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="p-2 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-colors">
                  <Settings size={18} />
                </button>
              </div>
            </div>
            {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
          </div>
        </div>

        <div className="space-y-8">
          {/* BOM Quick Access */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-syne font-bold text-lg">Active BOM Sheets</h3>
              <FileText size={18} className="text-text-muted" />
            </div>
            <div className="space-y-4">
              {[
                { name: 'Paracetamol Liquid 500', version: 'v2.4', components: 8 },
                { name: 'Vitamin C Syrup', version: 'v1.1', components: 12 },
                { name: 'Saline Powder Pack', version: 'v3.0', components: 5 },
              ].map((bom, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-surface-1 hover:bg-surface-2 rounded-2xl transition-all group">
                  <div className="text-left">
                    <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{bom.name}</p>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{bom.components} Components • {bom.version}</p>
                  </div>
                  <FileText size={14} className="text-text-muted" />
                </button>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Manage BOMs
            </button>
          </div>

          {/* Efficiency Card */}
          <div className="bg-text-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            <h4 className="font-syne font-bold text-lg mb-2 text-primary">Line Efficiency</h4>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex-1">
                <div className="flex justify-between text-[10px] uppercase font-bold text-white/50 mb-1">
                  <span>Target: 95%</span>
                  <span>Actual: 82%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
            <p className="text-white/40 text-[10px] mt-4 leading-relaxed italic">
              Line 4 experiencing minor delays due to material synchronization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
