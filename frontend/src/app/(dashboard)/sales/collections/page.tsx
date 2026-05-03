'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, Search, Filter, Download, Plus,
  CreditCard, Banknote, History, Wallet
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function CollectionsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Receipt ID' },
    { accessorKey: 'customer', header: 'Customer Name' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'method', header: 'Method' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'RCP-8821', customer: 'Dhaka Pharmacy', amount: '৳45,000', method: 'Bank Transfer', date: '2026-05-01', status: 'Confirmed' },
    { id: 'RCP-8822', customer: 'Lazz Pharma', amount: '৳120,000', method: 'Cheque', date: '2026-05-02', status: 'Pending' },
    { id: 'RCP-8823', customer: 'Life Care Pharmacy', amount: '৳15,000', method: 'Cash', date: '2026-05-03', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Payment Collections</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Record and track customer payments and outstanding balances.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <History size={16} /> Collection Logs
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> New Collection
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Today's Collection" 
          value="৳1.2M" 
          trend="+15%" 
          trendType="up"
          icon={DollarSign}
          color="green"
        />
        <KPICard 
          title="Monthly Target" 
          value="৳18.5M" 
          trend="65% Reached" 
          trendType="neutral"
          icon={Wallet}
          color="blue"
        />
        <KPICard 
          title="Pending Cheques" 
          value="12" 
          trend="৳4.2M" 
          trendType="neutral"
          icon={CreditCard}
          color="orange"
        />
        <KPICard 
          title="Cash in Hand" 
          value="৳850k" 
          trend="Synced" 
          trendType="neutral"
          icon={Banknote}
          color="purple"
        />
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Recent Receipts</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search by ID or Customer..." 
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
  );
}
