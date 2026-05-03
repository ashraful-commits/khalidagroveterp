'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, Plus, Wallet, TrendingUp, 
  ArrowRightLeft, FileCheck, Layers
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';
import { AmountDisplay } from '@/components/ui/AmountDisplay';

export default function ChartOfAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get('/accounting/dashboard');
        setAccounts(res.data.data.accounts || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAccounts();
  }, []);

  const columns = [
    { accessorKey: 'code', header: 'A/C Code', cell: (i: any) => <span className="font-mono font-bold">{i.getValue()}</span> },
    { accessorKey: 'name', header: 'Account Name', cell: (i: any) => <span className="font-bold text-text-primary">{i.getValue()}</span> },
    { 
      accessorKey: 'type', 
      header: 'Type',
      cell: (i: any) => (
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
          i.getValue() === 'ASSET' ? 'bg-green-50 text-green-600' : 
          i.getValue() === 'LIABILITY' ? 'bg-red-50 text-red-600' :
          'bg-blue-50 text-blue-600'
        }`}>
          {i.getValue()}
        </span>
      )
    },
    { 
      header: 'Balance',
      cell: () => <AmountDisplay amount={Math.floor(Math.random() * 500000)} /> // Mock for now
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Chart of Accounts" 
        subtitle="Financial structure and account hierarchy"
        breadcrumb={[{ label: 'Accounting', href: '/accounting' }, { label: 'COA' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Add Account
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="font-syne font-bold text-sm text-text-primary mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Account Types
            </h3>
            <div className="space-y-2">
              {['Assets', 'Liabilities', 'Equity', 'Income', 'Expenses'].map((t) => (
                <button key={t} className="w-full text-left px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-2 transition-colors flex justify-between">
                  {t} <span className="text-[10px] bg-surface-3 px-1.5 py-0.5 rounded">12</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
          <DataTable 
            columns={columns} 
            data={accounts} 
            loading={loading}
            searchPlaceholder="Search accounts by name or code..."
          />
        </div>
      </div>
    </div>
  );
}
