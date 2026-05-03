'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pill, Store, MapPin, Phone, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';

export default function ChemistsPage() {
  const [chemists, setChemists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setChemists([
      { name: 'Model Pharmacy', owner: 'Mr. Jahangir', phone: '01711223344', area: 'Dhanmondi', type: 'RETAIL' },
      { name: 'Lazz Pharma', owner: 'Manager', phone: '01811223344', area: 'Gulshan', type: 'WHOLESALE' },
      { name: 'Popular Medicine', owner: 'Mr. Siddique', phone: '01911223344', area: 'Uttara', type: 'RETAIL' },
    ] as any);
    setLoading(false);
  }, []);

  const columns = [
    { 
      accessorKey: 'name', 
      header: 'Pharmacy Name',
      cell: (i: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
            <Store size={16} />
          </div>
          <span className="font-bold">{i.getValue()}</span>
        </div>
      )
    },
    { accessorKey: 'owner', header: 'Owner/Contact' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'area', header: 'Area' },
    { 
      accessorKey: 'type', 
      header: 'Type',
      cell: (i: any) => (
        <span className="px-2 py-0.5 rounded bg-surface-3 text-[10px] font-bold uppercase">{i.getValue()}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Chemist & Pharmacy List" 
        subtitle="Manage distribution points and retail partners"
        breadcrumb={[{ label: 'CRM', href: '/crm' }, { label: 'Chemists' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Add Chemist
          </button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable columns={columns} data={chemists} loading={loading} searchPlaceholder="Search by pharmacy name or area..." />
      </div>
    </div>
  );
}
