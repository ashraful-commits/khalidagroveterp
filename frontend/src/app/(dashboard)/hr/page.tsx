'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserPlus, Clock, CreditCard,
  TrendingUp, Search, Filter, Download,
  CheckCircle2, XCircle, Calendar
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function HRPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { accessorKey: 'id', header: 'Emp ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'dept', header: 'Department' },
    { accessorKey: 'status', header: 'Attendance' },
    { accessorKey: 'performance', header: 'Performance' },
  ];

  const dummyData = [
    { id: 'AV-102', name: 'Rahat Chowdhury', dept: 'Production', status: 'Present', performance: 'Exceeds' },
    { id: 'AV-105', name: 'Sumaiya Akter', dept: 'Sales', status: 'On Leave', performance: 'High' },
    { id: 'AV-109', name: 'Ariful Islam', dept: 'Logistics', status: 'Late', performance: 'Average' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Human Capital</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Manage workforce performance, attendance, and payroll.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <Calendar size={16} /> Mark Attendance
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <UserPlus size={18} /> Onboard Employee
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Workforce" 
          value="482" 
          trend="+5.2%" 
          trendType="up"
          icon={Users}
          color="blue"
        />
        <KPICard 
          title="Attendance Rate" 
          value="94.8%" 
          trend="+1.2%" 
          trendType="up"
          icon={CheckCircle2}
          color="green"
        />
        <KPICard 
          title="Pending Leaves" 
          value="12" 
          trend="Action Required" 
          trendType="down"
          icon={Clock}
          color="orange"
        />
        <KPICard 
          title="Payroll Status" 
          value="Disbursed" 
          trend="April 2026" 
          trendType="neutral"
          icon={CreditCard}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main Employee Table */}
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
              <h3 className="text-xl font-syne font-bold text-text-primary">Workforce Directory</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by ID or Name..." 
                    className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="p-2 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
            {loading ? <TableSkeleton /> : <DataTable columns={columns} data={dummyData} />}
          </div>
        </div>

        <div className="space-y-8">
          {/* Department Breakdown */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <h3 className="font-syne font-bold text-lg mb-6">Distribution by Unit</h3>
            <div className="space-y-6">
              {[
                { name: 'Factory Production', count: 240, percentage: 50 },
                { name: 'Field Sales', count: 142, percentage: 29 },
                { name: 'HQ & Accounts', count: 50, percentage: 11 },
                { name: 'Logistics', count: 50, percentage: 10 },
              ].map((dept, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{dept.name}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{dept.count} Members</p>
                    </div>
                    <span className="text-xs font-black text-text-primary">{dept.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.percentage}%` }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Highlight */}
          <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mb-10 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={24} className="opacity-50" />
              <h4 className="font-syne font-bold text-lg">Top Performer</h4>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">KA</div>
              <div>
                <p className="text-sm font-bold">Kamrul Ahsan</p>
                <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest tracking-tighter">RSM • Dhaka Division</p>
              </div>
            </div>
            <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              View All Rankings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
