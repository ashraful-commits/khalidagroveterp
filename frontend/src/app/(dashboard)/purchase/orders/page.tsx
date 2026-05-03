'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Search, Filter, Download, Plus,
  Package, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';
import Link from 'next/link';

export default function PurchaseOrdersPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'PO Number' },
    { accessorKey: 'vendor', header: 'Vendor' },
    { accessorKey: 'amount', header: 'Total Amount' },
    { accessorKey: 'date', header: 'Order Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'PO-2026-001', vendor: 'Global Chemicals Ltd', amount: '৳850,000', date: '2026-04-28', status: 'Received' },
    { id: 'PO-2026-002', vendor: 'Pure Pack Solutions', amount: '৳120,000', date: '2026-05-01', status: 'Pending' },
    { id: 'PO-2026-003', vendor: 'Medilife Supplies', amount: '৳450,000', date: '2026-05-02', status: 'Approved' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Purchase Orders</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage procurement orders and track supplier deliveries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <Download size={16} /> Export POs
          </button>
          <Link href="/purchase/orders/new">
            <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              <Plus size={18} /> Create New PO
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Active Orders" 
          value="18" 
          trend="৳12.4M Total" 
          trendType="neutral"
          icon={ShoppingBag}
          color="blue"
        />
        <KPICard 
          title="Pending Approval" 
          value="5" 
          trend="Urgent" 
          trendType="down"
          icon={Clock}
          color="orange"
        />
        <KPICard 
          title="Received Today" 
          value="2" 
          trend="Synced" 
          trendType="up"
          icon={CheckCircle2}
          color="green"
        />
        <KPICard 
          title="Delayed Deliveries" 
          value="3" 
          trend="Follow-up req." 
          trendType="down"
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Order Ledger</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search POs or Vendors..." 
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
  );
}
