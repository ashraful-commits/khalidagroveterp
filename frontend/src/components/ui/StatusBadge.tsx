import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();

  const getStatusColor = () => {
    switch (normalizedStatus) {
      case 'APPROVED':
      case 'ACTIVE':
      case 'PAID':
      case 'PASS':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING':
      case 'DRAFT':
      case 'IN_PROGRESS':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'REJECTED':
      case 'CANCELLED':
      case 'FAIL':
      case 'OVERDUE':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'DELIVERED':
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PARTIAL':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDotColor = () => {
    switch (normalizedStatus) {
      case 'APPROVED':
      case 'ACTIVE':
      case 'PAID':
      case 'PASS':
        return 'bg-green-500';
      case 'PENDING':
      case 'DRAFT':
      case 'IN_PROGRESS':
        return 'bg-amber-500';
      case 'REJECTED':
      case 'CANCELLED':
      case 'FAIL':
      case 'OVERDUE':
        return 'bg-red-500';
      case 'DELIVERED':
      case 'COMPLETED':
        return 'bg-blue-500';
      case 'PARTIAL':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-mono font-medium",
      getStatusColor(),
      sizeClasses,
      className
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full", getDotColor())} />
      {status}
    </span>
  );
}
