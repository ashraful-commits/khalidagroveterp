'use client';

import { useEffect, useState } from 'react';
import { 
  Factory, Search, Filter, Download, Plus,
  FlaskConical, Package, Play, CheckCircle2
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function ProductionEntryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Entry ID' },
    { accessorKey: 'batch', header: 'Batch Ref' },
    { accessorKey: 'stage', header: 'Process Stage' },
    { accessorKey: 'inputQty', header: 'Input Qty' },
    { accessorKey: 'outputQty', header: 'Yield Qty' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'ENT-8801', batch: 'BATCH-4401', stage: 'Mixing', inputQty: '500kg', outputQty: '495kg', status: 'Completed' },
    { id: 'ENT-8802', batch: 'BATCH-4402', stage: 'Packing', inputQty: '10k Units', outputQty: '9.8k Units', status: 'Running' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Production Entry</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Record live production inputs, mixing stages, and packaging yields.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Live Mixing" value="3" trend="Batches" trendType="neutral" icon={FlaskConical} color="purple" />
        <KPICard title="Packing Yield" value="98.5%" trend="+0.5%" trendType="up" icon={Package} color="green" />
        <KPICard title="Active Orders" value="12" trend="Running" trendType="neutral" icon={Play} color="blue" />
        <KPICard title="Total Output" value="850k" trend="Units" trendType="neutral" icon={Factory} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Process History</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
