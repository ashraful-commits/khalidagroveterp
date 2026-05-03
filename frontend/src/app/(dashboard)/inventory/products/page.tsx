'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package, Barcode, Layers, Tag } from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';
import { BarcodeScanner } from '@/components/ui/BarcodeScanner';
import { FormModal } from '@/components/ui/FormModal';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { useForm } from 'react-hook-form';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/inventory/products');
      setProducts(res.data.data.products);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const onSubmit = async (data: any) => {
    try {
      await api.post('/inventory/products', data);
      reset();
      setModalOpen(false);
      fetchProducts();
    } catch (e) { console.error(e); }
  };

  const columns = [
    { accessorKey: 'sku', header: 'SKU', cell: (i: any) => <span className="font-mono text-xs bg-surface-3 px-2 py-0.5 rounded">{i.getValue()}</span> },
    { accessorKey: 'name', header: 'Product Name', cell: (i: any) => <span className="font-bold">{i.getValue()}</span> },
    { accessorKey: 'category.name', header: 'Category', cell: (i: any) => <span className="text-xs font-medium bg-surface-2 px-2 py-0.5 rounded-full">{i.getValue() || '—'}</span> },
    { accessorKey: 'price', header: 'Price', cell: (i: any) => <AmountDisplay amount={i.getValue() ?? 0} /> },
    { accessorKey: 'reorderLevel', header: 'Reorder At', cell: (i: any) => <span className="font-mono font-bold text-danger">{i.getValue()}</span> },
  ];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader
        title="Products"
        subtitle="Manage your product catalog and SKU details"
        breadcrumb={[{ label: 'Inventory', href: '/inventory' }, { label: 'Products' }]}
        actions={
          <div className="flex gap-3">
            <BarcodeScanner onScan={(c) => console.log(c)} />
            <button onClick={() => setModalOpen(true)} className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" /> New Product
            </button>
          </div>
        }
      />

      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <DataTable
          columns={columns}
          data={products}
          loading={loading}
          searchPlaceholder="Search products..."
        />
      </div>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Product"
        footer={
          <button onClick={handleSubmit(onSubmit)} className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium">Create Product</button>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1.5">Product Name *</label>
              <input {...register('name', { required: true })} className="w-full px-3 py-2 border border-border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">SKU (Auto-gen if empty)</label>
              <input {...register('sku')} className="w-full px-3 py-2 border border-border rounded-lg font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Category ID *</label>
              <input {...register('categoryId', { required: true })} className="w-full px-3 py-2 border border-border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Price (৳)</label>
              <input {...register('price')} type="number" step="0.01" className="w-full px-3 py-2 border border-border rounded-lg font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Reorder Level</label>
              <input {...register('reorderLevel')} type="number" className="w-full px-3 py-2 border border-border rounded-lg font-mono" />
            </div>
          </div>
        </div>
      </FormModal>
    </motion.div>
  );
}
