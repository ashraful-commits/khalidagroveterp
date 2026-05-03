'use client';

import { Gift, Search, Filter, Download, Plus, PartyPopper, Wallet, CalendarCheck } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetBonusesQuery } from '@/store/services/hrApi';

export default function BonusManagementPage() {
  const { data: rawData, isLoading } = useGetBonusesQuery();
  
  const data = (rawData?.data?.bonuses || []).map((b: any) => ({
    id: b.id.split('-')[0].toUpperCase(),
    title: b.reason,
    amount: `৳${Number(b.amount).toLocaleString()}`,
    type: 'General',
    employees: 'Targeted',
    status: 'Paid'
  }));

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Bonus Title' },
    { accessorKey: 'amount', header: 'Total Value' },
    { accessorKey: 'type', header: 'Category' },
    { accessorKey: 'employees', header: 'Headcount' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Bonus & Incentives</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage festival bonuses, performance incentives, and special rewards.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Declare Bonus
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Bonuses" value="৳3.35M" trend="FY 2024" trendType="neutral" icon={Gift} color="blue" />
        <KPICard title="Performance Pay" value="৳850k" trend="High Impact" trendType="up" icon={PartyPopper} color="green" />
        <KPICard title="Avg. Bonus" value="৳7,500" trend="Per head" trendType="neutral" icon={Wallet} color="purple" />
        <KPICard title="Upcoming" value="Eid-ul-Adha" trend="Planned" trendType="neutral" icon={CalendarCheck} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Bonus Distribution History</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
