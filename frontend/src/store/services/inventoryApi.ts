import { api } from './api';

export const inventoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouses: builder.query<any, void>({
      query: () => '/inventory/warehouses',
      providesTags: ['Warehouse'],
    }),
    getProducts: builder.query<any, void>({
      query: () => '/inventory/products',
      providesTags: ['Product'],
    }),
    getGateLogs: builder.query<any, void>({
      query: () => '/inventory/gate',
      providesTags: ['Warehouse'],
    }),
    getInventoryRequests: builder.query<any, void>({
      query: () => '/inventory/requests',
      providesTags: ['Warehouse'],
    }),
  }),
});

export const { 
  useGetWarehousesQuery,
  useGetProductsQuery,
  useGetGateLogsQuery,
  useGetInventoryRequestsQuery
} = inventoryApi;
