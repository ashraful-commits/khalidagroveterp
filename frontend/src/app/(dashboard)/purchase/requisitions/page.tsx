'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, Plus, Search, Filter, 
  Clock, CheckCircle, ArrowRight, User
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function RequisitionsPage() {
  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const res = await api.get('/purchase/dashboard');
        setRequisitions(res.data.data.recentRequisitions || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchRequisitions();
  }, []);

  const columns = [
    { 
      accessorKey: 'code', 
      header: 'REQ #',
      cell: (i: any) => <span className="font-mono font-bold text-primary">{i.getValue()}</span>
    },
    { accessorKey: 'requestedBy', header: 'Requested By', cell: (i: any) => <span className="font-bold">{i.getValue()}</span> },
    { 
      accessorKey: 'items', 
      header: 'Items',
      cell: (i: any) => <span className="text-xs bg-surface-3 px-2 py-1 rounded-md">{i.getValue()?.length || 0} Units</span>
    },
    { accessorKey: 'status', header: 'Status', cell: (i: any) => <StatusBadge status={i.getValue()} /> },
    { accessorKey: 'date', header: 'Date', cell: (i: any) => new Date(i.getValue()).toLocaleDateString() },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <button className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
          Create PO <ArrowRight size={14} />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Purchase Requisitions" 
        subtitle="Internal requests for procurement and raw materials"
        breadcrumb={[{ label: 'Purchase', href: '/purchase' }, { label: 'Requisitions' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> New Requisition
          </button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable columns={columns} data={requisitions} loading={loading} />
      </div>
    </div>
  );
}
