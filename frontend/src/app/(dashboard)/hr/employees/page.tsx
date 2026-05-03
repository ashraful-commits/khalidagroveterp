'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Eye, UserCircle, Phone, Banknote } from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';
import { FormModal } from '@/components/ui/FormModal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AmountDisplay } from '@/components/ui/AmountDisplay';
import { useForm } from 'react-hook-form';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/hr/employees?limit=100');
      setEmployees(res.data.data.employees);
      setTotal(res.data.data.meta?.total ?? 0);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      await api.post('/hr/employees', data);
      reset();
      setModalOpen(false);
      fetchEmployees();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const columns = [
    { accessorKey: 'empId', header: 'EMP ID', cell: (i: any) => <span className="font-mono text-xs bg-surface-3 px-2 py-0.5 rounded">{i.getValue()}</span> },
    {
      accessorKey: 'name', header: 'Employee',
      cell: (i: any) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
            {i.getValue()?.[0]?.toUpperCase()}
          </div>
          <span className="font-medium text-text-primary">{i.getValue()}</span>
        </div>
      )
    },
    { accessorKey: 'department.name', header: 'Department', cell: (i: any) => <span className="text-xs font-medium text-info bg-blue-50 px-2 py-0.5 rounded-full">{i.getValue() ?? '—'}</span> },
    { accessorKey: 'basicSalary', header: 'Basic Salary', cell: (i: any) => <AmountDisplay amount={i.getValue() ?? 0} /> },
    { accessorKey: 'status', header: 'Status', cell: (i: any) => <StatusBadge status={i.getValue() || 'ACTIVE'} size="sm" /> },
    { accessorKey: 'joinDate', header: 'Join Date', cell: (i: any) => i.getValue() ? new Date(i.getValue()).toLocaleDateString('en-GB') : '—' },
    {
      id: 'actions', header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 rounded-md hover:bg-blue-100 text-blue-600 transition-colors"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 rounded-md hover:bg-amber-100 text-amber-600 transition-colors"><Pencil className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Employees"
        subtitle={`${total} active employees`}
        breadcrumb={[{ label: 'HR', href: '/hr' }, { label: 'Employees' }]}
        actions={
          <button onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-4 h-4" /> New Employee
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <DataTable
          columns={columns}
          data={employees}
          loading={loading}
          searchPlaceholder="Search employees..."
          onExportExcel={() => {}}
          onExportPDF={() => {}}
          emptyTitle="No employees yet"
          emptyDescription="Add your first employee to begin HR management."
        />
      </div>

      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); reset(); }}
        title="New Employee"
        subtitle="Enter the employee's personal and job details"
        size="lg"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:bg-surface-2 transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} disabled={saving}
              className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium disabled:opacity-60 transition-colors">
              {saving ? 'Saving...' : 'Add Employee'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-1.5">Full Name *</label>
            <input {...register('name', { required: true })} placeholder="e.g. Rahim Uddin"
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Department ID *</label>
            <input {...register('departmentId', { required: true })} placeholder="dept-uuid"
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Join Date</label>
            <input {...register('joinDate')} type="date"
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-1.5">Basic Salary (৳) *</label>
            <input {...register('basicSalary', { required: true })} type="number" step="0.01" placeholder="0.00"
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>
      </FormModal>
    </motion.div>
  );
}
