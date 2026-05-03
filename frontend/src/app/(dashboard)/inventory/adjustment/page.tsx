'use client';

import { Settings, Search, Filter, Download, Plus, AlertTriangle, RefreshCcw, Database } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function StockAdjustmentPage() {
  const isLoading = false;
  const data = [
    { id: 'ADJ-9901', item: 'Paracetamol 500mg', type: 'Reduction', quantity: '-50 Units', reason: 'Damage during transit', date: '2026-05-01', status: 'Approved' },
    { id: 'ADJ-9902', item: 'Vitamin C Syrup', type: 'Addition', quantity: '+10 Units', reason: 'Found during audit', date: '2026-05-02', status: 'Pending' },
  ];

  const columns = [
    { accessorKey: 'id', header: 'Adj ID' },
    { accessorKey: 'item', header: 'Product' },
    { accessorKey: 'type', header: 'Adj Type' },
    { accessorKey: 'quantity', header: 'Qty Change' },
    { accessorKey: 'reason', header: 'Reason' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Stock Adjustment</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manually correct inventory balances due to damages, losses, or audit findings.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Adjustment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Adjustments" value="24" trend="This Month" trendType="neutral" icon={Database} color="blue" />
        <KPICard title="Value Adjusted" value="-৳4,500" trend="Net Loss" trendType="down" icon={AlertTriangle} color="red" />
        <KPICard title="Additions" value="5" trend="Audit Gains" trendType="up" icon={RefreshCcw} color="green" />
        <KPICard title="Reductions" value="19" trend="Damages" trendType="down" icon={Settings} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Adjustment Logs</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
