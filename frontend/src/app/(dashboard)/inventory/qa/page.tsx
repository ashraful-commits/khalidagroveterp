'use client';

import { useEffect, useState } from 'react';
import { 
  ShieldCheck, Search, Filter, Download, Plus,
  ClipboardCheck, AlertCircle, CheckCircle2, FlaskConical
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function QAManagementPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Test ID' },
    { accessorKey: 'batch', header: 'Batch Ref' },
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'parameter', header: 'Test Parameter' },
    { accessorKey: 'result', header: 'Result' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'QA-101', batch: 'BATCH-4401', product: 'Paracetamol', parameter: 'Purity Level', result: '99.8%', status: 'Passed' },
    { id: 'QA-102', batch: 'BATCH-4402', product: 'Vitamin C', parameter: 'Moisture', result: '2.5%', status: 'Pending' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Quality Assurance (QA)</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage lab tests, quality inspections, and batch clearance.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Test Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Lab Tests" value="15" trend="Active" trendType="neutral" icon={FlaskConical} color="blue" />
        <KPICard title="Passed" value="124" trend="98%" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="Failed" value="2" trend="Critical" trendType="down" icon={AlertCircle} color="red" />
        <KPICard title="Certificates" value="45" trend="Issued" trendType="neutral" icon={ShieldCheck} color="purple" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">QA Inspection Ledger</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
