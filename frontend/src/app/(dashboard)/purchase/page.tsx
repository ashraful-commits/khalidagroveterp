'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, Users, Clock, TrendingDown,
  Plus, Download, CheckCircle, Search,
  Filter, FileStack, Truck
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function PurchasePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'PO Reference' },
    { accessorKey: 'vendor', header: 'Vendor' },
    { accessorKey: 'amount', header: 'Total Value' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'date', header: 'Order Date' },
  ];

  const dummyData = [
    { id: 'PO-2024-001', vendor: 'Global Chemicals Ltd', amount: '৳145,000', status: 'Approved', date: '2024-05-01' },
    { id: 'PO-2024-002', vendor: 'Sintec Packaging', amount: '৳12,500', status: 'Pending', date: '2024-05-02' },
    { id: 'PO-2024-003', vendor: 'Bayer Crops', amount: '৳88,900', status: 'Delivered', date: '2024-05-03' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Procurement Hub</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage raw material sourcing, vendors, and supply chain logistics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <FileStack size={16} /> Requisitions
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> Create Purchase Order
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Active Orders" 
          value="24" 
          trend="+4" 
          trendType="up"
          icon={ShoppingCart}
          color="blue"
        />
        <KPICard 
          title="Vendor Rating" 
          value="4.8/5.0" 
          trend="Top Tier" 
          trendType="neutral"
          icon={Users}
          color="green"
        />
        <KPICard 
          title="Pending Deliveries" 
          value="8" 
          trend="In Transit" 
          trendType="neutral"
          icon={Truck}
          color="orange"
        />
        <KPICard 
          title="Procurement Cost" 
          value="৳2.4M" 
          trend="-5.2%" 
          trendType="down"
          icon={TrendingDown}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main PO Table */}
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
              <h3 className="text-xl font-syne font-bold text-text-primary">Purchase Order History</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="PO ID or Vendor..." 
                    className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="p-2 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-colors">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
          </div>
        </div>

        <div className="space-y-8">
          {/* Vendor performance */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <h3 className="font-syne font-bold text-lg mb-6">Top Suppliers</h3>
            <div className="space-y-6">
              {[
                { name: 'Global Chemicals', leadTime: '4 days', reliability: 98 },
                { name: 'Sintec Packaging', leadTime: '7 days', reliability: 85 },
                { name: 'Bayer Crops', leadTime: '12 days', reliability: 92 },
              ].map((vendor, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{vendor.name}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Lead Time: {vendor.leadTime}</p>
                    </div>
                    <span className="text-xs font-black text-text-primary">{vendor.reliability}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${vendor.reliability}%` }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-text-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-10 -mt-10 blur-2xl" />
            <h4 className="font-syne font-bold text-lg mb-2">Approval Queue</h4>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">You have 3 purchase requisitions waiting for your digital signature.</p>
            <div className="flex items-center gap-3">
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Review Now
              </button>
              <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                <CheckCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
