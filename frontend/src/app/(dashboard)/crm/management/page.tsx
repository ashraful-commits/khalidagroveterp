'use client';

import { Users, Search, Filter, Download, Plus, MessageSquare, PhoneCall, Calendar, Target } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function CRMManagementPage() {
  const isLoading = false;
  const data = [
    { id: 'CRM-001', contact: 'Dr. Nasir Ahmed', type: 'Doctor', area: 'Dhanmondi', lastVisit: '2026-04-28', nextVisit: '2026-05-10', status: 'High Priority' },
    { id: 'CRM-002', contact: 'Popular Pharmacy', type: 'Chemist', area: 'Uttara', lastVisit: '2026-04-29', nextVisit: '2026-05-05', status: 'Follow-up' },
  ];

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'contact', header: 'Contact Name' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'area', header: 'Territory' },
    { accessorKey: 'lastVisit', header: 'Last Visit' },
    { accessorKey: 'nextVisit', header: 'Next Visit' },
    { accessorKey: 'status', header: 'Priority' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">CRM Management</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Coordinate field force visits, track chemist feedback, and manage doctor relations.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Contacts" value="1,240" trend="Active" trendType="neutral" icon={Users} color="blue" />
        <KPICard title="Visits Today" value="84" trend="+12%" trendType="up" icon={Calendar} color="green" />
        <KPICard title="Follow-ups" value="22" trend="Scheduled" trendType="neutral" icon={MessageSquare} color="orange" />
        <KPICard title="Target Coverage" value="92%" trend="+5%" trendType="up" icon={Target} color="purple" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">CRM Activity Ledger</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
