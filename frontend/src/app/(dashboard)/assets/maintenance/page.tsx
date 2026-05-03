'use client';

import { useEffect, useState } from 'react';
import { 
  Wrench, Search, Filter, Download, Plus,
  Settings, CheckCircle2, AlertTriangle, Clock
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function AssetMaintenancePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Task ID' },
    { accessorKey: 'asset', header: 'Asset Name' },
    { accessorKey: 'type', header: 'Maintenance Type' },
    { accessorKey: 'date', header: 'Scheduled' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'MNT-101', asset: 'HVAC System - Unit A', type: 'Preventive', date: '2026-05-10', status: 'Scheduled' },
    { id: 'MNT-102', asset: 'Forklift #3', type: 'Repair', date: '2026-05-02', status: 'In Progress' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Asset Maintenance</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Schedule repairs and track preventive maintenance schedules.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Schedule Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Scheduled" value="12" trend="Next 7 days" trendType="neutral" icon={Clock} color="blue" />
        <KPICard title="In Progress" value="3" trend="Critical" trendType="neutral" icon={Settings} color="orange" />
        <KPICard title="Completed" value="85" trend="Monthly" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="Overdue" value="2" trend="High Priority" trendType="down" icon={AlertTriangle} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Maintenance Log</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
