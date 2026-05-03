'use client';

import { Plus, Search, MapPin, Hash, Settings } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';
import { useGetCOAQuery } from '@/store/services/accountingApi';

export default function CenterSetupPage() {
  const { data: rawData, isLoading } = useGetCOAQuery();
  
  // Using COA data as a placeholder for Cost Centers until dedicated API is ready
  const data = (rawData?.data?.accounts || [])
    .filter((acc: any) => acc.type === 'EXPENSE')
    .map((acc: any) => ({
      code: `CC-${acc.code}`,
      name: `${acc.name} Center`,
      type: 'Departmental',
      manager: 'Auto-assigned',
      status: 'Active'
    }));

  const columns = [
    { accessorKey: 'code', header: 'Center Code' },
    { accessorKey: 'name', header: 'Center Name' },
    { accessorKey: 'type', header: 'Category' },
    { accessorKey: 'manager', header: 'Responsible' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Cost Centers</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Configure profit and loss centers for granular financial tracking.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Center
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard title="Total Centers" value={data.length.toString()} trend="Active" trendType="neutral" icon={Hash} color="blue" />
        <KPICard title="Primary Depts" value="5" trend="Operational" trendType="neutral" icon={MapPin} color="purple" />
        <KPICard title="Configurations" value="Stable" trend="Synced" trendType="up" icon={Settings} color="green" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Center Directory</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
