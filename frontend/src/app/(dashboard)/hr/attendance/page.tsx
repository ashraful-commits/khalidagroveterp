'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, UserX, Clock, Calendar, 
  MapPin, Filter, Search, Download
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock attendance data
    setAttendance([
      { name: 'Arif Hossain', empId: 'EMP-101', date: '2026-05-03', checkIn: '08:45 AM', checkOut: '05:15 PM', status: 'PRESENT' },
      { name: 'Mousumi Akter', empId: 'EMP-105', date: '2026-05-03', checkIn: '09:10 AM', checkOut: '05:05 PM', status: 'LATE' },
      { name: 'Zahirul Islam', empId: 'EMP-110', date: '2026-05-03', checkIn: '-', checkOut: '-', status: 'ABSENT' },
    ] as any);
    setLoading(false);
  }, []);

  const columns = [
    { accessorKey: 'name', header: 'Employee', cell: (i: any) => <span className="font-bold">{i.getValue()}</span> },
    { accessorKey: 'empId', header: 'ID' },
    { accessorKey: 'checkIn', header: 'Check In', cell: (i: any) => <span className="font-mono text-xs">{i.getValue()}</span> },
    { accessorKey: 'checkOut', header: 'Check Out', cell: (i: any) => <span className="font-mono text-xs">{i.getValue()}</span> },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: (i: any) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          i.getValue() === 'PRESENT' ? 'bg-green-50 text-green-600' : 
          i.getValue() === 'LATE' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
        }`}>
          {i.getValue()}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance Tracking" 
        subtitle="Digital logs for factory and office staff"
        breadcrumb={[{ label: 'HR', href: '/hr' }, { label: 'Attendance' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Download className="w-4 h-4" /> Export Today
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><UserCheck size={24} /></div>
          <div>
            <p className="text-xs font-bold text-text-muted uppercase">Present Today</p>
            <h4 className="text-2xl font-syne font-bold text-text-primary">142</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><UserX size={24} /></div>
          <div>
            <p className="text-xs font-bold text-text-muted uppercase">Absent</p>
            <h4 className="text-2xl font-syne font-bold text-text-primary">8</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock size={24} /></div>
          <div>
            <p className="text-xs font-bold text-text-muted uppercase">Late Entries</p>
            <h4 className="text-2xl font-syne font-bold text-text-primary">12</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable columns={columns} data={attendance} loading={loading} />
      </div>
    </div>
  );
}
