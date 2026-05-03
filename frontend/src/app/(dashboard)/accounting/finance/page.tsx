'use client';

import { useEffect, useState } from 'react';
import { 
  Landmark, Search, Filter, Download, Plus,
  CreditCard, Banknote, RefreshCcw, Wallet
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function FinanceBankingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Bank ID' },
    { accessorKey: 'bankName', header: 'Bank Name' },
    { accessorKey: 'accountNo', header: 'Account Number' },
    { accessorKey: 'balance', header: 'Current Balance' },
    { accessorKey: 'type', header: 'Account Type' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'BNK-01', bankName: 'Dutch Bangla Bank', accountNo: '123.456.789', balance: '৳4,250,000', type: 'Current', status: 'Active' },
    { id: 'BNK-02', bankName: 'Islami Bank', accountNo: '987.654.321', balance: '৳1,850,000', type: 'Current', status: 'Active' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Finance & Banking</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage corporate bank accounts, fund transfers, and cash flow.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <RefreshCcw size={16} /> Fund Transfer
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> Add Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Cash" value="৳12.4M" trend="+2.4%" trendType="up" icon={Wallet} color="blue" />
        <KPICard title="Bank Balance" value="৳6.1M" trend="Synced" trendType="neutral" icon={Landmark} color="green" />
        <KPICard title="Cash in Hand" value="৳850k" trend="Physical" trendType="neutral" icon={Banknote} color="orange" />
        <KPICard title="Uncleared" value="৳450k" trend="2 Checks" trendType="down" icon={CreditCard} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Bank Accounts</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
