'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Warehouse, AlertTriangle, 
  BarChart3, Plus, RefreshCw, Layers,
  Search, Filter, Download
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function InventoryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'name', header: 'Product Name' },
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'warehouse', header: 'Warehouse' },
    { accessorKey: 'stock', header: 'Current Stock' },
    { accessorKey: 'value', header: 'Total Value' },
  ];

  const dummyData = [
    { name: 'Calcium Carbonate', sku: 'RAW-042', warehouse: 'Factory WH-1', stock: 450, value: '৳22,500' },
    { name: 'Polymyxin B', sku: 'API-011', warehouse: 'Main Store', stock: 12, value: '৳145,000' },
    { name: 'Finished Syrup-A', sku: 'FIN-902', warehouse: 'Distribution Ctr', stock: 1200, value: '৳600,000' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Stock Ecosystem</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">End-to-end visibility of raw materials and finished goods.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <RefreshCw size={16} /> Sync Warehouse
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> Add Stock Item
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Inventory Value" 
          value="৳18.4M" 
          trend="+4.2%" 
          trendType="up"
          icon={BarChart3}
          color="blue"
        />
        <KPICard 
          title="Warehouse Utilization" 
          value="74.2%" 
          trend="+2.1%" 
          trendType="up"
          icon={Warehouse}
          color="green"
        />
        <KPICard 
          title="Low Stock Alerts" 
          value="18" 
          trend="Critical" 
          trendType="down"
          icon={AlertTriangle}
          color="red"
        />
        <KPICard 
          title="Stock Transfers" 
          value="4" 
          trend="2 Pending" 
          trendType="neutral"
          icon={Layers}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main Stock Table */}
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
              <h3 className="text-xl font-syne font-bold text-text-primary">Stock Master Ledger</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search SKU or Name..." 
                    className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="p-2 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-colors">
                  <Filter size={18} />
                </button>
                <button className="p-2 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
            {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
          </div>
        </div>

        <div className="space-y-8">
          {/* Warehouse breakdown */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <h3 className="font-syne font-bold text-lg mb-6">Warehouse Capacity</h3>
            <div className="space-y-8">
              {[
                { name: 'Factory WH-1', usage: 88, status: 'Near Capacity' },
                { name: 'Main Distribution Ctr', usage: 45, status: 'Optimal' },
                { name: 'Raw Material Store', usage: 62, status: 'Stable' },
              ].map((wh, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{wh.name}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{wh.status}</p>
                    </div>
                    <span className="text-sm font-black text-text-primary">{wh.usage}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${wh.usage}%` }}
                      className={`h-full ${wh.usage > 85 ? 'bg-red-500' : 'bg-green-500'}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-text-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-10 -mt-10 blur-2xl" />
            <h4 className="font-syne font-bold text-lg mb-2">Stock Audit</h4>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">Schedule a physical stock audit for verification.</p>
            <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Start Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
