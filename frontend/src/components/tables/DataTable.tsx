'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ColumnDef, flexRender, getCoreRowModel, useReactTable,
  getPaginationRowModel, getSortedRowModel, SortingState,
  getFilteredRowModel, ColumnFiltersState
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, FileSpreadsheet, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from './EmptyState';
import { TableSkeleton } from './Skeleton';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onExportExcel?: () => void;
  onExportPDF?: () => void;
  pageSize?: number;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  toolbar?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns, data, loading = false, searchable = true,
  searchPlaceholder = 'Search...', onExportExcel, onExportPDF,
  pageSize = 10, className, emptyTitle, emptyDescription, toolbar
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize } },
    state: { sorting, columnFilters, globalFilter },
  });

  const totalRows = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize: ps } = table.getState().pagination;
  const from = pageIndex * ps + 1;
  const to = Math.min((pageIndex + 1) * ps, totalRows);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      {(searchable || onExportExcel || onExportPDF || toolbar) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            {searchable && (
              <div className="relative w-full sm:max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  value={globalFilter}
                  onChange={e => setGlobalFilter(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-surface-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                />
              </div>
            )}
            {toolbar}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {onExportExcel && (
              <button onClick={onExportExcel}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border bg-white text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
              </button>
            )}
            {onExportPDF && (
              <button onClick={onExportPDF}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border bg-white text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface-2 border-b border-border">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn('flex items-center gap-1.5', header.column.getCanSort() && 'cursor-pointer select-none hover:text-text-primary')}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          header.column.getIsSorted() === 'asc' ? <ArrowUp className="w-3 h-3" /> :
                          header.column.getIsSorted() === 'desc' ? <ArrowDown className="w-3 h-3" /> :
                          <ArrowUpDown className="w-3 h-3 opacity-40" />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className="p-4"><TableSkeleton rows={pageSize} cols={columns.length} /></td></tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr><td colSpan={columns.length}><EmptyState title={emptyTitle ?? 'No data found'} description={emptyDescription ?? 'Try adjusting your search or filters.'} /></td></tr>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <motion.tr key={row.id}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className={cn('border-b border-border last:border-0 hover:bg-primary-subtle/50 transition-colors', idx % 2 === 1 && 'bg-surface-2/50')}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 text-text-primary">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && totalRows > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-text-muted">
            Showing <span className="font-medium text-text-primary">{from}–{to}</span> of{' '}
            <span className="font-medium text-text-primary">{totalRows}</span> results
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-md hover:bg-surface-3 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-md hover:bg-surface-3 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-xs font-medium">
              Page {pageIndex + 1} / {table.getPageCount()}
            </span>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-md hover:bg-surface-3 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-md hover:bg-surface-3 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
