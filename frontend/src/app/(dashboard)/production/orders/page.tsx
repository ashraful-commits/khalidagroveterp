'use client';

import { useEffect, useState } from 'react';
import { 
  Factory, Search, Filter, Download, Plus,
  Settings, CheckCircle2, AlertTriangle, Play
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetProductionOrdersQuery } from '@/store/services/productionApi';

export default function ProductionOrdersPage() {
  const { data: rawData, isLoading } = useGetProductionOrdersQuery();
  
  const data = (rawData?.data?.orders || []).map((order: any) => ({
    id: order.id.split('-')[0].toUpperCase(),
    product: order.bom?.finishedProduct?.name || 'Unknown',
    quantity: `${order.plannedQty} Units`,
    bom: order.bom?.name || 'N/A',
    status: order.status
  }));

  const columns = [
    { accessorKey: 'id', header: 'Batch ID' },
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'quantity', header: 'Target Qty' },
    { accessorKey: 'bom', header: 'BOM Reference' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Production Orders</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Monitor manufacturing batches and shop floor efficiency.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> Plan New Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Live Batches" value="4" trend="Active" trendType="up" icon={Play} color="blue" />
        <KPICard title="Daily Output" value="85k" trend="+12%" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="QC Pending" value="12" trend="High Priority" trendType="neutral" icon={Settings} color="orange" />
        <KPICard title="Material Shortage" value="2" trend="Action Required" trendType="down" icon={AlertTriangle} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Manufacturing Queue</h3>
          <div className="flex items-center gap-2">
            <Search size={16} className="text-text-muted" />
            <input type="text" placeholder="Search batches..." className="px-4 py-2 border border-border rounded-xl text-xs focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
