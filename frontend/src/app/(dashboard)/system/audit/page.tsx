'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, User, Activity, Clock, 
  Database, AlertCircle, Search
} from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/tables/DataTable';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock audit logs
    setLogs([
      { user: 'Admin User', action: 'CREATE_INVOICE', module: 'SALES', timestamp: new Date().toISOString(), ip: '192.168.1.1' },
      { user: 'Factory Manager', action: 'APPROVE_PO', module: 'PURCHASE', timestamp: new Date(Date.now() - 3600000).toISOString(), ip: '192.168.1.5' },
      { user: 'Admin User', action: 'UPDATE_PRODUCT', module: 'INVENTORY', timestamp: new Date(Date.now() - 7200000).toISOString(), ip: '192.168.1.1' },
    ] as any);
    setLoading(false);
  }, []);

  const columns = [
    { 
      accessorKey: 'user', 
      header: 'User',
      cell: (i: any) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-surface-3 flex items-center justify-center"><User size={12} /></div>
          <span className="font-bold text-sm">{i.getValue()}</span>
        </div>
      )
    },
    { 
      accessorKey: 'action', 
      header: 'Action',
      cell: (i: any) => <span className="font-mono text-xs font-bold text-primary">{i.getValue()}</span>
    },
    { accessorKey: 'module', header: 'Module' },
    { accessorKey: 'ip', header: 'IP Address', cell: (i: any) => <span className="text-xs text-text-muted">{i.getValue()}</span> },
    { 
      accessorKey: 'timestamp', 
      header: 'Time',
      cell: (i: any) => (
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock size={12} /> {new Date(i.getValue()).toLocaleString()}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Security Audit Logs" 
        subtitle="Complete trail of system activity and user actions"
        breadcrumb={[{ label: 'System', href: '#' }, { label: 'Audit Logs' }]}
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden">
        <DataTable columns={columns} data={logs} loading={loading} />
      </div>
    </div>
  );
}
