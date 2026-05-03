'use client';

import { useState } from 'react';
import { 
  FileText, Download, Printer, 
  BarChart3, PieChart, TrendingUp, Calendar
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { toast } from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('AgroVet ERP - System Report', 20, 20);
    // @ts-ignore
    doc.autoTable({
      head: [['Module', 'Metric', 'Value', 'Status']],
      body: [
        ['Sales', 'Total Revenue', '৳12,500,000', 'On Track'],
        ['Inventory', 'Stock Value', '৳4,200,000', 'Healthy'],
        ['HR', 'Payroll (Current)', '৳850,000', 'Paid'],
      ],
      startY: 30,
    });
    doc.save('agrovet-report.pdf');
    toast.success('PDF Exported Successfully');
  };

  const exportExcel = () => {
    const data = [
      { Module: 'Sales', Metric: 'Total Revenue', Value: 12500000, Status: 'On Track' },
      { Module: 'Inventory', Metric: 'Stock Value', Value: 4200000, Status: 'Healthy' },
      { Module: 'HR', Metric: 'Payroll', Value: 850000, Status: 'Paid' },
    ];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'agrovet-report.xlsx');
    toast.success('Excel Exported Successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Analytical Reports" 
        subtitle="Exportable business intelligence and financial statements"
        breadcrumb={[{ label: 'Dashboard', href: '/' }, { label: 'Reports' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Financial Statement', desc: 'Balance sheet, P&L, and Cash flow', icon: BarChart3, type: 'Accounting' },
          { title: 'Sales Performance', desc: 'Regional achievement and MPO targets', icon: TrendingUp, type: 'Sales' },
          { title: 'Inventory Audit', desc: 'Stock variance and movement report', icon: FileText, type: 'Inventory' },
        ].map((report, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <report.icon size={24} />
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{report.type}</span>
            <h3 className="text-xl font-syne font-bold text-text-primary mt-2">{report.title}</h3>
            <p className="text-sm text-text-muted mt-2 mb-8">{report.desc}</p>
            
            <div className="flex gap-3">
              <button onClick={exportPDF} className="flex-1 h-11 bg-surface-2 hover:bg-surface-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-text-primary transition-colors">
                <Download size={16} /> PDF
              </button>
              <button onClick={exportExcel} className="flex-1 h-11 bg-surface-2 hover:bg-surface-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-text-primary transition-colors">
                <FileText size={16} /> Excel
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-3xl p-12 flex flex-col items-center text-center">
        <Printer size={48} className="text-primary opacity-20 mb-6" />
        <h2 className="text-3xl font-syne font-bold text-text-primary mb-4">Custom Report Builder</h2>
        <p className="text-text-secondary max-w-md mb-8">Select modules, filters, and date ranges to generate a comprehensive enterprise report for stakeholders.</p>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
          Configure Report
        </button>
      </div>
    </div>
  );
}
