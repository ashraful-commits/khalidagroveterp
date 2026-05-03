'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { setCredentials } from '@/store/slices/authSlice';
import { loginSchema, LoginInput } from '@/lib/validations/auth';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await api.post('/auth/login', data);
      const { user, accessToken } = response.data.data;
      
      localStorage.setItem('token', accessToken);
      dispatch(setCredentials({ user, token: accessToken }));
      
      toast.success(`Welcome back, ${user.name}!`);
      
      // Role-based redirects for personalized dashboard experience
      switch (user.role) {
        case 'FACTORY_MANAGER':
          router.push('/production');
          break;
        case 'WAREHOUSE_MANAGER':
          router.push('/inventory');
          break;
        case 'RSM':
          router.push('/sales');
          break;
        case 'HR_ACCOUNTS':
          router.push('/hr');
          break;
        default:
          router.push('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-subtle relative overflow-hidden font-body">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-2xl shadow-primary/10 relative z-10 border border-white/50 backdrop-blur-sm"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-syne font-bold text-text-primary tracking-tight">AgroVet ERP</h2>
          <p className="text-text-muted mt-2 text-sm font-medium">Enterprise Management Suite</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
              <input 
                {...register('email')}
                type="email" 
                placeholder="admin@agrovet.com"
                className={cn(
                  "w-full pl-11 pr-4 py-3.5 bg-surface-2 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all text-sm",
                  errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                )}
              />
            </div>
            {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1 mt-1 uppercase tracking-wider">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
              <input 
                {...register('password')}
                type="password" 
                placeholder="••••••••"
                className={cn(
                  "w-full pl-11 pr-4 py-3.5 bg-surface-2 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all text-sm",
                  errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                )}
              />
            </div>
            {errors.password && <p className="text-[10px] font-bold text-red-500 ml-1 mt-1 uppercase tracking-wider">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                Access System <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-text-muted font-medium">
          Protected by AES-256 Encryption & MFA
        </p>
      </motion.div>
    </div>
  );
}
