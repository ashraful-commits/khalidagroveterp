import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: [
    'User', 'Vendor', 'Customer', 'Product', 'Category', 
    'Warehouse', 'PurchaseOrder', 'SalesInvoice', 'Account',
    'Employee', 'Asset', 'BOM', 'ProductionOrder',
    'Quotation', 'Expense', 'Budget'
  ],
  endpoints: () => ({}),
});
