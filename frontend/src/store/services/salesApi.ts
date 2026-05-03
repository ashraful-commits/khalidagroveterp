import { api } from './api';

export const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSalesQuotations: builder.query<any, void>({
      query: () => '/sales/quotations',
      providesTags: ['Quotation'],
    }),
    getSalesInvoices: builder.query<any, void>({
      query: () => '/sales/invoices',
      providesTags: ['SalesInvoice'],
    }),
    getCustomers: builder.query<any, void>({
      query: () => '/sales/customers',
      providesTags: ['Customer'],
    }),
  }),
});

export const { 
  useGetSalesQuotationsQuery,
  useGetSalesInvoicesQuery,
  useGetCustomersQuery 
} = salesApi;
