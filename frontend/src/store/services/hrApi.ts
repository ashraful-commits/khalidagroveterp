import { api } from './api';

export const hrApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<any, void>({
      query: () => '/hr/employees',
      providesTags: ['Employee'],
    }),
    getPolicies: builder.query<any, void>({
      query: () => '/hr/policies',
      providesTags: ['Employee'],
    }),
    getIncrements: builder.query<any, void>({
      query: () => '/hr/increments',
      providesTags: ['Employee'],
    }),
    getBonuses: builder.query<any, void>({
      query: () => '/hr/bonuses',
      providesTags: ['Employee'],
    }),
    getDocuments: builder.query<any, void>({
      query: () => '/hr/documents',
      providesTags: ['Employee'],
    }),
  }),
});

export const { 
  useGetEmployeesQuery,
  useGetPoliciesQuery,
  useGetIncrementsQuery,
  useGetBonusesQuery,
  useGetDocumentsQuery
} = hrApi;
