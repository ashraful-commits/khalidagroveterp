'use client';

import { FileText, Search, Filter, Download, Plus, Shield, ShieldCheck, Scale, Info } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetPoliciesQuery } from '@/store/services/hrApi';

export default function HRPoliciesPage() {
  const { data: rawData, isLoading } = useGetPoliciesQuery();
  
  const data = (rawData?.data?.policies || []).map((pol: any) => ({
    id: pol.id.split('-')[0].toUpperCase(),
    title: pol.title,
    category: pol.category,
    lastRevised: new Date(pol.lastRevised).toLocaleDateString('en-GB'),
    status: pol.status
  }));

  const columns = [
    { accessorKey: 'id', header: 'Policy ID' },
    { accessorKey: 'title', header: 'Policy Title' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'lastRevised', header: 'Last Revised' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">HR Policies & Config</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Define and manage company regulations, leave rules, and attendance policies.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Policy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Policies" value="12" trend="Operational" trendType="neutral" icon={Shield} color="blue" />
        <KPICard title="Compliance Rate" value="98%" trend="+1%" trendType="up" icon={ShieldCheck} color="green" />
        <KPICard title="Pending Reviews" value="2" trend="Due soon" trendType="down" icon={Scale} color="orange" />
        <KPICard title="Active Rules" value="45" trend="Enforced" trendType="neutral" icon={Info} color="purple" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Policy Documentation</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
