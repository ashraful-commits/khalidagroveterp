'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.push('/login');
    }
  }, [isClient, isAuthenticated, router]);

  if (!isClient) return null;

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (user?.role !== 'SUPER_ADMIN' && !allowedRoles.includes(user?.role || '')) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              You do not have permission to view this page.
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
