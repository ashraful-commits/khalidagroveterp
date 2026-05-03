import { api } from './api';

export const purchaseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseQuotations: builder.query<any, void>({
      query: () => '/purchase/quotations',
      providesTags: ['Quotation'],
    }),
    getPurchaseOrders: builder.query<any, void>({
      query: () => '/purchase/orders',
      providesTags: ['PurchaseOrder'],
    }),
    getVendors: builder.query<any, void>({
      query: () => '/purchase/vendors',
      providesTags: ['Vendor'],
    }),
  }),
});

export const { 
  useGetPurchaseQuotationsQuery,
  useGetPurchaseOrdersQuery,
  useGetVendorsQuery 
} = purchaseApi;
