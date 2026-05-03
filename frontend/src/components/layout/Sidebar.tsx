'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, 
  ChevronDown, LogOut, ShieldCheck, ShoppingBag,
  Calculator, Factory, Building, MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => (state as any).ui.isSidebarOpen);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { t } = useTranslation();

  const menuItems = [
    { label: t('dashboard'), icon: LayoutDashboard, href: '/' },
    { label: t('sales'), icon: ShoppingCart, href: '/sales', subItems: [
      { title: 'Customers', href: '/sales/customers' },
      { title: 'Invoices', href: '/sales/invoices' },
      { title: 'Quotations', href: '/sales/quotations' },
      { title: 'Collections', href: '/sales/collections' },
      { title: 'Returns', href: '/sales/returns' },
      { title: 'Sales Targets', href: '/sales/target' },
    ]},
    { label: t('purchase'), icon: ShoppingBag, href: '/purchase', subItems: [
      { title: 'Vendors', href: '/purchase/vendors' },
      { title: 'Requisitions', href: '/purchase/requisitions' },
      { title: 'Quotations', href: '/purchase/quotations' },
      { title: 'Purchase Orders', href: '/purchase/orders' },
      { title: 'Payments', href: '/purchase/payments' },
      { title: 'GRN', href: '/purchase/grn' },
      { title: 'Returns', href: '/purchase/returns' },
    ]},
    { label: t('inventory'), icon: Package, href: '/inventory', subItems: [
      { title: 'Products', href: '/inventory/products' },
      { title: 'Warehouses', href: '/inventory/warehouses' },
      { title: 'Stock Ledger', href: '/inventory/stock' },
      { title: 'Transfers', href: '/inventory/transfer' },
      { title: 'QA Management', href: '/inventory/qa' },
    ]},
    { label: t('accounting'), icon: Calculator, href: '/accounting', subItems: [
      { title: 'Chart of Accounts', href: '/accounting/coa' },
      { title: 'Finance & Banking', href: '/accounting/finance' },
      { title: 'Journals', href: '/accounting/journals' },
      { title: 'Expenses', href: '/accounting/expenses' },
      { title: 'Reports', href: '/accounting/reports' },
    ]},
    { label: t('hr'), icon: Users, href: '/hr', subItems: [
      { title: 'Employees', href: '/hr/employees' },
      { title: 'Attendance', href: '/hr/attendance' },
      { title: 'Leaves', href: '/hr/leaves' },
      { title: 'Payroll', href: '/hr/payroll' },
    ]},
    { label: t('production'), icon: Factory, href: '/production', subItems: [
      { title: 'BOM Management', href: '/production/boms' },
      { title: 'Production Orders', href: '/production/orders' },
      { title: 'Production Entry', href: '/production/entry' },
      { title: 'Live Tracking', href: '/production/tracking' },
    ]},
    { label: t('assets'), icon: Building, href: '/assets', subItems: [
      { title: 'Registration', href: '/assets/registration' },
      { title: 'Maintenance', href: '/assets/maintenance' },
    ]},
    { label: t('crm'), icon: MessageSquare, href: '/crm', subItems: [
      { title: 'Doctors', href: '/crm/doctor' },
      { title: 'Chemists', href: '/crm/chemist' },
    ]},
  ];

  const toggleExpand = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleSidebar())}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 288 : 80,
          x: isOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? -288 : 0)
        }}
        className={cn(
          "bg-white border-r border-border flex flex-col h-screen fixed top-0 z-50 overflow-hidden transition-all",
          !isOpen && "md:w-20",
          isOpen ? "left-0" : "-left-72 md:left-0"
        )}
      >
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="text-white w-5 h-5" />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 font-syne font-bold text-lg text-text-primary whitespace-nowrap"
            >
              AgroVet ERP
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.subItems?.some(s => pathname === s.href));
            const isExpanded = expandedItem === item.label;

            return (
              <li key={item.label}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                        isActive ? "bg-primary/5 text-primary" : "text-text-secondary hover:bg-surface-2"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-primary" : "group-hover:text-primary")} />
                      {isOpen && (
                        <>
                          <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                          <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                        </>
                      )}
                    </button>
                    <AnimatePresence>
                      {isOpen && isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-1 ml-9 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className={cn(
                                  "block px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                  pathname === sub.href ? "text-primary bg-primary/5" : "text-text-muted hover:text-primary hover:bg-surface-2"
                                )}
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                      isActive ? "bg-primary/5 text-primary" : "text-text-secondary hover:bg-surface-2"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-primary" : "group-hover:text-primary")} />
                    {isOpen && <span className="flex-1 text-sm font-medium">{item.label}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-red-50 hover:text-red-600 transition-all group">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">{t('logout')}</span>}
        </button>
      </div>
    </motion.aside>
    </>
  );
}
