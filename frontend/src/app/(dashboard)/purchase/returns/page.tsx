'use client';

import { useEffect, useState } from 'react';
import { 
  RotateCcw, Search, Filter, Download, Plus,
  Package, CheckCircle2, AlertCircle, ShoppingBag
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function PurchaseReturnsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Return ID' },
    { accessorKey: 'po', header: 'PO Ref' },
    { accessorKey: 'vendor', header: 'Vendor' },
    { accessorKey: 'amount', header: 'Refund Value' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'PR-2026-001', po: 'PO-2026-001', vendor: 'Global Chemicals', amount: '৳12,000', status: 'Completed' },
    { id: 'PR-2026-002', po: 'PO-2026-002', vendor: 'Pure Pack', amount: '৳3,500', status: 'Pending Approval' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Purchase Returns</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Handle supplier returns and manage refund claims.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Record Return
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Returns" value="12" trend="Monthly" trendType="neutral" icon={RotateCcw} color="blue" />
        <KPICard title="Pending Refund" value="৳25.4k" trend="3 Claims" trendType="neutral" icon={ShoppingBag} color="orange" />
        <KPICard title="Refunded" value="৳85k" trend="+5%" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="Rejected" value="1" trend="Follow-up" trendType="down" icon={AlertCircle} color="red" />
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
