import { api } from './api';

export const assetsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<any, void>({
      query: () => '/assets/dashboard', // Dashboard API returns assets list too
      providesTags: ['Asset'],
    }),
  }),
});

export const { 
  useGetAssetsQuery 
} = assetsApi;
