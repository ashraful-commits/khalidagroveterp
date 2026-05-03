'use client';

import { useEffect, useState } from 'react';
import { 
  RotateCcw, Search, Filter, Download, Plus,
  Package, CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function SalesReturnsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Return ID' },
    { accessorKey: 'invoice', header: 'Invoice Ref' },
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'amount', header: 'Credit Note' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'SR-2026-001', invoice: 'INV-8821', customer: 'Lazz Pharma', amount: '৳5,200', status: 'Approved' },
    { id: 'SR-2026-002', invoice: 'INV-8822', customer: 'MediCare', amount: '৳1,500', status: 'Pending' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Sales Returns</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Process product returns and manage credit notes.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Record Return
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Returns" value="৳12.5k" trend="Monthly" trendType="neutral" icon={RotateCcw} color="blue" />
        <KPICard title="Pending QC" value="8" trend="Incoming" trendType="neutral" icon={Package} color="orange" />
        <KPICard title="Processed" value="45" trend="92%" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="High Rejection" value="2" trend="Review req." trendType="down" icon={AlertCircle} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Returns Ledger</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
