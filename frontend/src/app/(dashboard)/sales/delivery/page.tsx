'use client';

import { useEffect, useState } from 'react';
import { 
  Truck, Search, Filter, Download, Plus,
  MapPin, PackageCheck, Clock, CheckCircle2
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function DeliverySchedulePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'DO Number' },
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'destination', header: 'Destination' },
    { accessorKey: 'date', header: 'Scheduled Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'DO-5521', customer: 'Health Plus', destination: 'Gulshan-2', date: '2026-05-04', status: 'Scheduled' },
    { id: 'DO-5522', customer: 'MediCare', destination: 'Banani', date: '2026-05-04', status: 'In Transit' },
    { id: 'DO-5523', customer: 'Family Pharma', destination: 'Uttara', date: '2026-05-05', status: 'Pending' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Delivery Schedule</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Coordinate logistics and track order fulfillment.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> New Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Orders" value="24" trend="Today" trendType="neutral" icon={Truck} color="blue" />
        <KPICard title="Delivered" value="15" trend="62%" trendType="up" icon={CheckCircle2} color="green" />
        <KPICard title="In Transit" value="6" trend="Real-time" trendType="neutral" icon={MapPin} color="orange" />
        <KPICard title="Pending" value="3" trend="Urgent" trendType="down" icon={Clock} color="red" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Logistics Ledger</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
