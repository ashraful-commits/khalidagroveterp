'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Eye, Phone, Mail, MapPin } from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';
import { FormModal } from '@/components/ui/FormModal';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { useForm } from 'react-hook-form';

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await api.get('/purchase/vendors?limit=100');
      setVendors(res.data.data.vendors);
      setTotal(res.data.data.meta?.total ?? 0);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVendors(); }, []);

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      await api.post('/purchase/vendors', data);
      reset();
      setModalOpen(false);
      fetchVendors();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const columns = [
    { accessorKey: 'code', header: 'Code', cell: (i: any) => <span className="font-mono text-xs bg-surface-3 px-2 py-0.5 rounded">{i.getValue()}</span> },
    { accessorKey: 'name', header: 'Vendor Name', cell: (i: any) => <span className="font-bold text-text-primary">{i.getValue()}</span> },
    { accessorKey: 'phone', header: 'Phone', cell: (i: any) => i.getValue() ? <span className="flex items-center gap-1.5 text-text-secondary"><Phone className="w-3.5 h-3.5" />{i.getValue()}</span> : '—' },
    { accessorKey: 'email', header: 'Email', cell: (i: any) => i.getValue() ? <span className="flex items-center gap-1.5 text-text-secondary"><Mail className="w-3.5 h-3.5" />{i.getValue()}</span> : '—' },
    { accessorKey: 'balance', header: 'Balance', cell: (i: any) => <AmountDisplay amount={i.getValue() ?? 0} colorize /> },
    {
      id: 'actions', header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md bg-surface-2 hover:bg-blue-100 text-blue-600 transition-colors" title="View Ledger"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 rounded-md bg-surface-2 hover:bg-amber-100 text-amber-600 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Vendors"
        subtitle={`${total} vendors registered`}
        breadcrumb={[{ label: 'Purchase', href: '/purchase' }, { label: 'Vendors' }]}
        actions={
          <button onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-4 h-4" /> New Vendor
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <DataTable
          columns={columns}
          data={vendors}
          loading={loading}
          searchPlaceholder="Search vendors..."
          onExportExcel={() => {}}
          emptyTitle="No vendors yet"
          emptyDescription="Add your first vendor to start managing purchases."
        />
      </div>

      {/* Create Vendor Modal */}
      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); reset(); }}
        title="New Vendor"
        subtitle="Fill in the vendor details below"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:bg-surface-2 transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} disabled={saving}
              className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium disabled:opacity-60 transition-colors">
              {saving ? 'Saving...' : 'Create Vendor'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Vendor Name *</label>
            <input {...register('name', { required: true })} placeholder="e.g. RFL Agro Supplies"
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Phone</label>
              <input {...register('phone')} placeholder="+880-..." type="tel"
                className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
              <input {...register('email')} placeholder="vendor@email.com" type="email"
                className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Address</label>
            <textarea {...register('address')} rows={2} placeholder="Full address..."
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Opening Balance (৳)</label>
            <input {...register('openingBalance')} placeholder="0.00" type="number" step="0.01"
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>
      </FormModal>
    </motion.div>
  );
}
