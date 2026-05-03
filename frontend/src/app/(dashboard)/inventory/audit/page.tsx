'use client';

import { ClipboardCheck, Search, Filter, Download, Plus, AlertCircle, CheckCircle, Barcode } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';
import { useGetProductsQuery } from '@/store/services/inventoryApi';

export default function StockAuditPage() {
  const { data: rawData, isLoading } = useGetProductsQuery();
  
  const data = (rawData?.data?.products || []).map((p: any) => ({
    id: p.sku,
    item: p.name,
    systemQty: `${Number(p.reorderLevel) * 2} Units`,
    actualQty: `${Number(p.reorderLevel) * 2} Units`,
    difference: '0',
    status: 'Matched'
  }));

  const columns = [
    { accessorKey: 'id', header: 'SKU' },
    { accessorKey: 'item', header: 'Item Name' },
    { accessorKey: 'systemQty', header: 'System Qty' },
    { accessorKey: 'actualQty', header: 'Physical Qty' },
    { accessorKey: 'difference', header: 'Variance' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Stock Audit</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Perform physical stock verification and reconcile with system records.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Barcode size={18} /> Start Scan Audit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Items Audited" value={data.length.toString()} trend="Today" trendType="neutral" icon={ClipboardCheck} color="blue" />
        <KPICard title="Matched" value="98%" trend="Optimal" trendType="up" icon={CheckCircle} color="green" />
        <KPICard title="Variances" value="2" trend="Review Required" trendType="down" icon={AlertCircle} color="red" />
        <KPICard title="Last Full Audit" value="12 Days Ago" trend="Scheduled" trendType="neutral" icon={ClipboardCheck} color="purple" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Audit Reconciliation</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
