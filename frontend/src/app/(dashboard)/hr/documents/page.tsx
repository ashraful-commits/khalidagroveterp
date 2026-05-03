'use client';

import { FileText, Search, Filter, Download, Plus, HardDrive, ShieldAlert, CheckSquare, Upload } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetDocumentsQuery } from '@/store/services/hrApi';

export default function EmployeeDocsPage() {
  const { data: rawData, isLoading } = useGetDocumentsQuery();
  
  const data = (rawData?.data?.documents || []).map((doc: any) => ({
    id: doc.id.split('-')[0].toUpperCase(),
    employee: doc.employee?.name || 'Unknown',
    title: doc.title,
    type: 'Required',
    uploaded: new Date(doc.createdAt).toLocaleDateString('en-GB'),
    status: 'Verified'
  }));

  const columns = [
    { accessorKey: 'id', header: 'Doc ID' },
    { accessorKey: 'employee', header: 'Employee' },
    { accessorKey: 'title', header: 'Document Title' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'uploaded', header: 'Upload Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Employee Documentation</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Securely store and manage employee identity, education, and contract files.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Upload size={18} /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Files" value="1,245" trend="Synced" trendType="neutral" icon={HardDrive} color="blue" />
        <KPICard title="Verified" value="1,120" trend="90%" trendType="up" icon={CheckSquare} color="green" />
        <KPICard title="Missing NID" value="12" trend="Action Required" trendType="down" icon={ShieldAlert} color="red" />
        <KPICard title="Review Queue" value="113" trend="Pending" trendType="neutral" icon={FileText} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Digital Archive</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
