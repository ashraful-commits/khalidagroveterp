import { motion } from 'framer-motion';
import {
  PlusCircle, ShoppingCart, UserPlus,
  PackageCheck, AlertCircle, TrendingUp
} from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      type: 'sale',
      title: 'New Invoice Created',
      desc: 'Customer: Dhaka Pharmacy • ৳42,000',
      time: '12 mins ago',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      type: 'inventory',
      title: 'Stock Alert',
      desc: 'Paracetamol 500mg is below reorder level',
      time: '1 hour ago',
      icon: AlertCircle,
      color: 'red'
    },
    {
      type: 'hr',
      title: 'Employee Joined',
      desc: 'New MPO: Tanvir Ahmed added to Dhaka West',
      time: '3 hours ago',
      icon: UserPlus,
      color: 'purple'
    },
    {
      type: 'purchase',
      title: 'PO Approved',
      desc: 'Order #PO-2024-001 approved by Admin',
      time: '5 hours ago',
      icon: PackageCheck,
      color: 'green'
    },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-border shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-syne font-bold text-lg text-text-primary">Recent Activity</h3>
        <button className="text-xs font-bold text-primary hover:underline">View All</button>
      </div>
      <div className="space-y-6">
        {activities.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 group cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              {(() => {
                const Icon = item.icon;
                if (!Icon) return null;
                if (typeof Icon === 'function' || typeof Icon === 'object') {
                  return <Icon size={18} className="text-text-muted" />;
                }
                return Icon;
              })()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{item.title}</p>
                <span className="text-[10px] font-bold text-text-muted">{item.time}</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
