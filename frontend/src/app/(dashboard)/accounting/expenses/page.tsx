'use client';

import { useEffect, useState } from 'react';
import { 
  Receipt, Search, Filter, Download, Plus,
  CreditCard, Banknote, History, Wallet
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function ExpensesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Expense ID' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'payee', header: 'Payee' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'EXP-101', category: 'Utility', amount: '৳15,000', payee: 'DESCO', date: '2026-05-01', status: 'Paid' },
    { id: 'EXP-102', category: 'Fuel', amount: '৳5,200', payee: 'Internal - MPO 01', date: '2026-05-02', status: 'Approved' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Expenses & Advances</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Record operational expenditures and manage employee advances.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Record Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Expense" value="৳125k" trend="Monthly" trendType="neutral" icon={Receipt} color="red" />
        <KPICard title="Unpaid Bills" value="৳42k" trend="Due soon" trendType="down" icon={Banknote} color="orange" />
        <KPICard title="Advances" value="৳85k" trend="Employee" trendType="neutral" icon={Wallet} color="blue" />
        <KPICard title="Approved" value="18" trend="Last 7 days" trendType="up" icon={CreditCard} color="green" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Expense Log</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
