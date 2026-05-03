'use client';

import { LogIn, LogOut, Search, Filter, Download, Plus, Truck, UserCheck, ShieldCheck } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

import { useGetGateLogsQuery } from '@/store/services/inventoryApi';

export default function GateControlPage() {
  const { data: rawData, isLoading } = useGetGateLogsQuery();
  
  const data = (rawData?.data?.logs || []).map((log: any) => ({
    id: log.id.split('-')[0].toUpperCase(),
    type: log.type,
    vehicle: log.vehicleNo,
    driver: log.driverName,
    purpose: log.purpose,
    time: new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: log.status
  }));

  const columns = [
    { accessorKey: 'id', header: 'Gate Pass' },
    { accessorKey: 'type', header: 'Movement' },
    { accessorKey: 'vehicle', header: 'Vehicle No' },
    { accessorKey: 'driver', header: 'Driver Name' },
    { accessorKey: 'purpose', header: 'Purpose' },
    { accessorKey: 'time', header: 'Time' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Gate In / Out</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Monitor factory entrance and exit for logistics and security.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-green-600/20">
            <LogIn size={18} /> Gate In
          </button>
          <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-red-600/20">
            <LogOut size={18} /> Gate Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Vehicles Inside" value="12" trend="Active" trendType="neutral" icon={Truck} color="blue" />
        <KPICard title="Today's Entries" value="45" trend="+5" trendType="up" icon={UserCheck} color="green" />
        <KPICard title="Security Checks" value="100%" trend="Verified" trendType="up" icon={ShieldCheck} color="purple" />
        <KPICard title="Avg. Stay Time" value="42m" trend="Stable" trendType="neutral" icon={LogIn} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Live Gate Activity</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
