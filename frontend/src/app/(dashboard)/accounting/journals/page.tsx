'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Plus, Search, Filter, 
  ArrowRightLeft, FileCheck, Layers, MoreHorizontal
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AmountDisplay } from '@/components/ui/AmountDisplay';

export default function JournalsPage() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await api.get('/accounting/dashboard');
        setJournals(res.data.data.journals || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchJournals();
  }, []);

  const columns = [
    { 
      accessorKey: 'voucherNo', 
      header: 'Voucher #',
      cell: (i: any) => <span className="font-mono font-bold text-primary">{i.getValue()}</span>
    },
    { 
      accessorKey: 'type', 
      header: 'Type',
      cell: (i: any) => (
        <span className="px-2 py-0.5 rounded bg-surface-3 text-[10px] font-bold uppercase">{i.getValue()}</span>
      )
    },
    { 
      accessorKey: 'totalDebit', 
      header: 'Amount',
      cell: (i: any) => <AmountDisplay amount={i.getValue()} />
    },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: (i: any) => <StatusBadge status={i.getValue()} />
    },
    { 
      accessorKey: 'date', 
      header: 'Date',
      cell: (i: any) => new Date(i.getValue()).toLocaleDateString()
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <button className="p-2 hover:bg-surface-2 rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-text-muted" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Journal Entries" 
        subtitle="Double-entry bookkeeping and financial vouchers"
        breadcrumb={[{ label: 'Accounting', href: '/accounting' }, { label: 'Journals' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> New Journal Entry
          </button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={journals} 
          loading={loading}
          searchPlaceholder="Search vouchers by number..."
        />
      </div>
    </div>
  );
}
