'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Save, ArrowLeft, Search, 
  User, Calendar, Hash, FileText 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { toast } from 'react-hot-toast';
import styled from '@emotion/styled';

const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  padding: 32px;
`;

const ItemRow = styled(motion.div)`
  display: grid;
  grid-template-cols: 2fr 1fr 1.2fr 1.2fr 0.4fr;
  gap: 16px;
  align-items: end;
  padding: 16px;
  border-radius: 12px;
  &:hover { background: #f8fafc; }
`;

export default function CreatePurchaseOrder() {
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [items, setItems] = useState([{ productId: '', quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [vRes, pRes] = await Promise.all([
        api.get('/purchase/vendors'),
        api.get('/inventory/products')
      ]);
      setVendors(vRes.data.data.vendors);
      setProducts(pRes.data.data.products);
    };
    fetchData();
  }, []);

  const addItem = () => setItems([...items, { productId: '', quantity: 1, price: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const onSubmit = async () => {
    if (!selectedVendor) return toast.error('Please select a vendor');
    if (items.some(i => !i.productId)) return toast.error('Please select products for all rows');
    
    setLoading(true);
    try {
      await api.post('/purchase/orders', { vendorId: selectedVendor, items });
      toast.success('Purchase Order created successfully!');
      router.push('/purchase');
    } catch (e) { toast.error('Failed to create order'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader 
        title="New Purchase Order" 
        subtitle="Create a formal procurement request for raw materials"
        breadcrumb={[{ label: 'Purchase', href: '/purchase' }, { label: 'New Order' }]}
        actions={
          <button onClick={() => router.back()} className="text-text-secondary font-bold text-sm flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Cancel
          </button>
        }
      />

      <FormCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-text-primary flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Select Vendor *
            </label>
            <select 
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="w-full h-12 px-4 bg-surface-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="">Choose a vendor...</option>
              {vendors.map((v: any) => <option key={v.id} value={v.id}>{v.name} ({v.code})</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-text-primary flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Order Date
              </label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full h-12 px-4 bg-surface-2 border border-border rounded-xl outline-none" />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-text-primary flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" /> Reference
              </label>
              <input placeholder="REF-000" className="w-full h-12 px-4 bg-surface-2 border border-border rounded-xl outline-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-[2fr_1fr_1.2fr_1.2fr_0.4fr] gap-4 px-4 text-xs font-bold text-text-muted uppercase tracking-wider">
            <span>Product</span>
            <span>Quantity</span>
            <span>Unit Price (৳)</span>
            <span>Total</span>
            <span></span>
          </div>
          
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <ItemRow key={index} layout>
                <select 
                  value={item.productId}
                  onChange={(e) => updateItem(index, 'productId', e.target.value)}
                  className="h-11 px-3 bg-white border border-border rounded-lg outline-none focus:border-primary"
                >
                  <option value="">Select Product</option>
                  {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input 
                  type="number" 
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                  className="h-11 px-3 bg-white border border-border rounded-lg outline-none text-center font-mono"
                />
                <input 
                  type="number" 
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                  className="h-11 px-3 bg-white border border-border rounded-lg outline-none font-mono"
                />
                <div className="h-11 flex items-center px-3 font-bold text-text-primary bg-surface-2 rounded-lg">
                  ৳{(item.quantity * item.price).toLocaleString()}
                </div>
                <button onClick={() => removeItem(index)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </ItemRow>
            ))}
          </AnimatePresence>

          <button 
            onClick={addItem}
            className="flex items-center gap-2 text-primary font-bold text-sm px-4 py-2 hover:bg-primary/5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col items-end gap-6">
          <div className="text-right space-y-1">
            <span className="text-sm text-text-secondary font-medium">Grand Total</span>
            <div className="text-4xl font-syne font-bold text-text-primary">
              <AmountDisplay amount={calculateTotal()} />
            </div>
          </div>
          
          <button 
            onClick={onSubmit}
            disabled={loading}
            className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center gap-3 disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {loading ? 'Saving...' : 'Confirm Order'}
          </button>
        </div>
      </FormCard>
    </div>
  );
}
