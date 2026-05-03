import { api } from './api';

export const accountingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCOA: builder.query<any, void>({
      query: () => '/accounting/coa',
      providesTags: ['Account'],
    }),
    getBudgets: builder.query<any, void>({
      query: () => '/accounting/budgets',
      providesTags: ['Budget'],
    }),
    getProjects: builder.query<any, void>({
      query: () => '/accounting/projects',
      providesTags: ['Account'],
    }),
  }),
});

export const { 
  useGetCOAQuery,
  useGetBudgetsQuery,
  useGetProjectsQuery 
} = accountingApi;
