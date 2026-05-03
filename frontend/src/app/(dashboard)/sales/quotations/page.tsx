'use client';

import { useEffect, useState } from 'react';
import { 
  FileCheck, Search, Filter, Download, Plus,
  History, CheckCircle2, Clock, Activity
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetSalesQuotationsQuery } from '@/store/services/salesApi';

export default function SalesQuotationPage() {
  const { data: rawData, isLoading } = useGetSalesQuotationsQuery();
  
  const data = (rawData?.data?.quotations || []).map((q: any) => ({
    id: q.code,
    customer: q.customer?.name || 'Unknown',
    amount: `৳${Number(q.totalAmount).toLocaleString()}`,
    date: new Date(q.date).toLocaleDateString('en-GB'),
    status: q.status
  }));

  const columns = [
    { accessorKey: 'id', header: 'Quotation ID' },
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'amount', header: 'Est. Value' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Sales Quotations</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Issue and track quotations for prospective customers.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Quotation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Value" value="৳2.4M" trend="+15%" trendType="up" icon={Activity} color="blue" />
        <KPICard title="Sent" value="24" trend="Waiting" trendType="neutral" icon={FileCheck} color="purple" />
        <KPICard title="Converted" value="12" trend="50% Rate" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="Pending" value="8" trend="Follow-up" trendType="neutral" icon={Clock} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Quotation History</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
