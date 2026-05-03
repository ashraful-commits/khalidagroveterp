'use client';

import { useEffect, useState } from 'react';
import { 
  Activity, Search, Filter, Download, 
  Play, Pause, StopCircle, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function LiveTrackingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Machine ID' },
    { accessorKey: 'line', header: 'Production Line' },
    { accessorKey: 'product', header: 'Current Product' },
    { accessorKey: 'speed', header: 'Speed (U/m)' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const dummyData = [
    { id: 'MC-101', line: 'Line A (Capsules)', product: 'Amoxicillin', speed: '450', status: 'Running' },
    { id: 'MC-102', line: 'Line B (Syrup)', product: 'Vitamin C', speed: '120', status: 'Running' },
    { id: 'MC-103', line: 'Line C (Tablets)', product: 'Paracetamol', speed: '0', status: 'Stopped' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Live Production Tracking</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Real-time monitoring of shop floor machinery and output speed.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <Activity size={16} /> Performance Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Lines Active" value="2/3" trend="Optimal" trendType="neutral" icon={Play} color="green" />
        <KPICard title="Total Output" value="45k" trend="+5%" trendType="up" icon={CheckCircle2} color="blue" />
        <KPICard title="Downtime" value="45m" trend="Machine #3" trendType="down" icon={StopCircle} color="red" />
        <KPICard title="OEE Score" value="82%" trend="+2%" trendType="up" icon={Activity} color="purple" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Machinery Real-time Status</h3>
        </div>
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
      </div>
    </div>
  );
}
