'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter, 
  ArrowUpRight, Clock, CheckCircle, MoreHorizontal
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import Link from 'next/link';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await api.get('/sales/invoices');
        setInvoices(res.data.data.invoices);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchInvoices();
  }, []);

  const columns = [
    { 
      accessorKey: 'code', 
      header: 'Invoice #',
      cell: (i: any) => <span className="font-mono font-bold text-primary">{i.getValue()}</span>
    },
    { 
      accessorKey: 'customer.name', 
      header: 'Customer',
      cell: (i: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-text-primary">{i.getValue()}</span>
          <span className="text-[10px] text-text-muted uppercase tracking-tighter">{i.row.original.customer?.code}</span>
        </div>
      )
    },
    { 
      accessorKey: 'totalAmount', 
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
      cell: (i: any) => new Date(i.getValue()).toLocaleDateString('en-GB')
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
        title="Sales Invoices" 
        subtitle="Manage billing and distribution records"
        breadcrumb={[{ label: 'Sales', href: '/sales' }, { label: 'Invoices' }]}
        actions={
          <Link href="/sales/invoices/new" className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Create Invoice
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Unpaid Amount', value: 1245000, icon: Clock, color: 'text-amber-500' },
          { label: 'Today Collections', value: 85000, icon: ArrowUpRight, color: 'text-green-500' },
          { label: 'Draft Invoices', value: 12, icon: FileText, color: 'text-blue-500', isCount: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-surface-2 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
              <h4 className="text-2xl font-syne font-bold text-text-primary">
                {stat.isCount ? stat.value : <AmountDisplay amount={stat.value} />}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden p-6">
        <DataTable 
          columns={columns} 
          data={invoices} 
          loading={loading}
          searchPlaceholder="Search invoices by number or customer..."
        />
      </div>
    </div>
  );
}
