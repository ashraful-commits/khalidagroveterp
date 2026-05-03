'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Wrench, DollarSign, AlertTriangle, Plus } from 'lucide-react';
import api from '@/lib/api';
import { KPICard } from '@/components/ui/KPICard';
import { DataTable } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function AssetsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/assets/dashboard').then(r => setData(r.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const assetColumns = [
    { accessorKey: 'code', header: 'Code', cell: (i: any) => <span className="font-mono text-xs bg-surface-3 px-2 py-0.5 rounded">{i.getValue()}</span> },
    { accessorKey: 'name', header: 'Asset Name' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'purchaseValue', header: 'Value', cell: (i: any) => <span className="font-mono">৳{Number(i.getValue() || 0).toLocaleString()}</span> },
    { accessorKey: 'status', header: 'Status', cell: (i: any) => <StatusBadge status={i.getValue() || 'ACTIVE'} size="sm" /> },
  ];

  if (loading) return <div className="flex h-[70vh] items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-syne font-bold text-text-primary">Asset Management</h1>
          <p className="text-text-secondary mt-1">Register assets, track maintenance and manage depreciation.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-primary/20"><Plus className="w-4 h-4" /> Register Asset</button>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Assets" value={data?.metrics?.total ?? 0} icon={<Box className="w-6 h-6" />} trend="neutral" />
        <KPICard title="Total Value" value={`৳${(data?.metrics?.totalValue ?? 0).toLocaleString()}`} icon={<DollarSign className="w-6 h-6" />} trend="neutral" />
        <KPICard title="Under Maintenance" value={data?.metrics?.underMaintenance ?? 0} icon={<Wrench className="w-6 h-6" />} trend="neutral" />
        <KPICard title="Fully Depreciated" value={data?.metrics?.fullyDepreciated ?? 0} icon={<AlertTriangle className="w-6 h-6" />} trend="neutral" />
      </motion.div>

      <motion.div variants={fadeUp} className="bg-surface rounded-xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-syne font-bold text-text-primary mb-4">Asset Register</h3>
        <DataTable columns={assetColumns} data={data?.assets ?? []} />
      </motion.div>
    </motion.div>
  );
}
