'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, Download, Send, Search, 
  Filter, CheckCircle2, AlertCircle, Calendar
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { toast } from 'react-hot-toast';

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await api.get(`/hr/payroll?month=${month}&year=${year}`);
        setPayrolls(res.data.data.payrolls || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchPayroll();
  }, [month, year]);

  const generatePayroll = async () => {
    setLoading(true);
    try {
      await api.post('/hr/payroll/generate', { month, year });
      toast.success('Payroll generated for all active employees');
      // Refetch
      const res = await api.get(`/hr/payroll?month=${month}&year=${year}`);
      setPayrolls(res.data.data.payrolls || []);
    } catch (e) { toast.error('Failed to generate payroll'); }
    finally { setLoading(false); }
  };

  const columns = [
    { 
      accessorKey: 'employee.name', 
      header: 'Employee',
      cell: (i: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-text-primary">{i.getValue()}</span>
          <span className="text-[10px] text-text-muted">{i.row.original.employee?.empId}</span>
        </div>
      )
    },
    { accessorKey: 'basic', header: 'Basic Salary', cell: (i: any) => <AmountDisplay amount={i.getValue()} /> },
    { accessorKey: 'allowances', header: 'Allowances', cell: (i: any) => <AmountDisplay amount={i.getValue()} /> },
    { accessorKey: 'deductions', header: 'Deductions', cell: (i: any) => <span className="text-red-500">-৳{i.getValue().toLocaleString()}</span> },
    { accessorKey: 'netSalary', header: 'Net Pay', cell: (i: any) => <AmountDisplay amount={i.getValue()} colorize /> },
    { 
      accessorKey: 'isPaid', 
      header: 'Status',
      cell: (i: any) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
          i.getValue() ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
        }`}>
          {i.getValue() ? 'Paid' : 'Pending'}
        </span>
      )
    },
    {
      id: 'actions',
      header: '',
      cell: (i: any) => (
        <button className="text-primary hover:underline text-xs font-bold">Details</button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Payroll Management" 
        subtitle="Automated salary generation and payment tracking"
        breadcrumb={[{ label: 'HR', href: '/hr' }, { label: 'Payroll' }]}
        actions={
          <div className="flex gap-3">
            <button className="bg-surface-2 text-text-primary px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 border border-border">
              <Download className="w-4 h-4" /> Export
            </button>
            <button 
              onClick={generatePayroll}
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Send className="w-4 h-4" /> Run Payroll
            </button>
          </div>
        }
      />

      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary" />
          <select 
            value={month} 
            onChange={(e) => setMonth(Number(e.target.value))}
            className="bg-surface-2 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-0"
          >
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => (
              <option key={i+1} value={i+1}>{m}</option>
            ))}
          </select>
          <select 
            value={year} 
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-surface-2 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-0"
          >
            {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="h-8 w-px bg-border hidden md:block" />

        <div className="flex gap-8">
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase">Total Payout</p>
            <p className="text-lg font-syne font-bold text-text-primary">
              <AmountDisplay amount={payrolls.reduce((sum: any, p: any) => sum + Number(p.netSalary), 0)} />
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase">Employees</p>
            <p className="text-lg font-syne font-bold text-text-primary">{payrolls.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable columns={columns} data={payrolls} loading={loading} />
      </div>
    </div>
  );
}
