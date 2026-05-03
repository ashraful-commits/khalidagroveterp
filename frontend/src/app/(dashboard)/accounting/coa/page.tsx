'use client';

import { useEffect, useState } from 'react';
import { 
  Calculator, Search, Filter, Download, Plus,
  ListTree, Wallet, CreditCard, Banknote
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetCOAQuery } from '@/store/services/accountingApi';

export default function COAPage() {
  const { data: rawData, isLoading } = useGetCOAQuery();
  
  const data = (rawData?.data?.accounts || []).map((acc: any) => ({
    code: acc.code,
    name: acc.name,
    type: acc.type,
    balance: '৳0.00', // Calculation logic for balance would go here
    status: 'Active'
  }));

  const columns = [
    { accessorKey: 'code', header: 'Account Code' },
    { accessorKey: 'name', header: 'Account Name' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'balance', header: 'Current Balance' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Chart of Accounts</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Define and manage your financial ledger structure.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Assets" value="৳15.4M" trend="+12%" trendType="up" icon={Wallet} color="blue" />
        <KPICard title="Liabilities" value="৳4.2M" trend="-5%" trendType="down" icon={CreditCard} color="red" />
        <KPICard title="Equity" value="৳11.2M" trend="Stable" trendType="neutral" icon={Calculator} color="purple" />
        <KPICard title="Active Accounts" value={data.length.toString()} trend="Synced" trendType="neutral" icon={ListTree} color="green" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Accounting Ledger</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
