'use client';

import { useEffect, useState } from 'react';
import { 
  Building2, Search, Filter, Download, Plus,
  MapPin, Package, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function WarehousesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Warehouse ID' },
    { accessorKey: 'name', header: 'Warehouse Name' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'capacity', header: 'Capacity Usage' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'WH-01', name: 'Main Factory Store', location: 'Gazipur', capacity: '85%', status: 'Active' },
    { id: 'WH-02', name: 'Dhaka Distribution Center', location: 'Tejgaon', capacity: '42%', status: 'Active' },
    { id: 'WH-03', name: 'Raw Material Godown', location: 'Gazipur', capacity: '95%', status: 'Full' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Warehouse Management</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Monitor storage capacity and manage physical stock locations.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
          <Plus size={18} /> Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Warehouses" value="3" trend="Operational" trendType="neutral" icon={Building2} color="blue" />
        <KPICard title="Total Items" value="12.4k" trend="+8% vs LY" trendType="up" icon={Package} color="green" />
        <KPICard title="Capacity Used" value="74%" trend="Optimal" trendType="neutral" icon={MapPin} color="orange" />
        <KPICard title="Near Capacity" value="1" trend="Action Needed" trendType="down" icon={AlertTriangle} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Storage Hubs</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
