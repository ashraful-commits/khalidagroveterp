import { api } from './api';

export const productionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductionOrders: builder.query<any, void>({
      query: () => '/production/orders',
      providesTags: ['ProductionOrder'],
    }),
    getBoms: builder.query<any, void>({
      query: () => '/production/boms',
      providesTags: ['BOM'],
    }),
  }),
});

export const { 
  useGetProductionOrdersQuery,
  useGetBomsQuery 
} = productionApi;
