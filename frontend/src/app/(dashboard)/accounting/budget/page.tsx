'use client';

import { useEffect, useState } from 'react';
import { 
  Target, Search, Filter, Download, Plus,
  TrendingUp, TrendingDown, PieChart, BarChart3
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetBudgetsQuery } from '@/store/services/accountingApi';

export default function BudgetPage() {
  const { data: rawData, isLoading } = useGetBudgetsQuery();
  
  const data = (rawData?.data?.budgets || []).map((b: any) => ({
    id: b.id,
    name: b.name,
    year: b.year,
    total: `৳${Number(b.total).toLocaleString()}`,
    spent: `৳${Number(b.spent).toLocaleString()}`,
    variance: b.variance
  }));

  const columns = [
    { accessorKey: 'id', header: 'Budget ID' },
    { accessorKey: 'name', header: 'Budget Name' },
    { accessorKey: 'year', header: 'Fiscal Year' },
    { accessorKey: 'total', header: 'Allocated' },
    { accessorKey: 'spent', header: 'Actual Spent' },
    { accessorKey: 'variance', header: 'Variance' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Budget Management</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Plan and monitor fiscal allocations across departments.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Annual Budget" value="৳15.0M" trend="Planned" trendType="neutral" icon={PieChart} color="blue" />
        <KPICard title="Total Spent" value="৳8.4M" trend="56% Usage" trendType="neutral" icon={BarChart3} color="purple" />
        <KPICard title="Under Budget" value="8" trend="Optimal" trendType="up" icon={TrendingDown} color="green" />
        <KPICard title="Over Budget" value="2" trend="Review Needed" trendType="down" icon={TrendingUp} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Budgetary Controls</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
