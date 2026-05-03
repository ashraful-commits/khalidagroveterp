'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import api from '@/lib/api';
import { DataTable } from '@/components/tables/DataTable';
import { PageHeader } from '@/components/layout/PageHeader';
import { FormModal } from '@/components/ui/FormModal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useForm } from 'react-hook-form';

export default function LeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('');
  const [confirm, setConfirm] = useState<{ open: boolean; id: string; action: string }>({ open: false, id: '', action: '' });
  const { register, handleSubmit, reset } = useForm();

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/hr/leaves${filter ? `?status=${filter}` : ''}`);
      setLeaves(res.data.data.leaves);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLeaves(); }, [filter]);

  const handleAction = async () => {
    try {
      await api.patch(`/hr/leaves/${confirm.id}/approve`, { action: confirm.action });
      setConfirm({ open: false, id: '', action: '' });
      fetchLeaves();
    } catch (e) { console.error(e); }
  };

  const columns = [
    { accessorKey: 'employee.name', header: 'Employee', cell: (i: any) => <span className="font-medium">{i.getValue() ?? '—'}</span> },
    { accessorKey: 'employee.empId', header: 'EMP ID', cell: (i: any) => <span className="font-mono text-xs bg-surface-3 px-2 py-0.5 rounded">{i.getValue() ?? '—'}</span> },
    { accessorKey: 'type', header: 'Leave Type', cell: (i: any) => <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">{i.getValue()}</span> },
    { accessorKey: 'startDate', header: 'From', cell: (i: any) => i.getValue() ? new Date(i.getValue()).toLocaleDateString('en-GB') : '—' },
    { accessorKey: 'endDate', header: 'To', cell: (i: any) => i.getValue() ? new Date(i.getValue()).toLocaleDateString('en-GB') : '—' },
    { accessorKey: 'status', header: 'Status', cell: (i: any) => <StatusBadge status={i.getValue() || 'PENDING'} size="sm" /> },
    {
      id: 'actions', header: 'Actions',
      cell: (i: any) => {
        const status = i.row.original.status;
        if (status !== 'PENDING') return <span className="text-xs text-text-muted">—</span>;
        return (
          <div className="flex items-center gap-1.5">
            <button onClick={() => setConfirm({ open: true, id: i.row.original.id, action: 'APPROVED' })}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-green-100 text-green-700 hover:bg-green-200 text-xs font-medium transition-colors">
              <CheckCircle className="w-3.5 h-3.5" /> Approve
            </button>
            <button onClick={() => setConfirm({ open: true, id: i.row.original.id, action: 'REJECTED' })}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 text-xs font-medium transition-colors">
              <XCircle className="w-3.5 h-3.5" /> Reject
            </button>
          </div>
        );
      }
    }
  ];

  const filterTabs = ['', 'PENDING', 'APPROVED', 'REJECTED'];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Leave Management"
        subtitle="Review and manage employee leave requests"
        breadcrumb={[{ label: 'HR', href: '/hr' }, { label: 'Leaves' }]}
        actions={
          <button onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-4 h-4" /> Apply Leave
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {filterTabs.map(tab => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === tab ? 'bg-primary text-white' : 'bg-surface-2 text-text-secondary hover:bg-surface-3'}`}>
              {tab === '' ? 'All' : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <DataTable
          columns={columns}
          data={leaves}
          loading={loading}
          searchPlaceholder="Search leaves..."
          emptyTitle="No leave requests"
          emptyDescription="No leave requests matching the selected filter."
        />
      </div>

      {/* Apply Leave Modal */}
      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); reset(); }}
        title="Apply Leave"
        subtitle="Submit a new leave request"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:bg-surface-2">Cancel</button>
            <button onClick={handleSubmit(async (data) => {
              setSaving(true);
              try { await api.post('/hr/leaves', data); reset(); setModalOpen(false); fetchLeaves(); }
              catch (e) { console.error(e); }
              finally { setSaving(false); }
            })} disabled={saving} className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-60">
              {saving ? 'Submitting...' : 'Submit'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1.5">Employee ID *</label>
            <input {...register('employeeId', { required: true })} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div><label className="block text-sm font-medium mb-1.5">Leave Type *</label>
            <select {...register('type', { required: true })} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="CASUAL">Casual</option>
              <option value="SICK">Sick</option>
              <option value="ANNUAL">Annual</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1.5">From Date *</label>
              <input {...register('startDate', { required: true })} type="date" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div><label className="block text-sm font-medium mb-1.5">To Date *</label>
              <input {...register('endDate', { required: true })} type="date" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={confirm.open}
        onClose={() => setConfirm({ open: false, id: '', action: '' })}
        onConfirm={handleAction}
        title={confirm.action === 'APPROVED' ? 'Approve Leave?' : 'Reject Leave?'}
        message={`Are you sure you want to ${confirm.action === 'APPROVED' ? 'approve' : 'reject'} this leave request?`}
        variant={confirm.action === 'APPROVED' ? 'success' : 'danger'}
        confirmLabel={confirm.action === 'APPROVED' ? 'Approve' : 'Reject'}
      />
    </motion.div>
  );
}
