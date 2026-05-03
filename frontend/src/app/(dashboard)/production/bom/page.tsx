'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, Play, Clipboard, 
  Layers, Settings, Box, CheckSquare
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';
import { AmountDisplay } from '@/components/ui/AmountDisplay';

export default function BOMPage() {
  const [boms, setBoms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoms = async () => {
      try {
        const res = await api.get('/production/boms');
        setBoms(res.data.data.boms || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchBoms();
  }, []);

  const columns = [
    { accessorKey: 'name', header: 'BOM Name', cell: (i: any) => <span className="font-bold text-text-primary">{i.getValue()}</span> },
    { accessorKey: 'finishedProduct.name', header: 'Product', cell: (i: any) => <span className="text-sm font-medium text-text-secondary">{i.getValue()}</span> },
    { 
      accessorKey: 'items', 
      header: 'Ingredients', 
      cell: (i: any) => <span className="text-xs bg-surface-3 px-2 py-1 rounded-md">{i.getValue()?.length || 0} Items</span> 
    },
    { 
      id: 'actions',
      header: '',
      cell: () => (
        <button className="text-primary text-xs font-bold hover:underline">View Sheet</button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Bill of Materials (BOM)" 
        subtitle="Manage product formulations and ingredient sheets"
        breadcrumb={[{ label: 'Production', href: '/production' }, { label: 'BOM' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Create BOM Sheet
          </button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={boms} 
          loading={loading}
          searchPlaceholder="Search BOMs by product name..."
        />
      </div>
    </div>
  );
}

function Plus(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
}
