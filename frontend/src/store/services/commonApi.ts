import { api } from './api';

export const commonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query<any, void>({
      query: () => '/system/audit',
      providesTags: ['User'],
    }),
    getSettings: builder.query<any, void>({
      query: () => '/system/settings',
      providesTags: ['User'],
    }),
  }),
});

export const { 
  useGetAuditLogsQuery,
  useGetSettingsQuery 
} = commonApi;
