'use client';

import { useEffect, useState } from 'react';
import { 
  CreditCard, Search, Filter, Download, Plus,
  Wallet, Banknote, History, CheckCircle2
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function PurchasePaymentsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Payment ID' },
    { accessorKey: 'vendor', header: 'Vendor Name' },
    { accessorKey: 'amount', header: 'Amount Paid' },
    { accessorKey: 'method', header: 'Method' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'PAY-7701', vendor: 'Global Chemicals', amount: '৳250,000', method: 'Bank Transfer', date: '2026-05-01', status: 'Cleared' },
    { id: 'PAY-7702', vendor: 'Pure Pack', amount: '৳45,000', method: 'Cash', date: '2026-05-02', status: 'Pending' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Supplier Payments</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Track and manage outgoing payments to vendors and suppliers.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Record Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Paid" value="৳1.2M" trend="Monthly" trendType="neutral" icon={Wallet} color="blue" />
        <KPICard title="Accounts Payable" value="৳450k" trend="Due soon" trendType="down" icon={Banknote} color="red" />
        <KPICard title="Uncleared Cheques" value="3" trend="৳120k" trendType="neutral" icon={CreditCard} color="orange" />
        <KPICard title="Successful Trans." value="42" trend="98%" trendType="up" icon={CheckCircle2} color="green" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Payment Ledger</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
