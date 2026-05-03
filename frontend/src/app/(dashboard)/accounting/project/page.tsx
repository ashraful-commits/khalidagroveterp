'use client';

import { Plus, Briefcase, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetProjectsQuery } from '@/store/services/accountingApi';

export default function ProjectAccountingPage() {
  const { data: rawData, isLoading } = useGetProjectsQuery();
  
  const data = (rawData?.data?.projects || []).map((prj: any) => ({
    id: prj.id.split('-')[0].toUpperCase(),
    name: prj.name,
    budget: `৳${Number(prj.budget).toLocaleString()}`,
    spent: `৳${Number(prj.spent).toLocaleString()}`,
    progress: `${prj.progress}%`,
    status: prj.status
  }));

  const columns = [
    { accessorKey: 'id', header: 'Project ID' },
    { accessorKey: 'name', header: 'Project Name' },
    { accessorKey: 'budget', header: 'Total Budget' },
    { accessorKey: 'spent', header: 'Spent to Date' },
    { accessorKey: 'progress', header: 'Progress' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Project Accounting</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Track finances and profitability for specific business projects.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Start Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Active Projects" value="2" trend="Ongoing" trendType="neutral" icon={Briefcase} color="blue" />
        <KPICard title="Total Allocation" value="৳19.2M" trend="Planned" trendType="neutral" icon={Calendar} color="purple" />
        <KPICard title="Milestones Met" value="14" trend="+3 this month" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="Pending Tasks" value="5" trend="Due soon" trendType="down" icon={Clock} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Project Portfolio</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
