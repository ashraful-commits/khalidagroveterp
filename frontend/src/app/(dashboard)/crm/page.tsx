'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, ShoppingBag, MapPin, Calendar, 
  Plus, Phone, Search, Filter, 
  UserCheck, Activity, MessageSquare
} from 'lucide-react';
import { KPICard } from '@/components/ui/KPICard';
import { EmptyState } from '@/components/tables/EmptyState';

export default function CRMPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'DOCTOR' | 'CHEMIST'>('DOCTOR');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-black text-text-primary tracking-tight">Relationship Management</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Doctor visits, chemist mapping, and territory coverage tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary transition-all">
            <Activity size={16} /> Live Visit Map
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20">
            <Plus size={18} /> Register New Contact
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Doctors" 
          value="1,240" 
          trend="+12" 
          trendType="up"
          icon={Stethoscope}
          color="blue"
        />
        <KPICard 
          title="Total Chemists" 
          value="3,850" 
          trend="+42" 
          trendType="up"
          icon={ShoppingBag}
          color="green"
        />
        <KPICard 
          title="Field Visits Today" 
          value="142" 
          trend="82% Target" 
          trendType="neutral"
          icon={Calendar}
          color="orange"
        />
        <KPICard 
          title="Region Coverage" 
          value="92.4%" 
          trend="+1.2%" 
          trendType="up"
          icon={MapPin}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main CRM View */}
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-1/30">
              <div className="flex bg-surface-1 p-1 rounded-2xl">
                <button 
                  onClick={() => setActiveTab('DOCTOR')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'DOCTOR' ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                >
                  🩺 Doctor Network
                </button>
                <button 
                  onClick={() => setActiveTab('CHEMIST')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'CHEMIST' ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                >
                  💊 Chemist Network
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search name or ID..." 
                    className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="p-2 bg-white border border-border rounded-xl text-text-muted hover:text-primary transition-colors">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            
            <div className="min-h-[400px] flex items-center justify-center">
              <EmptyState 
                title={`No ${activeTab === 'DOCTOR' ? 'Doctors' : 'Chemists'} found`}
                description="The CRM network is currently being synchronized with the field force data."
                actionLabel="Sync Now"
                onAction={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Recent Visits */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <h3 className="font-syne font-bold text-lg mb-6">Recent Field Activities</h3>
            <div className="space-y-6">
              {[
                { name: 'Dr. Anisur Rahman', MPO: 'Kamrul Ahsan', time: '10 mins ago', type: 'Prescription Follow-up' },
                { name: 'Lazz Pharma (Dhanmondi)', MPO: 'Sabbir Ahmed', time: '45 mins ago', type: 'Stock Verification' },
                { name: 'Dr. Nusrat Jahan', MPO: 'Tanvir Ahmed', time: '2 hours ago', type: 'New Launch Promo' },
              ].map((visit, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{visit.name}</p>
                    <span className="text-[10px] font-bold text-text-muted">{visit.time}</span>
                  </div>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-2">Visitor: {visit.MPO}</p>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-surface-2 rounded text-[9px] font-black text-text-muted uppercase tracking-tighter">
                      {visit.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-surface-1 hover:bg-surface-2 border border-border rounded-xl text-xs font-bold text-text-secondary transition-all">
              Full Visit Logs
            </button>
          </div>

          {/* Territory Map Highlight */}
          <div className="bg-text-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-10 -mt-10 blur-2xl" />
            <div className="flex items-center gap-2 mb-4">
              <UserCheck size={24} className="text-primary" />
              <h4 className="font-syne font-bold text-lg">MPO Attendance</h4>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Dhaka Division</span>
              <span className="text-sm font-black text-primary">142/145 Live</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '98%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
