import { useAuthStore } from '@/store/authStore';

export const usePermission = () => {
  const { user } = useAuthStore();
  const role = user?.role;

  const isAdmin = () => role === 'SUPER_ADMIN';

  const canAccess = (module: string): boolean => {
    if (isAdmin()) return true;

    // Based on requirements from Section 3.1
    switch (module) {
      case 'purchase':
        return ['FACTORY_MANAGER'].includes(role || '');
      case 'sales':
        return ['FACTORY_MANAGER', 'WAREHOUSE_MANAGER', 'RSM'].includes(role || '');
      case 'inventory':
        return ['FACTORY_MANAGER', 'WAREHOUSE_MANAGER'].includes(role || '');
      case 'accounting':
        return ['HR_ACCOUNTS'].includes(role || '');
      case 'hr':
        return ['HR_ACCOUNTS', 'RSM'].includes(role || '');
      case 'production':
        return ['FACTORY_MANAGER'].includes(role || '');
      case 'crm':
        return ['RSM'].includes(role || '');
      case 'reports':
        return ['HR_ACCOUNTS'].includes(role || '');
      default:
        return false;
    }
  };

  const canEdit = (module: string): boolean => {
    if (isAdmin()) return true;
    
    // RSM can view sales but edit CRM
    if (role === 'RSM' && module === 'sales') return false;
    
    return canAccess(module);
  };

  return {
    canAccess,
    canEdit,
    isAdmin,
  };
};
