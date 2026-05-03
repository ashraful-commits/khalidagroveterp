'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History, Package, Search, 
  Filter, ArrowDown, ArrowUp, Calendar
} from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';

export default function StockLedgerPage() {
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock stock ledger data
    setLedgers([
      { date: '2026-05-03', product: 'Ammonia Solution', type: 'IN', qty: 500, balance: 1200, ref: 'PO-2026-001' },
      { date: '2026-05-02', product: 'Ammonia Solution', type: 'OUT', qty: 200, balance: 700, ref: 'INV-2026-042' },
      { date: '2026-05-01', product: 'Plastic Bottles', type: 'PRODUCTION', qty: 1000, balance: 5400, ref: 'BATCH-099' },
    ] as any);
    setLoading(false);
  }, []);

  const columns = [
    { accessorKey: 'date', header: 'Date', cell: (i: any) => new Date(i.getValue()).toLocaleDateString() },
    { accessorKey: 'product', header: 'Product', cell: (i: any) => <span className="font-bold">{i.getValue()}</span> },
    { 
      accessorKey: 'type', 
      header: 'Type',
      cell: (i: any) => (
        <span className={`flex items-center gap-1 font-bold text-[10px] ${
          i.getValue() === 'IN' ? 'text-green-600' : 'text-red-600'
        }`}>
          {i.getValue() === 'IN' ? <ArrowDown size={10} /> : <ArrowUp size={10} />}
          {i.getValue()}
        </span>
      )
    },
    { accessorKey: 'qty', header: 'Quantity', cell: (i: any) => <span className="font-mono">{i.getValue().toLocaleString()}</span> },
    { accessorKey: 'balance', header: 'Balance', cell: (i: any) => <span className="font-mono font-bold text-text-primary">{i.getValue().toLocaleString()}</span> },
    { accessorKey: 'ref', header: 'Reference', cell: (i: any) => <span className="text-xs text-text-muted">{i.getValue()}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Stock Ledger" 
        subtitle="Detailed audit trail of all inventory movements"
        breadcrumb={[{ label: 'Inventory', href: '/inventory' }, { label: 'Ledger' }]}
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable columns={columns} data={ledgers} loading={loading} />
      </div>
    </div>
  );
}
