'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Monitor, Truck, Building, Zap, MoreVertical } from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function AssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await api.get('/assets/dashboard');
        setAssets(res.data.data.assets || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAssets();
  }, []);

  const columns = [
    { accessorKey: 'code', header: 'Tag #', cell: (i: any) => <span className="font-mono text-xs bg-surface-3 px-2 py-0.5 rounded">{i.getValue()}</span> },
    { 
      accessorKey: 'name', 
      header: 'Asset Name',
      cell: (i: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-primary">
            {i.row.original.category === 'VEHICLE' ? <Truck size={16} /> : <Monitor size={16} />}
          </div>
          <span className="font-bold">{i.getValue()}</span>
        </div>
      )
    },
    { accessorKey: 'purchaseValue', header: 'Cost', cell: (i: any) => <AmountDisplay amount={i.getValue()} /> },
    { accessorKey: 'currentValue', header: 'Current Value', cell: (i: any) => <AmountDisplay amount={i.getValue()} colorize /> },
    { accessorKey: 'status', header: 'Status', cell: (i: any) => <StatusBadge status={i.getValue()} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Asset Register" 
        subtitle="Track fixed assets, equipment, and depreciation"
        breadcrumb={[{ label: 'Assets', href: '/assets' }, { label: 'Register' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Add Asset
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Assets', value: assets.length, icon: Building, color: 'bg-blue-500' },
          { label: 'Net Book Value', value: 4500000, icon: Zap, color: 'bg-green-500' },
          { label: 'Maintenance', value: 3, icon: Settings, color: 'bg-amber-500' },
          { label: 'Depreciation', value: 125000, icon: TrendingUp, color: 'bg-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.color} bg-opacity-10 ${stat.color.replace('bg-', 'text-')} flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
            <h4 className="text-2xl font-syne font-bold text-text-primary mt-1">
              {typeof stat.value === 'number' && i !== 0 ? `৳${stat.value.toLocaleString()}` : stat.value}
            </h4>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable columns={columns} data={assets} loading={loading} />
      </div>
    </div>
  );
}

function TrendingUp(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
}

function Settings(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
}
