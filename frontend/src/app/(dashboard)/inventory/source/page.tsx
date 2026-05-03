'use client';

import { PackageSearch, Search, Filter, Download, Plus, AlertTriangle, HelpCircle, Archive } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function ItemSourcePage() {
  const isLoading = false;
  const data = [
    { id: 'SRC-5501', item: 'Active Ingredient A', source: 'Import - India', reliability: 'High', problems: 'None', lastUpdate: '2026-05-01' },
    { id: 'SRC-5502', item: 'Solvent B', source: 'Local - Dhaka', reliability: 'Medium', problems: 'Purity fluctuation', lastUpdate: '2026-05-02' },
  ];

  const columns = [
    { accessorKey: 'id', header: 'Source ID' },
    { accessorKey: 'item', header: 'Item Name' },
    { accessorKey: 'source', header: 'Origin / Source' },
    { accessorKey: 'reliability', header: 'Reliability' },
    { accessorKey: 'problems', header: 'Reported Issues' },
    { accessorKey: 'lastUpdate', header: 'Last Audit' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Item Source / Problems</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Trace material origins and log recurring quality or supply issues.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Sources" value="48" trend="Global & Local" trendType="neutral" icon={PackageSearch} color="blue" />
        <KPICard title="Critical Issues" value="3" trend="Action Required" trendType="down" icon={AlertTriangle} color="red" />
        <KPICard title="Untraced Items" value="12" trend="Need Info" trendType="neutral" icon={HelpCircle} color="orange" />
        <KPICard title="Reliability Rate" value="94%" trend="+2%" trendType="up" icon={Archive} color="green" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Source Traceability Ledger</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
