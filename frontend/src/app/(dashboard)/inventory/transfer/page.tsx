'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Plus, Search, Filter, 
  ArrowRightLeft, AlertCircle, History
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function StockTransfersPage() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const res = await api.get('/inventory/dashboard');
        setTransfers(res.data.data.recentTransfers || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchTransfers();
  }, []);

  const columns = [
    { 
      accessorKey: 'product.name', 
      header: 'Product',
      cell: (i: any) => <span className="font-bold text-text-primary">{i.getValue()}</span>
    },
    { accessorKey: 'fromWarehouse.name', header: 'Source' },
    { accessorKey: 'toWarehouse.name', header: 'Destination' },
    { 
      accessorKey: 'quantity', 
      header: 'Qty',
      cell: (i: any) => <span className="font-mono font-bold">{Number(i.getValue()).toLocaleString()}</span>
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
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Stock Transfers" 
        subtitle="Internal warehouse movements and transit tracking"
        breadcrumb={[{ label: 'Inventory', href: '/inventory' }, { label: 'Transfers' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> New Transfer
          </button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={transfers} 
          loading={loading}
          searchPlaceholder="Search transfers by product..."
        />
      </div>
    </div>
  );
}
