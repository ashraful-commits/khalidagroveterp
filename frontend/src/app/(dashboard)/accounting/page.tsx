'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, Landmark, CreditCard, PieChart,
  DollarSign, TrendingUp, TrendingDown, FileText,
  Search, Download, Plus, Filter, Wallet
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';
import { SalesChart } from '@/components/dashboard/SalesChart';

export default function AccountingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Reference' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'account', header: 'Account' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'date', header: 'Date' },
  ];

  const dummyData = [
    { id: 'JV-2024-001', type: 'Journal', account: 'Petty Cash', amount: '৳5,000', date: '2024-05-01' },
    { id: 'PV-2024-402', type: 'Payment', account: 'Standard Chartered', amount: '৳142,500', date: '2024-05-02' },
    { id: 'RV-2024-112', type: 'Receipt', account: 'Islami Bank', amount: '৳28,900', date: '2024-05-03' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Financial Hub</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Real-time profit tracking, banking, and general ledger control.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <Landmark size={16} /> Banking
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> New Entry
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Cash on Hand" 
          value="৳4.8M" 
          trend="+1.2%" 
          trendType="up"
          icon={Wallet}
          color="blue"
        />
        <KPICard 
          title="Net Revenue" 
          value="৳12.5M" 
          trend="+14.2%" 
          trendType="up"
          icon={TrendingUp}
          color="green"
        />
        <KPICard 
          title="Operating Expenses" 
          value="৳2.4M" 
          trend="+5.8%" 
          trendType="down"
          icon={TrendingDown}
          color="red"
        />
        <KPICard 
          title="Profit Margin" 
          value="18.4%" 
          trend="Stable" 
          trendType="neutral"
          icon={PieChart}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Revenue vs Expense Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-syne font-bold text-text-primary">Cashflow Velocity</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-bold text-text-muted">Inflow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="text-xs font-bold text-text-muted">Outflow</span>
                </div>
              </div>
            </div>
            <div className="h-[350px]">
              <SalesChart />
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
              <h3 className="text-xl font-syne font-bold text-text-primary">Transaction Journal</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Reference #..." 
                    className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="p-2 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
            {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
          </div>
        </div>

        <div className="space-y-8">
          {/* Banking Summary */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <h3 className="font-syne font-bold text-lg mb-6">Accounts & Banking</h3>
            <div className="space-y-4">
              {[
                { name: 'Standard Chartered', type: 'Current', balance: '৳2.4M', logo: 'SC' },
                { name: 'Islami Bank BD', type: 'Operational', balance: '৳1.2M', logo: 'IB' },
                { name: 'Petty Cash', type: 'Cash', balance: '৳45,000', logo: 'PC' },
              ].map((bank, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-1 rounded-2xl group cursor-pointer hover:bg-surface-2 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-primary text-xs shadow-sm group-hover:scale-110 transition-transform">{bank.logo}</div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{bank.name}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{bank.type}</p>
                    </div>
                  </div>
                  <p className="text-sm font-black text-text-primary">{bank.balance}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white border border-border rounded-xl text-xs font-bold text-text-secondary hover:bg-surface-1 transition-all">
              Manage Bank Accounts
            </button>
          </div>

          {/* Quick Reports */}
          <div className="bg-text-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-black/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            <div className="flex items-center gap-2 mb-4">
              <FileText size={24} className="text-primary" />
              <h4 className="font-syne font-bold text-lg">Financial Reports</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Balance Sheet', 'P&L Statement', 'Trial Balance', 'Ledger Report'].map((rep, i) => (
                <button key={i} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-white/70 uppercase tracking-widest transition-all">
                  {rep}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
