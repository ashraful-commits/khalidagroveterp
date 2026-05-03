'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Stethoscope, Pill, MapPin, Phone, MessageSquare } from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/crm/dashboard');
        // This is a simple mockup since we haven't seeded specific CRM data yet
        setDoctors([
          { name: 'Dr. Ahmed Khan', specialty: 'General Physician', phone: '01711223344', area: 'Dhanmondi' },
          { name: 'Dr. Sarah Begum', specialty: 'Gynaecologist', phone: '01811223344', area: 'Gulshan' },
          { name: 'Dr. Rafiqul Islam', specialty: 'Cardiologist', phone: '01911223344', area: 'Uttara' },
        ] as any);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchDoctors();
  }, []);

  const columns = [
    { 
      accessorKey: 'name', 
      header: 'Doctor Name',
      cell: (i: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Stethoscope size={16} />
          </div>
          <span className="font-bold">{i.getValue()}</span>
        </div>
      )
    },
    { accessorKey: 'specialty', header: 'Specialty' },
    { accessorKey: 'phone', header: 'Phone', cell: (i: any) => <span className="flex items-center gap-1.5"><Phone size={14} className="text-text-muted" />{i.getValue()}</span> },
    { accessorKey: 'area', header: 'Area', cell: (i: any) => <span className="flex items-center gap-1.5"><MapPin size={14} className="text-text-muted" />{i.getValue()}</span> },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <button className="text-primary font-bold text-xs hover:bg-primary/5 px-3 py-1 rounded-md transition-colors flex items-center gap-1">
          <MessageSquare size={14} /> Log Visit
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Doctor List" 
        subtitle="Manage relationships and visit logs for medical professionals"
        breadcrumb={[{ label: 'CRM', href: '/crm' }, { label: 'Doctors' }]}
        actions={
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Add Doctor
          </button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable columns={columns} data={doctors} loading={loading} searchPlaceholder="Search by doctor name or specialty..." />
      </div>
    </div>
  );
}
