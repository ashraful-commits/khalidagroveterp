'use client';

import { TrendingUp, Search, Filter, Download, Plus, Users, Wallet, Calendar } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetIncrementsQuery } from '@/store/services/hrApi';

export default function IncrementPage() {
  const { data: rawData, isLoading } = useGetIncrementsQuery();
  
  const data = (rawData?.data?.increments || []).map((inc: any) => ({
    id: inc.id.split('-')[0].toUpperCase(),
    employee: inc.employeeId, // Should be joined with name
    current: '৳0.00', // Calculation logic
    increment: `৳${Number(inc.amount).toLocaleString()}`,
    new: '৳0.00',
    effective: new Date(inc.date).toLocaleDateString('en-GB'),
    status: 'Approved'
  }));

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'employee', header: 'Employee' },
    { accessorKey: 'current', header: 'Current Salary' },
    { accessorKey: 'increment', header: 'Increment Amt' },
    { accessorKey: 'new', header: 'New Salary' },
    { accessorKey: 'effective', header: 'Effective Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Salary Increments</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage and track employee annual or performance-based pay raises.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Increment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Increments" value="৳450k" trend="Annual" trendType="neutral" icon={TrendingUp} color="blue" />
        <KPICard title="Employees Helped" value="84" trend="+12 this year" trendType="up" icon={Users} color="green" />
        <KPICard title="Avg. % Rise" value="10.2%" trend="Stable" trendType="neutral" icon={Wallet} color="purple" />
        <KPICard title="Next Cycle" value="June 2024" trend="Planned" trendType="neutral" icon={Calendar} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Increment History</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
