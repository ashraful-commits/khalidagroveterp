'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, MapPin, Phone, CreditCard } from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';
import { FormModal } from '@/components/ui/FormModal';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { useForm } from 'react-hook-form';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/sales/dashboard'); // Assuming customers are in sales dashboard or create dedicated route
      // For now, let's assume a dedicated route exists or we use the dashboard one
      // I'll create the API route for customers next
      const resCust = await api.get('/api/sales/customers').catch(() => ({ data: { data: { customers: [] } } }));
      setCustomers(resCust.data.data.customers || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const onSubmit = async (data: any) => {
    try {
      await api.post('/api/sales/customers', data);
      reset();
      setModalOpen(false);
      fetchCustomers();
    } catch (e) { console.error(e); }
  };

  const columns = [
    { accessorKey: 'code', header: 'Code', cell: (i: any) => <span className="font-mono text-xs bg-surface-3 px-2 py-0.5 rounded">{i.getValue()}</span> },
    { accessorKey: 'name', header: 'Customer Name', cell: (i: any) => <span className="font-bold">{i.getValue()}</span> },
    { accessorKey: 'phone', header: 'Phone', cell: (i: any) => i.getValue() || '—' },
    { accessorKey: 'area', header: 'Area', cell: (i: any) => <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-text-muted" />{i.getValue() || '—'}</span> },
    { accessorKey: 'balance', header: 'Balance', cell: (i: any) => <AmountDisplay amount={i.getValue() ?? 0} colorize /> },
  ];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader
        title="Customers"
        subtitle="Manage dealer and pharmacy network"
        breadcrumb={[{ label: 'Sales', href: '/sales' }, { label: 'Customers' }]}
        actions={
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" /> New Customer
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <DataTable
          columns={columns}
          data={customers}
          loading={loading}
          searchPlaceholder="Search customers..."
        />
      </div>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Customer"
        footer={
          <button onClick={handleSubmit(onSubmit)} className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium">Add Customer</button>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Customer Name *</label>
            <input {...register('name', { required: true })} className="w-full px-3 py-2 border border-border rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone</label>
              <input {...register('phone')} className="w-full px-3 py-2 border border-border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Area</label>
              <input {...register('area')} className="w-full px-3 py-2 border border-border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Credit Limit (৳)</label>
              <input {...register('creditLimit')} type="number" className="w-full px-3 py-2 border border-border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Opening Balance (৳)</label>
              <input {...register('openingBalance')} type="number" className="w-full px-3 py-2 border border-border rounded-lg" />
            </div>
          </div>
        </div>
      </FormModal>
    </motion.div>
  );
}
