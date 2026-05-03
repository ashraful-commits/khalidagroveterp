'use client';

import { ClipboardList, Search, Filter, Download, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetInventoryRequestsQuery } from '@/store/services/inventoryApi';

export default function InventoryRequestPage() {
  const { data: rawData, isLoading } = useGetInventoryRequestsQuery();
  
  const data = (rawData?.data?.requests || []).map((req: any) => ({
    id: req.id.split('-')[0].toUpperCase(),
    item: req.itemId, // Should be joined with product name in real API
    quantity: `${req.quantity} Units`,
    requestedBy: req.requestedBy,
    date: new Date(req.date).toLocaleDateString('en-GB'),
    status: req.status
  }));

  const columns = [
    { accessorKey: 'id', header: 'Request ID' },
    { accessorKey: 'item', header: 'Item Name' },
    { accessorKey: 'quantity', header: 'Quantity' },
    { accessorKey: 'requestedBy', header: 'Requested By' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Inventory Requests</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Internal material and stock requests from various departments.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Requests" value="142" trend="Synced" trendType="neutral" icon={ClipboardList} color="blue" />
        <KPICard title="Pending" value="8" trend="Action Needed" trendType="down" icon={Clock} color="orange" />
        <KPICard title="Approved" value="124" trend="Successful" trendType="up" icon={CheckCircle} color="green" />
        <KPICard title="Rejected" value="10" trend="Reviewed" trendType="neutral" icon={AlertCircle} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Request Ledger</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
