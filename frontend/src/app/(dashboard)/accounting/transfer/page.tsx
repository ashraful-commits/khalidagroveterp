'use client';

import { ArrowRightLeft, Search, Filter, Download, Plus, Landmark, Wallet, RefreshCw } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function FundTransferPage() {
  const isLoading = false;
  const data = [
    { id: 'TRF-8801', from: 'Main Cash', to: 'DBBL Bank', amount: '৳500,000', date: '2026-05-01', status: 'Completed' },
    { id: 'TRF-8802', from: 'Petty Cash', to: 'Main Cash', amount: '৳25,000', date: '2026-05-02', status: 'Pending' },
  ];

  const columns = [
    { accessorKey: 'id', header: 'Transfer ID' },
    { accessorKey: 'from', header: 'Source Account' },
    { accessorKey: 'to', header: 'Destination' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Fund Transfer</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage internal cash movements and bank deposits.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Transfer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Transferred" value="৳2.4M" trend="This Month" trendType="neutral" icon={ArrowRightLeft} color="blue" />
        <KPICard title="Bank Deposits" value="৳1.8M" trend="+15%" trendType="up" icon={Landmark} color="green" />
        <KPICard title="Cash on Hand" value="৳650k" trend="Normal" trendType="neutral" icon={Wallet} color="purple" />
        <KPICard title="Pending Approval" value="3" trend="Action Needed" trendType="down" icon={RefreshCw} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Transfer Logs</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
