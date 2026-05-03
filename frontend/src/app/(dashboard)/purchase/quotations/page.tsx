'use client';

import { useEffect, useState } from 'react';
import { 
  FileText, Search, Filter, Download, Plus,
  History, CheckCircle2, Clock, AlertTriangle
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function PurchaseQuotationPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Quotation ID' },
    { accessorKey: 'vendor', header: 'Vendor' },
    { accessorKey: 'amount', header: 'Total Amount' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'validUntil', header: 'Valid Until' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'PQ-9901', vendor: 'Global Chemicals', amount: '৳450,000', date: '2026-05-01', validUntil: '2026-05-15', status: 'Pending' },
    { id: 'PQ-9902', vendor: 'Pure Pack', amount: '৳85,000', date: '2026-05-02', validUntil: '2026-05-20', status: 'Approved' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Purchase Quotations</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage and compare vendor quotations for procurement.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Request Quotation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Quotations" value="12" trend="Active" trendType="neutral" icon={FileText} color="blue" />
        <KPICard title="Approved" value="8" trend="65%" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="Pending Review" value="4" trend="Urgent" trendType="neutral" icon={Clock} color="orange" />
        <KPICard title="Expired" value="1" trend="Follow-up" trendType="down" icon={AlertTriangle} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Quotation Ledger</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
