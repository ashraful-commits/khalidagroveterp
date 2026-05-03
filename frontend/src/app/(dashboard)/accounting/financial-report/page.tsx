'use client';

import { FileText, Search, Filter, Download, Plus, LineChart, BarChart3, Calculator, Landmark } from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { TableSkeleton } from '@/components/tables/Skeleton';

export default function FinancialReportPage() {
  const isLoading = false;
  const data = [
    { id: 'REP-01', name: 'Profit & Loss Statement', period: 'April 2024', generated: '2024-05-01', status: 'Finalized' },
    { id: 'REP-02', name: 'Balance Sheet', period: 'Q1 2024', generated: '2024-04-10', status: 'Finalized' },
    { id: 'REP-03', name: 'Cash Flow Analysis', period: 'Weekly', generated: '2024-05-02', status: 'Draft' },
  ];

  const columns = [
    { accessorKey: 'id', header: 'Report ID' },
    { accessorKey: 'name', header: 'Report Name' },
    { accessorKey: 'period', header: 'Reporting Period' },
    { accessorKey: 'generated', header: 'Date Generated' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Financial Reports</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Generate and view P&L, Balance Sheets, and Cash Flow statements.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-6 py-3 rounded-2xl font-bold text-sm hover:text-primary transition-all">
            <Calculator size={18} /> Tax Report
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <FileText size={18} /> Generate New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Net Profit" value="৳4.2M" trend="+12.4%" trendType="up" icon={LineChart} color="green" />
        <KPICard title="Operating Cost" value="৳1.8M" trend="-2.1%" trendType="down" icon={BarChart3} color="red" />
        <KPICard title="Bank Balance" value="৳12.5M" trend="Stable" trendType="neutral" icon={Landmark} color="blue" />
        <KPICard title="Tax Liability" value="৳850k" trend="Provisioned" trendType="neutral" icon={Calculator} color="orange" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface-1/30">
          <h3 className="text-xl font-syne font-bold text-text-primary">Financial Statements</h3>
        </div>
        {isLoading ? <TableSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
