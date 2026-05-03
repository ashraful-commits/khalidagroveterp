'use client';

import { useEffect, useState } from 'react';
import { 
  PackageCheck, Search, Filter, Download, Plus,
  ClipboardList, CheckCircle2, AlertCircle, ShoppingBag
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function GRNPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'GRN Number' },
    { accessorKey: 'po', header: 'PO Ref' },
    { accessorKey: 'vendor', header: 'Vendor' },
    { accessorKey: 'date', header: 'Received Date' },
    { accessorKey: 'status', header: 'Quality Status' },
  ];

  const dummyData = [
    { id: 'GRN-9021', po: 'PO-2026-001', vendor: 'Global Chemicals', date: '2026-05-01', status: 'Passed' },
    { id: 'GRN-9022', po: 'PO-2026-003', vendor: 'Medilife', date: '2026-05-02', status: 'Pending QC' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Goods Receive (GRN)</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Record and verify incoming inventory from suppliers.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New GRN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Received Today" value="5" trend="Shipments" trendType="neutral" icon={ShoppingBag} color="blue" />
        <KPICard title="QC Passed" value="120" trend="Items" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="QC Failed" value="2" trend="Action Required" trendType="down" icon={AlertCircle} color="red" />
        <KPICard title="Total Value" value="৳4.8M" trend="Monthly" trendType="neutral" icon={ClipboardList} color="purple" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Receipt Ledger</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
